import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Evolution Tree Planner Basics';
const DESCRIPTION =
  'Hands-on tutorial for the Digimon Story Time Stranger Evolution Tree tool, covering branch requirements, currency budgeting, and share-code collaboration.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'ToolsEvolutionTree' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale(
      '/tools/evolution-tree/planner-basics',
      locale
    ),
  });
}

interface PlannerBasicsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function PlannerBasicsPage({
  params,
}: PlannerBasicsPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          Tool Primer
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl text-white">Interface Overview</h2>
        <p>
          The Evolution Tree planner mirrors all in-game branching data but adds
          three enhancements: cost forecasting, stat preview overlays, and
          share-code collaboration. Use the numbered callouts below as you
          follow along in-app.
        </p>
        <ol className="list-decimal space-y-2 pl-6 text-slate-200">
          <li>
            <strong>Branch Panel:</strong> Select Rookie → Mega routes. Hover a
            form to view required affinity, quest flags, and currency costs.
          </li>
          <li>
            <strong>Resource Ledger:</strong> Tracks Digi-cores, Modular Shells,
            and unique quest items consumed by planned evolutions.
          </li>
          <li>
            <strong>Stat Overlay:</strong> Toggle Attack/Defense/Speed deltas to
            compare potential forms at a glance.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Three-Step Planning Flow</h2>
        <ol className="list-decimal space-y-2 pl-6 text-slate-200">
          <li>
            <strong>Anchor the Final Form:</strong> Decide on a Mega that fits
            your team role (burst, support, disruption). Mark alternative Megas
            as backups.
          </li>
          <li>
            <strong>Budget Resources:</strong> Enter your current currency stock
            to see deficit projections. The tool highlights farming quests to
            close gaps.
          </li>
          <li>
            <strong>Export Share Code:</strong> Generate a six-character code to
            share with teammates or your future self for NG+ runs.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl text-white">
          Sample Growth Route: Terriermon → MegaGargomon
        </h2>
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-5 text-sm text-emerald-100">
          <ul className="list-disc space-y-2 pl-4">
            <li>Rookie to Champion: Terriermon → Gargomon (Affinity 20+)</li>
            <li>
              Champion to Ultimate: Gargomon → Rapidmon (Quest “Factory Recall”)
            </li>
            <li>
              Ultimate to Mega: Rapidmon → MegaGargomon (Chrono Core x3,
              Vanguard affinity ≥ 40)
            </li>
          </ul>
        </div>
        <p>
          Plug the route into the planner and enable the{' '}
          <em>Projected Stats</em>
          toggle. You will see MegaGargomon gaining +28% Defense compared to
          alternative Megas— perfect for sustain squads. Save the share code and
          import it inside the Team Builder to simulate final resistances.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Collaboration Tips</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Label share codes with version numbers (e.g., <code>GARGO-1.1</code>
            ).
          </li>
          <li>Use the notes panel to record Harmony dialogue checkpoints.</li>
          <li>
            Archive obsolete plans after patches; old resource costs are marked
            in red.
          </li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Next, open the Skill Planner Combo Theory guide to translate your
          evolution decisions into real combat rotations.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/tools/skill-planner/combo-theory', locale)}
        >
          Jump to Skill Planner →
        </a>
      </footer>
    </article>
  );
}
