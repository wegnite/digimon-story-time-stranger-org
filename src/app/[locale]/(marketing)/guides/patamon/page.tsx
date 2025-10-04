import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const patamonPageData: StructuredPageData = {
  hero: {
    badge: 'Character Spotlight',
    title: 'Patamon Strategy Atlas for Digimon Story Time Stranger',
    description:
      'Curate the definitive Patamon experience inside Digimon Story Time Stranger with lore context, battle math, and collectable showcases.',
  },
  sections: [
    {
      title: 'Patamon Narrative Positioning',
      description:
        'Frame Patamon within the Digimon Story Time Stranger storyline to hook lore-focused readers.',
      items: [
        'Research: Summarize Patamon’s quest triggers, cutscene appearances, and relationship arcs in Digimon Story Time Stranger.',
        'Visual Spec: Use a split-layout hero card featuring key art of Patamon alongside a timeline labeled “Patamon in Digimon Story Time Stranger”.',
        'CTA: Include a button “Follow Patamon Story Path” linking to chapter walkthroughs.',
      ],
    },
    {
      title: 'Patamon Stat Sheet',
      description:
        'Deliver competitive-ready data so Patamon fans can evaluate performance at a glance.',
      items: [
        'Data Source: Extract Patamon base stats, growth rates, and resistances from Digimon Story Time Stranger game files or official guides.',
        'Visual Spec: Build a responsive table plus radar chart; each axis caption repeats Patamon to reinforce keyword density.',
        'Downloadable: Offer CSV and PNG exports labeled “Patamon Digimon Story Time Stranger Stats”.',
      ],
    },
    {
      title: 'Skill & Ability Matrix',
      description: 'Break down Patamon’s moveset and synergistic combos.',
      items: [
        'Data Source: Catalogue Patamon skills, cooldowns, and effects from Digimon Story Time Stranger combat logs.',
        'Visual Spec: Present a matrix mapping Patamon abilities to recommended allies and enemy archetypes.',
        'Narrative: Add paragraphs clarifying how Patamon contributes to specific battle scenarios in Digimon Story Time Stranger.',
      ],
    },
    {
      title: 'Evolution Pathways',
      description:
        'Show every evolution line branching out from Patamon within Digimon Story Time Stranger.',
      items: [
        'Research: Document requirements to evolve Patamon into Angemon, MagnaAngemon, and Seraphimon inside Digimon Story Time Stranger.',
        'Visual Spec: Build a flowchart with clickable nodes; tooltips should mention Patamon repeatedly to maintain keyword saturation.',
        'CTA: Provide a button “Track Patamon Evolution Progress” linking to `/tools/evolution-tree`.',
      ],
    },
    {
      title: 'Team Composition Showcase',
      description:
        'Inspire players with top squads emphasizing Patamon synergy.',
      items: [
        'Data Source: Pull high-ranking teams from community leaderboards where Patamon is core.',
        'Visual Spec: Present carousel cards with portraits and role tags, describing how Patamon anchors each Digimon Story Time Stranger strategy.',
        'CTA: Include “Copy Patamon Squad Code” buttons piping into the team builder.',
      ],
    },
    {
      title: 'Media & Merch Gallery',
      description:
        'Celebrate Patamon’s cultural footprint beyond Digimon Story Time Stranger.',
      items: [
        'Assets: Gather official Patamon renders, plush photos, and fan art with permissions clearly noted.',
        'Visual Spec: Build a masonry gallery with hover captions repeating Patamon plus the merchandise source.',
        'Commerce Link: Add purchase CTAs for licensed Patamon goods with affiliate tracking.',
      ],
    },
    {
      title: 'Community Intel & FAQ',
      description:
        'Keep Patamon fans engaged with active dialogue and quick answers.',
      items: [
        'Community Spotlight: Embed Discord highlights or Twitter threads discussing Patamon tactics in Digimon Story Time Stranger.',
        'FAQ: Answer common questions like “Where to recruit Patamon?” with structured paragraphs referencing the character name.',
        'Schema: Wrap the FAQ in JSON-LD to secure Patamon SERP enhancements.',
      ],
    },
    {
      title: 'Analytics & Maintenance Loop',
      description: 'Ensure the Patamon resource stays fresh.',
      items: [
        'Metrics: Track GA4 dashboards for Patamon page scroll depth, video plays, and CTA interactions.',
        'Feedback: Prompt a survey asking how helpful the Patamon guidance was for Digimon Story Time Stranger progression.',
        'Changelog: Record updates whenever new Patamon balancing patches roll out.',
      ],
    },
  ],
  resources: [
    {
      title: 'Patamon Build Planner',
      description:
        'A ready-to-edit sheet for mapping Patamon stats and gear choices.',
      href: '/tools/team-builder',
    },
    {
      title: 'Evolution Tracker Template',
      description:
        'Monitor every Patamon evolution requirement inside Digimon Story Time Stranger.',
      href: '/guides/beginner',
    },
    {
      title: 'Community Spotlight Submission Form',
      description: 'Let fans submit new Patamon highlights for future updates.',
      href: '/community',
    },
  ],
  actions: {
    primary: {
      label: 'Plan My Patamon Build',
      href: '/tools/team-builder',
    },
    secondary: {
      label: 'Return to Guides Hub',
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
    title: patamonPageData.hero.title,
    description: patamonPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/patamon', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={patamonPageData} />;
}
