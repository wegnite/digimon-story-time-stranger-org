import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Team Builder Synergy Matrix';
const DESCRIPTION =
  'Guide to maximizing aura links, resistance coverage, and bench swaps using the Digimon Story Time Stranger Team Builder.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'ToolsTeamBuilder' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale(
      '/tools/team-builder/synergy-matrix',
      locale
    ),
  });
}

interface SynergyMatrixPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SynergyMatrixPage({
  params,
}: SynergyMatrixPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
          Team Builder
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl text-white">Reading the Matrix</h2>
        <p>
          The synergy matrix plots aura links (rows) against resistance coverage
          (columns). Each cell displays a score from 0–5. Aim for at least 12
          total points across your trio to enter late-game content comfortably.
        </p>
        <p>
          Hover cells in the tool to preview which Digimon supply the aura. Add
          bench units to see how swaps modify the matrix mid-fight.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">Baseline Trio</h3>
          <ul className="mt-3 space-y-2">
            <li>Kyubimon – Aura: Mystic Flames (Magic ATK boost)</li>
            <li>Greymon – Aura: Vanguard Roar (Physical ATK boost)</li>
            <li>Sunflowmon – Aura: Blooming Shield (Defense and Regen)</li>
          </ul>
          <p className="mt-3">
            Combined matrix score: 14. Resist gaps: Dark, Earth. Slot in
            ExVeemon on the bench to cover Dark via Lightning Aura.
          </p>
        </div>
        <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-6 text-sm text-blue-100">
          <h3 className="text-lg font-semibold text-white">Swap Logic</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-4">
            <li>Start fights with Sunflowmon active for the regen aura.</li>
            <li>Swap to ExVeemon when facing Dark-heavy enemies.</li>
            <li>Cycle back to Kyubimon for burst phases.</li>
          </ol>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Checklist Before Deploying</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>Matrix total ≥ 12.</li>
          <li>No resistance column left at 0.</li>
          <li>Bench Digimon share at least one aura with the frontline.</li>
          <li>Skill Planner combos synchronized with swap turns.</li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Upload your synergy snapshots to the Community Hub discussion board to
          help the global community refine high-tier compositions.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/community/discussion', locale)}
        >
          Share your matrix →
        </a>
      </footer>
    </article>
  );
}
