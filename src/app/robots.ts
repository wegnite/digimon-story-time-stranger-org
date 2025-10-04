import type { MetadataRoute } from 'next';
import { getBaseUrl } from '../lib/urls/urls';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API endpoints
          '/api/*',
          '/_next/', // Next.js internal files
          '/_next/*',
          '/auth/', // Authentication pages
          '/auth/*',
          '/*/auth/',
          '/*/auth/*',
          '/admin/',
          '/admin/*',
          '/*/admin/',
          '/*/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/*/dashboard',
          '/*/dashboard/*',
        ],
      },
      // Optional: More specific rules for different bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/api/*',
          '/_next/',
          '/_next/*',
          '/auth/',
          '/auth/*',
          '/*/auth/',
          '/*/auth/*',
        ],
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
    host: getBaseUrl(),
  };
}
