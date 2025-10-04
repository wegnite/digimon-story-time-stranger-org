import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const crackPageData: StructuredPageData = {
  hero: {
    badge: 'Player Safety',
    title: 'Why cracked copies are never worth the risk',
    description:
      'Understand the legal, security, and community downsides of unlicensed builds and learn the safe ways to enjoy Digimon Story Time Stranger.',
  },
  sections: [
    {
      title: 'The hidden costs of a “free” download',
      items: [
        'Cracked executables are a common carrier for spyware and credential stealers. Security firms repeatedly flag game cracks for bundling miners and remote access tools.',
        'Tampered files block access to online features and make it impossible to receive hotfixes or connect to official events.',
        'If malware compromises your device, recovery often costs more than a legitimate copy—both in time and potential data loss.',
      ],
    },
    {
      title: 'Legal and account consequences',
      items: [
        'Most regions treat the distribution of circumvention tools as a copyright violation. Publishers can issue takedowns or pursue statutory penalties.',
        'Platform terms of service allow permanent bans for modified clients. Losing a console, Steam, or PlayStation Network account is far more expensive than the game.',
        'Studios rely on early sales to fund patches and localization. Supporting official releases keeps community updates flowing.',
      ],
    },
    {
      title: 'Safe ways to play and save money',
      items: [
        'Follow the official store list for regional pricing and seasonal discounts. Retailers such as Steam, PlayStation Store, and Xbox Store run frequent sales.',
        'Check our updates hub for legitimate promo codes and launch bonuses before you purchase.',
        'Join the community hub to trade strategies, squad builds, and share-play sessions with verified owners.',
      ],
    },
    {
      title: 'Clean-up checklist if you installed a crack',
      items: [
        'Disconnect the affected PC from the network and run a full scan with a trusted antivirus or Microsoft Defender Offline.',
        'Remove unknown startup entries, browser extensions, and scheduled tasks that appeared after the install.',
        'Reinstall Digimon Story Time Stranger from an official source and change credentials for any services used on the compromised machine.',
      ],
    },
  ],
  resources: [
    {
      title: 'Official purchase options',
      description:
        'Steam, PlayStation, Xbox, and Bandai Namco store listings updated with current pricing.',
      href: 'https://www.bandainamcoent.com/games/digimon-story-time-stranger',
    },
    {
      title: 'Patch & promotion tracker',
      description:
        'See verified discount windows and patch notes before you buy.',
      href: '/news/updates',
    },
    {
      title: 'Community safety brief',
      description:
        'Ask for help removing suspicious files and share trusted security tips.',
      href: '/community/discussion',
    },
  ],
  actions: {
    primary: {
      label: 'Visit the official store list',
      href: '/news/events',
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
    title: crackPageData.hero.title,
    description: crackPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/crack', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={crackPageData} />;
}
