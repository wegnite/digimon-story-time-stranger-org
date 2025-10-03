import Container from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { Routes } from '@/routes';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
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
  });
}

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

// Sample blog posts - in production, these would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Ultimate Beginner's Guide to Digimon Story Time Stranger",
    excerpt:
      'Everything you need to know to start your journey in the Digital World. Learn the basics of evolution, combat, and team building.',
    category: 'Guides',
    date: '2025-10-01',
    readTime: '8 min read',
    slug: 'ultimate-beginners-guide',
    image: '/imgs/blog/beginners-guide.jpg',
  },
  {
    id: 2,
    title: 'Top 10 Evolution Paths for Competitive Play',
    excerpt:
      'Discover the most powerful evolution routes to dominate in battles. Complete analysis of stats, skills, and synergies.',
    category: 'Strategy',
    date: '2025-09-28',
    readTime: '12 min read',
    slug: 'top-evolution-paths',
    image: '/imgs/blog/evolution-paths.jpg',
  },
  {
    id: 3,
    title: 'DNA Evolution Guide: Complete List of Jogress Combinations',
    excerpt:
      'Unlock the power of DNA Digivolution with our comprehensive guide to all Jogress fusion combinations.',
    category: 'Guides',
    date: '2025-09-25',
    readTime: '15 min read',
    slug: 'dna-evolution-guide',
    image: '/imgs/blog/dna-evolution.jpg',
  },
  {
    id: 4,
    title: 'Olympos XII Boss Strategies and Rewards',
    excerpt:
      'Detailed strategies for defeating all Olympos XII bosses, including Merukimon, Minervamon, and Bacchusmon.',
    category: 'Boss Guides',
    date: '2025-09-22',
    readTime: '10 min read',
    slug: 'olympos-xii-bosses',
    image: '/imgs/blog/olympos-xii.jpg',
  },
  {
    id: 5,
    title: 'Personality Types Explained: How They Affect Your Digimon',
    excerpt:
      'Deep dive into the 16 personality types and their impact on stat growth, battle behavior, and evolution requirements.',
    category: 'Mechanics',
    date: '2025-09-20',
    readTime: '7 min read',
    slug: 'personality-types-guide',
    image: '/imgs/blog/personality-types.jpg',
  },
  {
    id: 6,
    title: 'Hidden Secrets and Easter Eggs You Might Have Missed',
    excerpt:
      'Explore the hidden secrets, rare encounters, and Easter eggs scattered throughout the Digital and Human Worlds.',
    category: 'Secrets',
    date: '2025-09-18',
    readTime: '6 min read',
    slug: 'hidden-secrets',
    image: '/imgs/blog/secrets.jpg',
  },
];

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020314] via-[#040610] to-[#0a0f24]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-500/20 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Latest Updates
            </Badge>
            <h1 className="mb-6 text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent md:text-5xl">
              {t('heroTitle', { defaultValue: 'Digimon Story Blog' })}
            </h1>
            <p className="text-lg text-slate-300">
              {t('heroDescription', {
                defaultValue:
                  'Latest news, comprehensive guides, and expert strategies for mastering Digimon Story Time Stranger',
              })}
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <LocaleLink key={post.id} href={`${Routes.Blog}/${post.slug}`}>
                <Card className="group h-full overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-2">
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <div className="flex h-full items-center justify-center text-slate-600">
                      <span className="text-sm">Blog Image</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040610] to-transparent opacity-60" />
                  </div>

                  <CardContent className="space-y-4 p-6">
                    {/* Category Badge */}
                    <Badge
                      variant="outline"
                      className="border-blue-400/40 bg-blue-500/20 text-blue-300 text-xs"
                    >
                      {post.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
