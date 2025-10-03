import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Skill Planner Combo Theory';
const DESCRIPTION =
  'Advanced usage guide for the Digimon Story Time Stranger Skill Planner, focusing on combo rotations, cooldown management, and burst sequencing.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'ToolsSkillPlanner' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/tools/skill-planner/combo-theory', locale),
  });
}

interface ComboTheoryPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ComboTheoryPage({
  params,
}: ComboTheoryPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
          Skill Planner
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl text-white">Building Rotations</h2>
        <p>
          Skill Planner simulations treat every rotation as a four-turn block.
          Configure three combos: <em>Setup</em>, <em>Burst</em>, and{' '}
          <em>Reset</em>. Assign abilities to each slot, then review the heatmap
          to ensure you never stack conflicting cooldowns.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Use <strong>Setup</strong> to apply debuffs (e.g., Kyubimon&apos;s
            Foxtail Hex).
          </li>
          <li>
            <strong>Burst</strong> should feature heavy hitters synchronized
            with Harmony nodes.
          </li>
          <li>
            <strong>Reset</strong> manages support actions—heals, cleanses, or
            timeline control.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl text-white">Cooldown Math</h2>
        <p>
          Time Stranger uses real-time cooldowns. Divide each skill&apos;s
          cooldown by your Speed stat to determine the action&apos;s effective
          downtime. The planner automates this calculation; review the{' '}
          <em>Drift Bar</em> to detect bottlenecks.
        </p>
        <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-5 text-sm text-cyan-100">
          <ul className="list-disc space-y-2 pl-4">
            <li>Cooldown 18s ÷ Speed 1.25 = 14.4s effective downtime.</li>
            <li>
              Aim for 12s or less on core skills to align with Burst windows.
            </li>
            <li>
              Use the <em>Acceleration</em> buff preview to test Harmony node
              effects.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Sample Burst Chain</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-200">
          <li>Turn 1: Angemon – Holy Guard (Setup).</li>
          <li>Turn 2: Kyubimon – Spirit Dragoon (Burst).</li>
          <li>Turn 3: Greymon – Terra Force (Burst) + Harmony node.</li>
          <li>Turn 4: Sunflowmon – Radiant Bloom (Reset) to stabilize HP.</li>
        </ol>
        <p>
          Save this rotation and export the combo share code. Import it inside
          the Team Builder to evaluate DPS deltas and ensure resist coverage.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">
            Attribute Pairings
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              Light + Null for versatile damage against phase-shifting bosses.
            </li>
            <li>Wind + Electric to shred armor on mechanical enemies.</li>
            <li>Plant + Earth for sustain comps in long attrition fights.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-6 text-sm text-purple-100">
          <h3 className="text-lg font-semibold text-white">Common Mistakes</h3>
          <ul className="mt-3 space-y-2">
            <li>
              Stacking identical debuffs—use the planner to stagger application.
            </li>
            <li>
              Forgetting item cooldowns; log them as pseudo-skills to avoid
              overlap with support actions.
            </li>
            <li>
              Ignoring Burst gauge consumption—track how many pips each combo
              burns.
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Review your rotations in the Team Builder Synergy Matrix to ensure
          resistances and aura bonuses match your combo plan.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/tools/team-builder/synergy-matrix', locale)}
        >
          Open Synergy Matrix →
        </a>
      </footer>
    </article>
  );
}
