import { StructuredPage } from '@/components/digimon-home/structured-page';
import type { StructuredPageData } from '@/components/digimon-home/structured-page';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

const starterPageData: StructuredPageData = {
  hero: {
    badge: 'Team Foundations',
    title: 'Digimon Story Time Stranger Starter Digimon Blueprint',
    description:
      'Architect a best-in-class Digimon Story Time Stranger Starter Digimon landing page that converts curious rookies into confident squad leaders.',
  },
  sections: [
    {
      title: 'Starter Selection Overview',
      description:
        'Introduce every choice so the Digimon Story Time Stranger Starter Digimon audience grasps the meta immediately.',
      items: [
        'Data Source: Mine internal playtest notes and community spreadsheets cataloging each Digimon Story Time Stranger Starter Digimon stat block.',
        'Visual Spec: Deploy a hero-adjacent card grid where each tile repeats the Digimon Story Time Stranger Starter Digimon name, role, and primary attribute.',
        'CTA Prompt: Add a sticky button labeled “Compare Digimon Story Time Stranger Starter Digimon Builds” linking to an interactive table.',
      ],
    },
    {
      title: 'Persona-Based Recommendations',
      description:
        'Map player archetypes to the ideal Digimon Story Time Stranger Starter Digimon pairing.',
      items: [
        'Research: Interview community mentors to document which Digimon Story Time Stranger Starter Digimon combinations thrive for casual, competitive, and lore-focused tamers.',
        'Visual Spec: Present a persona slider; each slide repeats the Digimon Story Time Stranger Starter Digimon text inside headings and bullet points.',
        'Conversion Cue: Provide a button labeled “Lock in My Digimon Story Time Stranger Starter Digimon” that opens a planner modal.',
      ],
    },
    {
      title: 'Growth Curve Analytics',
      description:
        'Forecast how each Digimon Story Time Stranger Starter Digimon matures across the first 30 hours.',
      items: [
        'Data Source: Compile experience, stat gains, and evolution triggers for every Digimon Story Time Stranger Starter Digimon using recorded playthroughs.',
        'Visual Spec: Build layered line charts where each legend entry repeats the Digimon Story Time Stranger Starter Digimon phrase for clarity.',
        'Interpretation: Dedicate summary paragraphs to what the curve means for Digimon Story Time Stranger Starter Digimon progression pacing.',
      ],
    },
    {
      title: 'Synergy Composition Library',
      description:
        'Present hand-crafted team templates that deploy each Digimon Story Time Stranger Starter Digimon effectively.',
      items: [
        'Research: Extract tournament or high-difficulty clears featuring every Digimon Story Time Stranger Starter Digimon to validate strategies.',
        'Visual Spec: Use trio card clusters showing frontline, support, and flex roles, each caption repeating Digimon Story Time Stranger Starter Digimon combinations.',
        'CTA Flow: Include “Copy Digimon Story Time Stranger Starter Digimon Squad” buttons that pipe loadouts into `/tools/team-builder`.',
      ],
    },
    {
      title: 'Resource Planning Toolkit',
      description:
        'Guide new players on resource management tied to their chosen Digimon Story Time Stranger Starter Digimon.',
      items: [
        'Data Source: Track credit spend, crafting materials, and bond events per Digimon Story Time Stranger Starter Digimon during structured trials.',
        'Visual Spec: Provide downloadable checklists with columns titled by each Digimon Story Time Stranger Starter Digimon to maintain keyword frequency.',
        'Automation: Offer a Notion template that calculates consumable budgets once a Digimon Story Time Stranger Starter Digimon is selected.',
      ],
    },
    {
      title: 'Content & Media Sourcing',
      description:
        'Ensure the Digimon Story Time Stranger Starter Digimon page ships with rich, compliant media.',
      items: [
        'Official Assets: Pull renders and logos from Bandai Namco press kits, renaming files with Digimon Story Time Stranger Starter Digimon descriptors for SEO.',
        'Community Highlights: Gather permission to embed fan-made charts or videos that spotlight Digimon Story Time Stranger Starter Digimon tactics.',
        'Video Shelf: Curate YouTube walkthroughs where hosts focus on each Digimon Story Time Stranger Starter Digimon first hour, embedding playback modules.',
      ],
    },
    {
      title: 'FAQ & Schema Deployment',
      description:
        'Capture search demand with pre-answered Digimon Story Time Stranger Starter Digimon questions.',
      items: [
        'Question Pool: Draft responses for “Which Digimon Story Time Stranger Starter Digimon should I choose?” and similar queries.',
        'Schema: Output FAQPage JSON-LD referencing the Digimon Story Time Stranger Starter Digimon slug for rich results.',
        'Governance: Log bi-weekly audits to update Digimon Story Time Stranger Starter Digimon recommendations after patches.',
      ],
    },
    {
      title: 'Analytics & Retention',
      description:
        'Monitor user behavior to keep the Digimon Story Time Stranger Starter Digimon hub healthy.',
      items: [
        'Metrics: Configure GA4 events capturing time spent comparing Digimon Story Time Stranger Starter Digimon cards.',
        'Feedback: Embed a micro-survey asking if the Digimon Story Time Stranger Starter Digimon guidance resolved onboarding questions.',
        'Changelog: Maintain release notes noting every Digimon Story Time Stranger Starter Digimon update, author, and data source.',
      ],
    },
  ],
  resources: [
    {
      title: 'Starter Selection Spreadsheet',
      description:
        'A downloadable matrix for scoring each Digimon Story Time Stranger Starter Digimon across criteria.',
      href: '/tools/team-builder',
    },
    {
      title: 'Evolution Milestone Tracker',
      description:
        'Use this checklist to monitor when every Digimon Story Time Stranger Starter Digimon unlocks evolutions.',
      href: '/guides/beginner',
    },
    {
      title: 'Intro Combat Video Playlist',
      description:
        'A curated set of matches featuring every Digimon Story Time Stranger Starter Digimon in action.',
      href: '/guides/boss',
    },
  ],
  actions: {
    primary: {
      label: 'Build My Starter Team Now',
      href: '/tools/team-builder',
    },
    secondary: {
      label: 'Back to Guides Hub',
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
    title: starterPageData.hero.title,
    description: starterPageData.hero.description,
    canonicalUrl: getUrlWithLocale('/guides/starter-digimon', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: PageProps) {
  await params;
  return <StructuredPage data={starterPageData} />;
}
