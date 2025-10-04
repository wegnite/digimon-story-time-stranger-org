import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const metacriticPageData: StructuredPageData = {
  hero: {
    badge: 'Review intelligence',
    title: 'Tracking Digimon Story Time Stranger on Metacritic',
    description:
      'Get a quick overview of critic scores, community reactions, and where to read full reviews in your language.',
  },
  sections: [
    {
      title: 'Current score snapshot',
      items: [
        'Metacritic currently lists separate critic and user averages. Check the official page for the most recent numbers before citing them.',
        'Critic reviews focus on story pacing, localization quality, and combat depth. User reviews often highlight performance and endgame breadth.',
        'Combine external sources such as Steam or PlayStation Store star ratings for a fuller picture beyond the Metacritic aggregate.',
      ],
    },
    {
      title: 'How to evaluate a review',
      items: [
        'Look for outlets that disclose playtime and platform. A handheld build may have different issues than the PC release.',
        'Prioritize reviewers whose genre preferences match yours—fans of turn-based RPGs score different elements than action-focused players.',
        'Separate objective critiques (bugs, crashes) from subjective tastes (favorite characters, tone) when forming your own opinion.',
      ],
    },
    {
      title: 'Join the conversation safely',
      items: [
        'Use verified accounts on Metacritic, Reddit, or Discord to share impressions. Avoid linking to spoilers without clear tags.',
        'Respect community guidelines when quoting reviews. Credit the original author and link back to the full article where possible.',
        'If you spot misinformation, reference official patch notes or publisher statements rather than arguing from memory.',
      ],
    },
    {
      title: 'Where to find in-depth coverage',
      items: [
        'Follow our news feed for translated interviews, patch retrospectives, and localization updates.',
        'Watch progressive performance breakdowns from trusted creators to complement written reviews.',
        'Bookmark the official Bandai Namco blog and community channels for announcements that clarify review updates.',
      ],
    },
  ],
  resources: [
    {
      title: 'Metacritic listing',
      description:
        'Check the live critic and user scores directly from the source.',
      href: 'https://www.metacritic.com/game/digimon-story-time-stranger/',
    },
    {
      title: 'News & patch briefings',
      description: 'Stay on top of changes that influence future reviews.',
      href: '/news/updates',
    },
    {
      title: 'Community discussion hub',
      description:
        'Share your impressions with other tamers in a moderated space.',
      href: '/community/discussion',
    },
  ],
  actions: {
    primary: {
      label: 'Read official announcements',
      href: '/news',
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
    title: metacriticPageData.hero.title,
    description: metacriticPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/metacritic', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={metacriticPageData} />;
}
