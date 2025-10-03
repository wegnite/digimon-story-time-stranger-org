import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Side Quest Expedition Ledger';
const DESCRIPTION =
  'Region-by-region checklist for Digimon Story Time Stranger side quests, including affinity rewards, time-limited objectives, and recommended squad compositions.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'GuidesSideQuests' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale(
      '/guides/side-quests/expedition-ledger',
      locale
    ),
  });
}

interface ExpeditionLedgerPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ExpeditionLedgerPage({
  params,
}: ExpeditionLedgerPageProps) {
  const { locale } = await params;

  const regions = [
    {
      name: 'Verdant Crossroad',
      window: 'Cycles 1-2',
      quests: [
        {
          title: 'Power in the Lilies',
          objective: 'Reroute energy nodes for Lysa',
          reward: 'Timeworn Decoder + Kei affinity +4',
          timer: 'Expires after Chapter 2 intro',
        },
        {
          title: 'Rustle in the Reeds',
          objective: 'Capture two Chrono Beetles without KOs',
          reward: 'Modular Shell x5 + defensive plug-in schematic',
          timer: 'Anytime',
        },
      ],
    },
    {
      name: 'Obsidian Transit',
      window: 'Cycle 2 onwards',
      quests: [
        {
          title: 'Echoes in the Station',
          objective: 'Collect Resonance Echo fragments for the station master',
          reward: 'Fast travel discount + Mari affinity +3',
          timer: 'Concludes before you defeat Clockmon',
        },
        {
          title: 'Lost Parcel Express',
          objective: 'Deliver packages under 6 minutes real-time',
          reward: 'Chrono Lens tuning kit',
          timer: 'Repeats weekly (real-world)',
        },
      ],
    },
    {
      name: 'Neon District',
      window: 'Chapter 4 only',
      quests: [
        {
          title: 'Skyline Sweep',
          objective: 'Eliminate Rift Drifters on three rooftops',
          reward: 'Attack Chip β + Vanguard faction support',
          timer: 'Expires if you choose Resonance Barrier finale',
        },
        {
          title: 'Resonant Graffiti',
          objective: 'Scan murals to decode hidden Harmony chords',
          reward: 'Unique Digi-memory for Lopmon recruit',
          timer: 'Anytime before Chapter 5',
        },
      ],
    },
  ];

  return (
    <article className="prose prose-invert mx-auto max-w-5xl">
      <header className="mb-10 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-300">
          Expedition Board
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-3 text-sm text-slate-400">
          Data current as of Patch 1.1.2. Repeatable quests refresh every Sunday
          00:00 UTC.
        </p>
      </header>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold text-white">Quick Priorities</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>
            Always clear <strong>Power in the Lilies</strong> to access the
            Chapter 3 neutral reconciliation ending.
          </li>
          <li>
            Limit cycle time by chaining delivery quests with Chrono Rift
            captures— they share pathing across Verdant and Obsidian hubs.
          </li>
          <li>
            Use the Team Builder to assign side-quest optimized loadouts. A mix
            of capture and burst squads prevents time overruns.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-8">
        {regions.map((region) => (
          <div key={region.name} className="space-y-4">
            <header className="flex flex-col gap-2 border-l-4 border-amber-400/70 bg-amber-400/10 p-4">
              <h2 className="text-xl font-semibold text-white">
                {region.name}
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                Recommended Window: {region.window}
              </p>
            </header>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-wide text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Quest</th>
                    <th className="px-4 py-3">Objective</th>
                    <th className="px-4 py-3">Reward</th>
                    <th className="px-4 py-3">Timer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-100">
                  {region.quests.map((quest) => (
                    <tr key={quest.title}>
                      <td className="px-4 py-3 font-medium text-white">
                        {quest.title}
                      </td>
                      <td className="px-4 py-3">{quest.objective}</td>
                      <td className="px-4 py-3 text-emerald-200">
                        {quest.reward}
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {quest.timer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl text-white">Affinity &amp; Faction Notes</h2>
        <p>
          Many side quests adjust faction opinion values. Keep an eye on your
          social ledger so you do not miss late-game support allies.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Vanguard-affiliated tasks (combat heavy) grant +5 Vanguard, -2
            Resonance. Balance with data retrieval quests to avoid locking out
            barrier support.
          </li>
          <li>
            Community Board requests often award double affinity during limited
            time events— check the News updates for the weekly schedule.
          </li>
          <li>
            Repeatable deliveries grant diminishing returns after three clears
            per week; shift to Rift hunts for better time-to-reward ratios.
          </li>
        </ul>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-6 text-sm text-blue-100">
          <h3 className="text-lg font-semibold text-white">
            Recommended Squad Loadouts
          </h3>
          <ol className="mt-3 space-y-2 list-decimal pl-4">
            <li>
              <strong>Capture Team:</strong> Gargomon, Sunflowmon, ExVeemon –
              balanced sustain for non-lethal objectives.
            </li>
            <li>
              <strong>Burst Team:</strong> Kyubimon, Greymon, Aquilamon – clears
              elite patrols quickly during timed quests.
            </li>
            <li>
              <strong>Support Bench:</strong> Lekismon and Wisemon for healing
              and status cleansing when timers allow a swap.
            </li>
          </ol>
        </div>
        <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-6 text-sm text-purple-100">
          <h3 className="text-lg font-semibold text-white">
            Tracking Template
          </h3>
          <p className="mt-2">
            Copy this quick template into your planning doc or Notion board to
            monitor progress:
          </p>
          <ul className="mt-3 space-y-2">
            <li>Quest Name → Status → Last Cleared Cycle → Next Reward</li>
            <li>Faction Impact → Current Balance → Target Balance</li>
            <li>Required Items → Stock Count → Farming Route</li>
          </ul>
        </div>
      </section>

      <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Ready for a challenge? Transition into the Boss Dossier to study the
          Apex threats guarding the chapter finales.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/guides/boss/apex-dossiers', locale)}
        >
          View the Boss Strategy Archive →
        </a>
      </footer>
    </article>
  );
}
