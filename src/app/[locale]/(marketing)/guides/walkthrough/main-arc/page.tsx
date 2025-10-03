import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Main Story Logbook – Shattered Timeline Arc';
const DESCRIPTION =
  'Step-by-step mission walkthrough for Digimon Story Time Stranger chapters 1–4, including affinity checkpoints, boss rotation breakdowns, and loot routing.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'GuidesWalkthrough' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/guides/walkthrough/main-arc', locale),
  });
}

interface WalkthroughPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function WalkthroughPage({
  params,
}: WalkthroughPageProps) {
  const { locale } = await params;

  const chapters: Array<{
    id: string;
    title: string;
    beats: string[];
    boss?: {
      name: string;
      tactics: string;
    };
  }> = [
    {
      id: 'c1',
      title: 'Chapter 1 – Verdant Crossroad',
      beats: [
        'Complete three Chrono Grid tutorials; accept the Investigator Badge from Professor Hikawa.',
        'Unlock the Verdant safehouse. Scan all four Rift Seeds before progressing to trigger the Harmony burst cutscene.',
        'Optional event: help NPC Lysa reroute power; reward is the Timeworn Decoder needed in Chapter 3.',
      ],
      boss: {
        name: 'Rift Warden: Argomon (Larva)',
        tactics:
          'Argomon cycles Guard → Lash → Drain. Use Compress after Guard drops to push it beneath 50% and force an early Lash, opening a 2-turn burst window.',
      },
    },
    {
      id: 'c2',
      title: 'Chapter 2 – Obsidian Transit',
      beats: [
        'Activate the subway Anchor network (North, Midtown, Museum). You need rank-2 Affinity to persuade the Museum attendant.',
        'Track the Chrono Echo trail using the Resonance Lens; collect at least six Echo fragments to unlock the Archive terminal.',
        'Dialogue fork: side with Kei (timeline evidence) or Mari (citizen protection). Either choice impacts Chapter 4 faction support.',
      ],
      boss: {
        name: 'Chrono Beast: Clockmon',
        tactics:
          'Clockmon opens with Timeline Reset if you use items on turn one. Instead, guard the first round, then apply stat breaks to avoid its 800+ damage burst.',
      },
    },
    {
      id: 'c3',
      title: 'Chapter 3 – Astral Library',
      beats: [
        'Solve the three-layer puzzle: Glyph alignment, Librarian riddles, and the rotating floor labyrinth. Record the floor patterns— they rotate every cycle.',
        'Complete the Memory Dive side quest. The archived cutscene unlocks Bonus Harmony lines in the final act.',
        'Craft at least two Resonant Shields using Rift Alloy x5 and Modular Shell x3 (from Chapter 1 farming).',
      ],
      boss: {
        name: 'Data Fragment: Wisemon',
        tactics:
          'Wisemon mirrors your last elemental attack. Rotate between Strike and Null skills to avoid reflected damage. Save Harmony nodes for the final 30% to cancel its “Erase Record” finisher.',
      },
    },
    {
      id: 'c4',
      title: 'Chapter 4 – Neon Convergence',
      beats: [
        'Return to Verdant Crossroad with the decoded Librarian files. The cutscene triggers the faction rally if you completed Lysa’s quest in Chapter 1.',
        'Secure three Chrono Amplifiers in the Neon District. They are defended by roaming elite squads; defeat them to earn Translocation Data for late-game travel.',
        'Final decision: choose Vanguard Assault or Resonance Barrier for the climax. This determines which support Digimon appear in Chapter 5.',
      ],
    },
  ];

  return (
    <article className="prose prose-invert mx-auto max-w-5xl prose-headings:text-white">
      <header className="border-b border-white/10 pb-8">
        <p className="text-xs uppercase tracking-[0.4em] text-blue-300">
          Story Walkthrough
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">{TITLE}</h1>
        <p className="mt-4 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-4 text-sm text-slate-400">
          Last verified: Chronoshift build 1.1.2 — route timings may shift after
          the "Luminous Tides" balance update.
        </p>
      </header>

      {chapters.map((chapter) => (
        <section key={chapter.id} className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-white">{chapter.title}</h2>
          <ol className="list-decimal space-y-3 pl-6 text-slate-200">
            {chapter.beats.map((beat) => (
              <li key={beat}>{beat}</li>
            ))}
          </ol>
          {chapter.boss ? (
            <div className="rounded-xl border border-purple-400/40 bg-purple-500/10 p-5 text-sm text-purple-100">
              <h3 className="text-lg font-semibold text-white">
                Boss Brief: {chapter.boss.name}
              </h3>
              <p className="mt-2 leading-relaxed">{chapter.boss.tactics}</p>
            </div>
          ) : null}
        </section>
      ))}

      <section className="mt-14 space-y-4 border-t border-white/10 pt-8">
        <h2 className="text-2xl text-white">Affinity &amp; Dialogue Forks</h2>
        <p>
          Time Stranger tracks affinity deltas after every major dialogue
          choice. To keep options open for Chapter 5, maintain the following
          thresholds:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Keep Kei and Mari within 15 points of each other until Chapter 3.
          </li>
          <li>
            Complete at least two Community Board requests for each faction.
          </li>
          <li>
            Share memory fragments with Professor Hikawa to unlock the neutral
            reconciliation path.
          </li>
        </ul>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 p-6 text-sm text-sky-100">
          <h3 className="text-lg font-semibold text-white">
            Loot Routing Cliffnotes
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              Verdant Crossroad north ridge respawns Modular Shell nodes every
              40 minutes; mark the spawn points on your map early.
            </li>
            <li>
              Astral Library&apos;s puzzle wings hide three hidden chests; they
              contain the only early copies of Acceleration Chips.
            </li>
            <li>
              Clockmon&apos;s arena drops Rare Circuit Boards if defeated with a
              Burst finish. Save your Harmony nodes to secure the bonus.
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
          <h3 className="text-lg font-semibold text-white">
            Recommended Toolbox
          </h3>
          <p>
            Ensure the following support features are active before commencing
            Chapter 4:
          </p>
          <ul className="mt-3 space-y-2">
            <li>Evolution Tree plans for two alternative Mega routes.</li>
            <li>
              Skill Planner loadouts saved for both Vanguard and Barrier paths.
            </li>
            <li>
              Team Builder resist matrix screenshot for quick mid-fight review.
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <span>Next step: lock in your Side Quest rotational routes.</span>
        <a
          href={getUrlWithLocale(
            '/guides/side-quests/expedition-ledger',
            locale
          )}
          className="inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
        >
          Open the Side Quest Expedition Ledger →
        </a>
      </footer>
    </article>
  );
}
