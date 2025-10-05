import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const denuvoPageData: StructuredPageData = {
  hero: {
    badge: 'Performance Lab',
    title: 'Understanding Time Stranger’s Denuvo build',
    description:
      'See what this DRM actually does, how to benchmark responsibly, and how to keep your system running smoothly.',
  },
  sections: [
    {
      title: 'What is Denuvo protecting?',
      items: [
        'Denuvo validates that the game executable has not been tampered with and ties launch requests to your platform account.',
        'Online checks are limited to brief authentication windows. The game continues offline once the handshake completes.',
        'Publishers use DRM to deter day-one piracy. Legitimate players should focus on stability rather than removal attempts.',
      ],
    },
    {
      title: 'How to benchmark fairly',
      items: [
        'Use repeatable scenes and identical graphics settings when comparing performance before and after patches.',
        'Capture frame-time data with tools such as CapFrameX or the Steam overlay to look for stutter rather than average FPS alone.',
        'Record hardware specs, driver versions, and background apps so results are easy for others to reproduce.',
      ],
    },
    {
      title: 'Optimization checklist',
      items: [
        'Install the latest GPU drivers and Windows updates—most performance issues stem from outdated software, not Denuvo itself.',
        'Verify your game files through the storefront to repair corrupted assets and shader caches.',
        'Place the game on an SSD and close heavy background launchers before playing to reduce disk access spikes.',
      ],
    },
    {
      title: 'When to contact support',
      items: [
        'If you see repeated authentication failures, gather the exact error code and submit a ticket to Bandai Namco support.',
        'Include DxDiag/System Information reports so engineers can spot hardware conflicts quickly.',
        'Report suspected DRM bypass tools or compromised keys through official channels to help keep the community stable.',
      ],
    },
  ],
  resources: [
    {
      title: 'Official FAQ from Bandai Namco',
      description:
        'Publisher statements on DRM usage and offline play clarifications.',
      href: 'https://support.bandainamcoent.com/hc/en-us',
    },
    {
      title: 'Performance patch notes',
      description: 'Track balancing and optimization tweaks as they land.',
      href: '/news/updates/chronoshift-1-1-2',
    },
    {
      title: 'Community troubleshooting thread',
      description:
        'Share benchmark results and compare settings with other tamers.',
      href: '/community/discussion',
    },
  ],
  actions: {
    primary: {
      label: 'View latest performance notes',
      href: '/news/updates',
    },
    secondary: {
      label: 'Return to the guides hub',
      href: '/guides',
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;

  return constructMetadata({
    title: denuvoPageData.hero.title,
    description: denuvoPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/denuvo', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={denuvoPageData} />;
}
