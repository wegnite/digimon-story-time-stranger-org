import BlogImage from '@/components/blog/blog-image';
import { getMDXComponents } from '@/components/docs/mdx-components';
import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import { constructMetadata } from '@/lib/metadata';
import {
  type BlogType,
  authorSource,
  blogSource,
  categorySource,
} from '@/lib/source';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { ArrowLeft, CalendarIcon, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const CommentsSection = dynamic(
  () => import('@/components/blog/comments/comments-section'),
  {
    ssr: false,
  }
);

interface BlogPostParams {
  locale: Locale;
  slug?: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPostParams>;
}): Promise<Metadata | undefined> {
  const { locale, slug } = await params;

  if (!slug?.length) {
    return undefined;
  }

  const page = blogSource.getPage(slug, locale);

  if (!page) {
    return undefined;
  }

  const { title, description, image } = page.data;

  return constructMetadata({
    title,
    description,
    image,
    canonicalUrl: getUrlWithLocale(`/blog/${slug.join('/')}`, locale),
  });
}

interface BlogPostPageProps {
  params: Promise<BlogPostParams>;
}

function getReadingTime(post: BlogType): number | undefined {
  if (typeof post.data.readingTime === 'number') {
    return post.data.readingTime;
  }

  if (typeof post.data.readTime === 'number') {
    return post.data.readTime;
  }

  return undefined;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!slug?.length) {
    notFound();
  }

  const post = blogSource.getPage(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const publishDate = post.data.date
    ? formatDate(new Date(post.data.date))
    : undefined;
  const readingTime = getReadingTime(post);
  const MDX = post.data.body;
  const author =
    authorSource.getPage([post.data.author], locale) ||
    authorSource.getPage([post.data.author]);
  const categoryPages = (post.data.categories || [])
    .map(
      (categorySlug) =>
        categorySource.getPage([categorySlug], locale) ||
        categorySource.getPage([categorySlug])
    )
    .filter(Boolean);

  const commentThreadId = post.slugs.join('/');

  return (
    <article className="bg-gradient-to-b from-[#020314] via-[#050719] to-[#0a0f24] text-white">
      <section className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

        <Container className="relative z-10 py-16">
          <div className="mb-6">
            <LocaleLink
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('allPosts')}
            </LocaleLink>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {categoryPages.map((category) => (
                <Badge
                  key={category?.slugs[0]}
                  className="bg-blue-500/20 text-blue-200"
                >
                  {category?.data.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {post.data.title}
            </h1>

            {post.data.description ? (
              <p className="max-w-3xl text-lg text-slate-200">
                {post.data.description}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              {author?.data.name ? <span>{author.data.name}</span> : null}
              {publishDate ? (
                <span className="inline-flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {publishDate}
                </span>
              ) : null}
              {readingTime ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t('readTime', { minutes: readingTime })}
                </span>
              ) : null}
            </div>
          </div>

          {post.data.image ? (
            <div className="mt-12 overflow-hidden rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/20">
              <div className="relative aspect-[16/9]">
                <BlogImage
                  src={post.data.image}
                  alt={post.data.title ?? 'Blog hero image'}
                  title={post.data.title}
                />
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <Container className="relative z-10 mx-auto max-w-5xl py-16">
        <div className="prose prose-invert prose-headings:text-white prose-strong:text-white prose-a:text-blue-300">
          <MDX components={getMDXComponents()} />
        </div>

        <Separator className="my-12 bg-white/20" />

        <CommentsSection
          postSlug={commentThreadId}
          locale={locale}
          title={post.data.title ?? commentThreadId}
        />
      </Container>
    </article>
  );
}
