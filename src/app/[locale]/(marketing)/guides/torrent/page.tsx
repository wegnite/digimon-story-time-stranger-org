import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const torrentPageData: StructuredPageData = {
  hero: {
    badge: 'Security Advisory',
    title: 'Why torrent downloads put your adventure at risk',
    description:
      'Torrent bundles are a common source of malware and lost progress. Learn the red flags and see the safer ways to play Time Stranger.',
  },
  sections: [
    {
      title: 'What torrent files really deliver',
      items: [
        'Public swarms expose your IP address to anyone connected, including rights holders and malicious peers.',
        'Archives labeled as game installers frequently hide cryptominers or password stealers that activate before the game launches.',
        'Unverified builds skip essential day-one and post-launch patches, leaving broken quests and crashes unresolved.',
      ],
    },
    {
      title: 'Legal exposure and takedown notices',
      items: [
        'Many countries treat torrent seeding as distribution. Copyright agencies routinely issue infringement notices to ISPs.',
        'Repeat infractions can trigger bandwidth throttling or account termination from your internet provider.',
        'Studios reserve the right to revoke online access or ban accounts associated with unauthorized files.',
      ],
    },
    {
      title: 'Legitimate ways to jump in',
      items: [
        'Watch our news feed for verified sales and bundle promotions that keep your purchase affordable.',
        'If you want to try before you buy, look for official demos or livestream previews instead of untrusted torrents.',
        'Support community wikis and localization by purchasing through approved stores—those sales fund future updates.',
      ],
    },
    {
      title: 'Steps to take if you already downloaded one',
      items: [
        'Run an offline virus scan and remove any scheduled tasks or services created during the install.',
        'Delete the torrent payload and clear residual registry entries or launchers it installed.',
        'Reinstall the game from an official storefront to restore integrity-checked files and online access.',
      ],
    },
  ],
  resources: [
    {
      title: 'Official storefront directory',
      description:
        'Bandai Namco, Steam, PlayStation, and Xbox listings in one place.',
      href: 'https://www.bandainamcoent.com/games/digimon-story-time-stranger',
    },
    {
      title: 'Patch & event alerts',
      description:
        'Stay informed about discounts, patches, and limited events with our update tracker.',
      href: '/news/updates',
    },
    {
      title: 'Community clean-up tips',
      description:
        'Ask for assistance and share remediation steps with other players.',
      href: '/community/discussion',
    },
  ],
  actions: {
    primary: {
      label: 'Browse legitimate purchase options',
      href: '/news/events',
    },
    secondary: {
      label: 'Back to the guides hub',
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
    title: torrentPageData.hero.title,
    description: torrentPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/torrent', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={torrentPageData} />;
}
