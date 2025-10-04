import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const personalityPageDataEn: StructuredPageData = {
  hero: {
    badge: 'Personality System',
    title:
      'Digimon Story Time Stranger Personality System Complete Guide: 16 Types, Skills & Stat Bonuses',
    description:
      'Master the personality system in Digimon Story Time Stranger with our complete guide covering all 16 personalities, bond types, stat bonuses, and exclusive skills to optimize your team.',
  },
  sections: [
    {
      title: 'System Overview',
      description:
        'The personality system is one of the most complex mechanics in Digimon Story Time Stranger. Understanding bonds, personalities, and their effects is crucial for building the strongest team.',
      items: [
        '4 Bond Types: Valor, Philanthropy, Amicability, and Wisdom - each providing different stat bonuses',
        '16 Total Personalities: 4 unique personalities per bond type, each with exclusive skills and attribute bonuses',
        'Stackable Bonuses: Bond bonuses and personality bonuses are always different, ensuring varied stat growth',
        'Agent Skills Integration: Invest AP (Anomaly Points) in bond skill trees to boost percentage bonuses and unlock higher evolution ranks',
      ],
    },
    {
      title: 'Bond Types & Stat Bonuses',
      description:
        'Each of the 4 bond types provides a primary stat bonus, while the 4 personalities within each bond offer secondary bonuses.',
      items: [
        'Philanthropy Bond: +SPI (Spirit) | Personalities: Adoring (+DEF), Devoted (+INT), Tolerant (+SP), Overprotective (+HP)',
        'Valor Bond: +ATK (Attack) | Personalities: Zealous (+SPD), Brave (+SP), Reckless (+HP), Daring (+DEF)',
        'Wisdom Bond: +INT (Intelligence) | Personalities: Enlightened (+SP), Sly (+HP), Astute (+SPD), Strategic (+SPI)',
        'Amicability Bond: +DEF (Defense) | Personalities: Opportunistic (+SPI), Friendly (+ATK), Sociable (+SP), Compassionate (+HP)',
      ],
    },
    {
      title: 'Personality Skills Reference',
      description:
        'Each personality grants exclusive skills that cannot be obtained elsewhere. Here are all personality skills organized by bond type.',
      items: [
        'Philanthropy Skills: Healing Wisdom (reduce healing SP cost 10%), SP Supplement (heal restores 10% SP), Follow-Up (always act last), Prayer for Aid (heal party HP each turn), First Aid (healing removes injuries), Stout Spirit (HP boosts SPI), Steadfast Heart (low HP boosts DEF), Rally Blessing (revive once at 50% HP), First in Line (always act first), Great Embrace (healing can overflow to 200% max HP)',
        'Valor Skills: Warrior Wisdom (physical skill SP cost -10%), Song of Triumph (slightly boost CP gain), First in Line (always act first), Fast Break (boost ATK in early turns), Extra Strikes Tech (extra attack on combo), Vitality Theft (10% physical damage to HP), Steadfast Might (low HP boosts ATK), Counter (chance to counter when hit, higher at low HP), Stout Defense (HP boosts DEF), Strategic Order (+5% crit rate)',
        'Wisdom Skills: Secret Sage Art (attacks deal magic damage), Magical Wisdom (magic skill SP cost -10%), Intense Focus (boost INT in early turns), Haymaker (+20% crit damage), Meditation (boost INT in late turns), Combo Magic (chance to double-cast magic, higher at low HP), Steadfast Emotion (low HP boosts INT), Magic Theft (10% magic damage to SP), Follow-Up (always act last), Soothing Song (restore party SP each turn)',
        'Amicability Skills: Cheer (boost party ATK/INT based on total bond at battle start), Prankster (increase debuff trigger rate), Slow Starter (boost ATK in late turns), Planning Ahead (lower enemy DEF/SPI based on total bond at battle start), Strategic Order (+5% crit rate), Fortifying Charge (healing boosts all stats), Booing (debuffs last +2 turns), Weak Point Blitz (extra damage when ally hits weakness first), Stout Strength (HP boosts ATK), Hustle Cry (buffs last +2 turns)',
      ],
    },
    {
      title: 'How to Change Personalities',
      description:
        "There are three main methods to change a Digimon's personality in Time Stranger, each with different requirements and efficiency.",
      items: [
        'Battle Interactions: After battles, answer dialogue questions that influence personality. Watch for the "+" indicator showing proximity to personality changes. This is the most common method during normal gameplay.',
        "Digifarm: Use item combinations in Mirei Mikagura's In-Between Theater Digifarm to shift personalities. Each training session takes 30 minutes and shows yellow arrows indicating the transition direction.",
        'Digiline: Interact with Digimon through the Digiline messaging system. Wait a few seconds until the dialogue icon appears, then engage to trigger personality-shifting conversations. More tedious but useful when not in direct contact.',
      ],
    },
    {
      title: 'Skill Inheritance & Optimization',
      description:
        'When changing personalities, you can keep previously learned personality skills, allowing you to build powerful skill combinations.',
      items: [
        'Skill Retention: When converting to a new personality, you can always choose to keep certain skills from your previous personality',
        'Shared Skills: Three skills appear in multiple personalities: First in Line (Philanthropy/Valor), Follow-Up (Philanthropy/Wisdom), and Strategic Order (Valor/Amicability)',
        'RNG Factor: Skill inheritance involves some randomness, but the highest probability is retaining the original default personality during Conversion',
        "Strategic Planning: Plan your personality changes to accumulate the most beneficial skill combination for each Digimon's role",
      ],
    },
    {
      title: 'Team Building Strategies',
      description:
        'Use personalities strategically to enhance your team composition and cover weaknesses.',
      items: [
        'DPS Build: Focus on Valor bond for +ATK, prioritize Fast Break, Steadfast Might, or Warrior Wisdom for physical damage dealers',
        'Tank Build: Philanthropy bond with Overprotective or Daring personalities provides +HP and +DEF for maximum survivability',
        'Support Build: Philanthropy bond with Healing Wisdom and SP Supplement creates efficient healers that sustain the team',
        'Magic DPS: Wisdom bond personalities like Enlightened or Strategic provide +INT and +SPI for powerful magic users',
        'Balanced Investment: Avoid over-investing in a single bond - maintain balance in Agent Skills to progress smoothly through the game',
      ],
    },
    {
      title: 'Agent Skills & Evolution Requirements',
      description:
        'Invest in bond skill trees wisely to maximize stat bonuses and meet evolution rank requirements.',
      items: [
        'AP Investment: Spend Anomaly Points (AP) in Agent Skills to boost bond-related percentage bonuses',
        'Agent Rank: Your investment directly contributes to Agent Rank, which unlocks higher-tier Digimon evolutions',
        'Balanced Approach: While focusing on a specific bond can enhance certain stats, spreading AP across all bonds ensures steady progression',
        'Long-term Planning: Consider your team composition when investing - support teams benefit from Philanthropy, while aggressive teams need Valor',
      ],
    },
  ],
  resources: [
    {
      title: 'Bond & Personality Quick Reference Table',
      description:
        'Download our comprehensive table showing all 16 personalities, their stat bonuses, and exclusive skills for easy reference.',
      href: '/tools/team-builder',
    },
    {
      title: 'Personality Change Calculator',
      description:
        'Use our interactive tool to track personality changes and plan optimal skill combinations for your team.',
      href: '/tools/skill-planner',
    },
    {
      title: 'Team Builder with Personality Integration',
      description:
        'Build and optimize teams considering personality bonuses and skill synergies.',
      href: '/tools/team-builder',
    },
  ],
  actions: {
    primary: {
      label: 'Build Your Team',
      href: '/tools/team-builder',
    },
    secondary: {
      label: 'Back to Guides',
      href: '/guides',
    },
  },
};

const pageContent: Record<string, StructuredPageData> = {
  en: personalityPageDataEn,
  zh: personalityPageDataEn, // TODO: Add Chinese translation
  fr: personalityPageDataEn, // TODO: Add French translation
  es: personalityPageDataEn, // TODO: Add Spanish translation
  ja: personalityPageDataEn, // TODO: Add Japanese translation
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const data = pageContent[locale] ?? personalityPageDataEn;

  return constructMetadata({
    title: data.hero.title,
    description: data.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/personality', locale),
    keywords: [
      'digimon story time stranger',
      'personality system',
      'bond types',
      'personality skills',
      'stat bonuses',
      'digimon personality',
      'valor',
      'philanthropy',
      'wisdom',
      'amicability',
      'personality guide',
      'time stranger guide',
    ],
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const data = pageContent[locale] ?? personalityPageDataEn;

  return <StructuredPage data={data} />;
}
