import { websiteConfig } from '@/config/website';
import { getLocalePathname } from '@/i18n/navigation';
import { DEFAULT_LOCALE, routing } from '@/i18n/routing';
import { blogSource, source } from '@/lib/source';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { getBaseUrl } from '../lib/urls/urls';

type Href = Parameters<typeof getLocalePathname>[0]['href'];

/**
 * Static routes for Time Stranger
 */
const staticRoutes = [
  '/',
  '/database',
  '/database/digimon',
  '/database/items',
  '/database/maps',
  '/tools',
  '/tools/team-builder',
  '/tools/evolution-tree',
  '/tools/skill-planner',
  '/guides',
  '/guides/beginner',
  '/guides/beginner/field-manual',
  '/guides/walkthrough',
  '/guides/walkthrough/main-arc',
  '/guides/boss',
  '/guides/boss/apex-dossiers',
  '/guides/secrets',
  '/guides/secrets/lost-chronicle',
  '/guides/side-quests',
  '/guides/side-quests/expedition-ledger',
  '/guides/starter-digimon',
  '/guides/patamon',
  '/guides/personality',
  '/guides/crack',
  '/guides/denuvo',
  '/guides/metacritic',
  '/guides/torrent',
  '/news',
  '/news/updates',
  '/news/updates/chronoshift-1-1-2',
  '/news/events',
  '/news/events/luminous-tides-briefing',
  '/community',
  '/community/discussion',
  '/community/share-guide',
  // legal/basic pages
  '/privacy',
  '/terms',
  '/cookie',
  // optional
  '/pricing',
  '/waitlist',
  '/about',
  '/contact',
  '/changelog',
  '/blog',
  '/tools/evolution-tree/planner-basics',
  '/tools/skill-planner/combo-theory',
  '/tools/team-builder/synergy-matrix',
];

/**
 * Generate a sitemap for the website
 *
 * https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
 * https://github.com/javayhu/cnblocks/blob/main/app/sitemap.ts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapList: MetadataRoute.Sitemap = []; // final result

  // Route-specific priority and change frequency
  const routeMeta: Record<
    string,
    {
      priority: number;
      changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    }
  > = {
    '/': { priority: 1.0, changeFrequency: 'weekly' },
    '/database': { priority: 0.95, changeFrequency: 'weekly' },
    '/database/digimon': { priority: 0.9, changeFrequency: 'weekly' },
    '/database/items': { priority: 0.9, changeFrequency: 'weekly' },
    '/database/maps': { priority: 0.9, changeFrequency: 'weekly' },
    '/tools': { priority: 0.9, changeFrequency: 'monthly' },
    '/tools/team-builder': { priority: 0.85, changeFrequency: 'monthly' },
    '/tools/evolution-tree': { priority: 0.85, changeFrequency: 'monthly' },
    '/tools/skill-planner': { priority: 0.85, changeFrequency: 'monthly' },
    '/guides': { priority: 0.9, changeFrequency: 'weekly' },
    '/guides/beginner': { priority: 0.85, changeFrequency: 'weekly' },
    '/guides/beginner/field-manual': {
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    '/guides/walkthrough': { priority: 0.85, changeFrequency: 'weekly' },
    '/guides/walkthrough/main-arc': {
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    '/guides/boss': { priority: 0.85, changeFrequency: 'weekly' },
    '/guides/boss/apex-dossiers': {
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    '/guides/secrets': { priority: 0.85, changeFrequency: 'weekly' },
    '/guides/secrets/lost-chronicle': {
      priority: 0.78,
      changeFrequency: 'weekly',
    },
    '/guides/side-quests': { priority: 0.85, changeFrequency: 'weekly' },
    '/guides/side-quests/expedition-ledger': {
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    '/guides/starter-digimon': {
      priority: 0.82,
      changeFrequency: 'weekly',
    },
    '/guides/patamon': { priority: 0.8, changeFrequency: 'weekly' },
    '/guides/personality': { priority: 0.78, changeFrequency: 'monthly' },
    '/guides/crack': { priority: 0.7, changeFrequency: 'monthly' },
    '/guides/denuvo': { priority: 0.7, changeFrequency: 'monthly' },
    '/guides/metacritic': { priority: 0.7, changeFrequency: 'monthly' },
    '/guides/torrent': { priority: 0.7, changeFrequency: 'monthly' },
    '/news': { priority: 0.8, changeFrequency: 'daily' },
    '/news/updates': { priority: 0.75, changeFrequency: 'weekly' },
    '/news/updates/chronoshift-1-1-2': {
      priority: 0.72,
      changeFrequency: 'weekly',
    },
    '/news/events': { priority: 0.75, changeFrequency: 'weekly' },
    '/news/events/luminous-tides-briefing': {
      priority: 0.72,
      changeFrequency: 'weekly',
    },
    '/community': { priority: 0.7, changeFrequency: 'daily' },
    '/community/discussion': { priority: 0.65, changeFrequency: 'daily' },
    '/community/share-guide': { priority: 0.65, changeFrequency: 'daily' },
    '/privacy': { priority: 0.5, changeFrequency: 'yearly' },
    '/terms': { priority: 0.5, changeFrequency: 'yearly' },
    '/cookie': { priority: 0.5, changeFrequency: 'yearly' },
    '/pricing': { priority: 0.4, changeFrequency: 'monthly' },
    '/waitlist': { priority: 0.4, changeFrequency: 'monthly' },
    '/about': { priority: 0.3, changeFrequency: 'yearly' },
    '/contact': { priority: 0.3, changeFrequency: 'yearly' },
    '/changelog': { priority: 0.3, changeFrequency: 'monthly' },
    '/blog': { priority: 0.2, changeFrequency: 'monthly' },
    '/tools/evolution-tree/planner-basics': {
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    '/tools/skill-planner/combo-theory': {
      priority: 0.7,
      changeFrequency: 'monthly',
    },
    '/tools/team-builder/synergy-matrix': {
      priority: 0.7,
      changeFrequency: 'monthly',
    },
  };

  // add static routes
  sitemapList.push(
    ...staticRoutes.flatMap((route) =>
      routing.locales.map((locale) => ({
        url: getUrl(route, locale),
        lastModified: new Date(),
        priority: routeMeta[route]?.priority ?? 0.5,
        changeFrequency: routeMeta[route]?.changeFrequency ?? 'monthly',
      }))
    )
  );

  // Blog routes temporarily disabled to avoid 404 pages in sitemap
  // TODO: Re-enable when blog content is ready for Time Stranger
  /*
  if (websiteConfig.blog.enable) {
    const posts = blogSource
      .getPages()
      .filter((post) => post.data.published);

    posts.forEach((post) => {
      const locales = post.locale ? [post.locale] : [DEFAULT_LOCALE];
      locales.forEach((locale) => {
        sitemapList.push({
          url: getUrl(`/blog/${post.slugs.join('/')}`, locale),
          lastModified: post.data.updated
            ? new Date(post.data.updated)
            : post.data.date
              ? new Date(post.data.date)
              : new Date(),
          priority: 0.8,
          changeFrequency: 'weekly' as const,
        });
      });
    });
  }

  // Docs routes temporarily disabled to avoid 404 pages in sitemap
  // TODO: Re-enable when docs content is relevant for Time Stranger
  /*
  if (websiteConfig.docs.enable) {
    const docsParams = source.generateParams();
    sitemapList.push(
      ...docsParams.flatMap((param) =>
        routing.locales.map((locale) => ({
          url: getUrl(`/docs/${param.slug.join('/')}`, locale),
          lastModified: new Date(),
          priority: 0.8,
          changeFrequency: 'weekly' as const,
        }))
      )
    );
  }
  */

  return sitemapList;
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getLocalePathname({ locale, href });
  return getBaseUrl() + pathname;
}

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#sitemap
 * https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/sitemap.ts
 */
function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)])
      ),
    },
  }));
}
