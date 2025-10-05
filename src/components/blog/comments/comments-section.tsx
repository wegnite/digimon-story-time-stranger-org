'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import { toast } from '@/hooks/use-toast';
import { Loader2, MessageCircle, Send } from 'lucide-react';

const formSchema = z.object({
  content: z
    .string()
    .transform((value) => value.trim())
    .pipe(
      z.string().min(1, '请输入评论内容').max(1000, '评论内容最多 1000 字')
    ),
});

type FormValues = z.infer<typeof formSchema>;

type CommentItem = {
  id: string;
  displayName: string;
  content: string;
  createdAt: string;
  locale: string | null;
  userId: string;
};

type CommentsResponse = {
  comments: CommentItem[];
};

interface CommentsSectionProps {
  postSlug: string;
  locale: string;
  title: string;
}

function buildCommentsUrl(slug: string, locale?: string) {
  const encodedSlug = slug
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  const query = locale ? `?locale=${encodeURIComponent(locale)}` : '';
  return `/api/blog/comments/${encodedSlug}${query}`;
}

export default function CommentsSection({
  postSlug,
  locale,
  title,
}: CommentsSectionProps) {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<CommentsResponse>({
    queryKey: ['blog-comments', postSlug, locale],
    queryFn: async () => {
      const response = await fetch(buildCommentsUrl(postSlug, locale), {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('无法获取评论，请稍后重试。');
      }

      return (await response.json()) as CommentsResponse;
    },
  });

  const comments = data?.comments ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const commentDraft = form.watch('content') ?? '';

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await fetch(buildCommentsUrl(postSlug), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, locale }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        comment?: CommentItem;
      };

      if (!response.ok) {
        const error = new Error(payload?.error ?? '提交评论失败');
        (error as Error & { status?: number }).status = response.status;
        throw error;
      }

      return payload.comment as CommentItem;
    },
    onSuccess: (comment) => {
      queryClient.setQueryData<CommentsResponse>(
        ['blog-comments', postSlug, locale],
        (prev) => ({
          comments: comment
            ? [comment, ...(prev?.comments ?? [])]
            : (prev?.comments ?? []),
        })
      );
      form.reset();
      toast({
        title: '评论已发布',
        description: '感谢分享你的攻略心得！',
      });
    },
    onError: (error) => {
      const status = (error as Error & { status?: number }).status;
      if (status === 401) {
        toast({
          title: '请先登录',
          description: '登录后即可发表评论。',
        });
        return;
      }

      toast({
        title: '提交失败',
        description: error.message ?? '请稍后重试。',
      });
    },
  });

  const commentCountLabel = useMemo(() => {
    if (comments.length === 0) return '还没有玩家留言';
    if (comments.length === 1) return '1 条玩家留言';
    return `${comments.length} 条玩家留言`;
  }, [comments.length]);

  const isLoggedIn = !!session?.user;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-300" />
          <h2 className="text-2xl font-semibold">玩家留言</h2>
        </div>
        <p className="text-sm text-muted-foreground">{commentCountLabel}</p>
        <p className="text-xs text-muted-foreground">
          欢迎分享你在《数码宝贝时空异客》中的战术心得、阵容思路或版本观察。
        </p>
      </div>

      {sessionPending ? (
        <Skeleton className="h-28 w-full rounded-xl" />
      ) : isLoggedIn ? (
        <Card className="border border-white/10 bg-white/5">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((values) =>
                  mutation.mutate(values)
                )}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={`分享你对「${title}」的看法，最多 1000 字。`}
                          rows={4}
                          className="resize-none border-white/20 bg-white/5 text-sm text-white focus-visible:ring-blue-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>{commentDraft.length}/1000</span>
                  <div className="flex items-center gap-2">
                    <span>保持友善与尊重，理性交流。</span>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={mutation.isPending || commentDraft.length === 0}
                    >
                      {mutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      发布评论
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-white/10 bg-white/5">
          <CardContent className="flex flex-col gap-3 pt-6">
            <p className="text-sm text-slate-200">
              登录后即可留言，与其他驯兽师交流策略。一键注册只需几秒。
            </p>
            <div>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 hover:bg-blue-500"
              >
                <LocaleLink href="/auth/login">立即登录</LocaleLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {isPending ? (
          <>
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </>
        ) : isError ? (
          <p className="text-sm text-red-400">
            无法加载评论，请刷新页面后再试。
          </p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            暂时没有留言，快来抢沙发分享你的战术灵感！
          </p>
        ) : (
          comments.map((comment) => {
            const dateLabel = comment.createdAt
              ? formatDate(new Date(comment.createdAt))
              : '';
            const initials = comment.displayName
              .split(' ')
              .map((part) => part.charAt(0))
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card
                key={comment.id}
                className="border border-white/10 bg-white/[0.04]"
              >
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarFallback className="bg-blue-500/20 text-blue-200">
                        {initials || 'DS'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {comment.displayName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {dateLabel}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                    {comment.content}
                  </p>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}
