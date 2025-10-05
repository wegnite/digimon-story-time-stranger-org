import { getDb } from '@/db';
import { blogComments } from '@/db/schema';
import { auth } from '@/lib/auth';
import { and, desc, eq } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const commentInputSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: 'content is required' })
    .max(1000, { message: 'content must be 1000 characters or less' }),
  locale: z.string().optional(),
});

interface RouteContext {
  params: Promise<{ slug?: string[] }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  if (!slug?.length) {
    return NextResponse.json({ error: 'Missing post slug' }, { status: 400 });
  }

  const locale = new URL(request.url).searchParams.get('locale') ?? undefined;
  const db = await getDb();
  const slugValue = slug.join('/');

  const conditions = [
    eq(blogComments.postSlug, slugValue),
    eq(blogComments.approved, true),
  ];

  if (locale) {
    conditions.push(eq(blogComments.locale, locale));
  }

  const results = await db
    .select({
      id: blogComments.id,
      displayName: blogComments.displayName,
      content: blogComments.content,
      createdAt: blogComments.createdAt,
      locale: blogComments.locale,
      userId: blogComments.userId,
    })
    .from(blogComments)
    .where(and(...conditions))
    .orderBy(desc(blogComments.createdAt));

  return NextResponse.json({ comments: results });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  if (!slug?.length) {
    return NextResponse.json({ error: 'Missing post slug' }, { status: 400 });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await request.json();
  const validation = commentInputSchema.safeParse(json);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0]?.message ?? 'Invalid payload' },
      { status: 400 }
    );
  }

  const { content, locale } = validation.data;
  const db = await getDb();
  const slugValue = slug.join('/');
  const inserted = await db
    .insert(blogComments)
    .values({
      id: randomUUID(),
      postSlug: slugValue,
      locale,
      userId: session.user.id,
      displayName: session.user.name || session.user.email || 'Anonymous',
      content,
      approved: true,
    })
    .returning({
      id: blogComments.id,
      displayName: blogComments.displayName,
      content: blogComments.content,
      createdAt: blogComments.createdAt,
      locale: blogComments.locale,
      userId: blogComments.userId,
    });

  return NextResponse.json({ comment: inserted[0] }, { status: 201 });
}
