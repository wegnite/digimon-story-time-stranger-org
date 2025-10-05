import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Patch Notes – Chronoshift Update 1.1.2';
const DESCRIPTION =
  'Balance changes, bug fixes, and quality-of-life upgrades delivered in Time Stranger patch 1.1.2.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'NewsUpdates' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/news/updates/chronoshift-1-1-2', locale),
  });
}

interface PatchNotesPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function PatchNotesPage({ params }: PatchNotesPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
          Patch Notes
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-3 text-sm text-slate-400">
          Release date: 2024-10-02 · Client version: 1.1.2 · Server build:
          20241002.1
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl text-white">Headline Changes</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Chrono overload damage reduced by 12% on Normal difficulty and 7% on
            Hard.
          </li>
          <li>
            Added UI prompts inside Evolution Planner to flag missing quest
            requirements.
          </li>
          <li>Improved Rift Warden pathfinding to prevent stuck patrols.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl text-white">Balance Adjustments</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Digimon</h3>
          <ul className="mt-2 space-y-2">
            <li>
              Kyubimon – Spirit Dragoon cooldown increased from 16s → 18s.
            </li>
            <li>Sunflowmon – Radiant Bloom regen improved by 5% per tick.</li>
            <li>
              Aquilamon – Sky Barrage now gains +10% crit when used after a
              Guard Break.
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-6 text-sm text-blue-100">
          <h3 className="text-lg font-semibold text-white">Bosses</h3>
          <ul className="mt-2 space-y-2">
            <li>
              Clockmon – Timeline Reset telegraph extended by 0.75 seconds.
            </li>
            <li>Seraphimon Variant – Wings of Penance damage reduced by 8%.</li>
            <li>Lilithmon Prime – Mirror Avatar HP lowered by 15%.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Quality of Life</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>Added customizable filters to the Side Quest ledger.</li>
          <li>
            Team Builder now exports synergy snapshots directly to the Community
            Hub upload form.
          </li>
          <li>
            New accessibility option: colorblind-friendly mode for aura links.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Bug Fixes</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Resolved an issue causing Lopmon recruitment to fail after NG+.
          </li>
          <li>Fixed overlapping subtitles during Chapter 3 Memory Dive.</li>
          <li>Corrected Aura tooltips showing outdated scaling values.</li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Have feedback? Drop your notes in the Community Hub discussion thread
          or tag @TimeStrangerOps on social channels.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/community/discussion', locale)}
        >
          Join the patch discussion →
        </a>
      </footer>
    </article>
  );
}
