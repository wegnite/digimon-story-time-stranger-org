import { BlogCategoryFilter } from '@/components/blog/blog-category-filter';
import BlogGrid from '@/components/blog/blog-grid';
import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import { blogSource, categorySource } from '@/lib/source';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { Routes } from '@/routes';
import type { BlogCategory } from '@/types';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return constructMetadata({
    title: t('title', {
      defaultValue: 'Blog - Digimon Story Time Stranger Guide',
    }),
    description: t('description', {
      defaultValue:
        'Latest news, guides, tips, and strategies for Digimon Story Time Stranger. Stay updated with game updates, evolution guides, and community content.',
    }),
    canonicalUrl: getUrlWithLocale(Routes.Blog, locale),
    noIndex: false,
  });
}

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  const categories: BlogCategory[] = categorySource
    .getPages()
    .map((category) => ({
      slug: category.slugs[0] ?? '',
      name: category.data.name,
      description: category.data.description ?? '',
    }))
    .filter((category) => category.slug && category.name);

  const posts = blogSource
    .getPages(locale)
    .filter((post) => post.data.published)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  const latestPosts = posts.slice(0, 3);

  const categorizedSections = categories
    .map((category) => ({
      category,
      posts: posts.filter((post) =>
        post.data.categories?.includes(category.slug)
      ),
    }))
    .filter((section) => section.posts.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020314] via-[#040610] to-[#0a0f24]">
      <section className="relative overflow-hidden border-b border-blue-500/20 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Editorial Relaunch
            </Badge>
            <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent md:text-5xl">
              Digimon Story Blog
            </h1>
            <p className="text-lg text-slate-300">
              We’re refreshing our editorial hub with deep-dive patches,
              translated interviews, and weekly strategy spotlights. Subscribe
              now and we’ll notify you the moment articles go live.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                {t('subtitle')}
              </h2>
              <p className="text-base text-slate-300">{t('description')}</p>
            </div>
            {categories.length > 0 && (
              <BlogCategoryFilter categoryList={categories} />
            )}
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {t('noPostsFound')}
            </p>
          ) : (
            <div className="space-y-16">
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">
                    {t('allPosts')}
                  </h3>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="hidden md:inline-flex"
                  >
                    <LocaleLink href="/waitlist">Subscribe</LocaleLink>
                  </Button>
                </div>
                <BlogGrid locale={locale} posts={latestPosts} />
              </section>

              {categorizedSections.map(({ category, posts: categoryPosts }) => (
                <section key={category.slug} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {category.name}
                    </h3>
                    {category.description ? (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    ) : null}
                  </div>
                  <BlogGrid locale={locale} posts={categoryPosts} />
                </section>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
