import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Lost Chronicle Compendium';
const DESCRIPTION =
  'Hidden Digimon recruits, alternate endings, and collectible routes for Time Stranger, including step-by-step puzzle solutions and missable windows.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'GuidesSecrets' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/guides/secrets/lost-chronicle', locale),
  });
}

interface LostChroniclePageProps {
  params: Promise<{ locale: Locale }>;
}

const SECRET_ROUTES = [
  {
    name: 'Hidden Digimon – Lopmon',
    steps: [
      'During Chapter 2, scan all Resonant Graffiti murals (Neon District). Each mural grants a "Harmony Note".',
      'Complete the optional quest "Resonant Graffiti" from the Expedition Ledger to combine five notes into the Melody Token.',
      'In Chapter 3, visit the Astral Library Choir Chamber between 19:00-21:00 system time. Play the Melody Token on the harp to trigger Lopmon’s recruitment fight.',
    ],
    reward:
      'Recruit Lopmon at Champion stage with unique support skill “Harmonic Ward”.',
  },
  {
    name: 'Alternate Ending – Vanguard Offensive',
    steps: [
      'Gain 60+ Vanguard faction affinity (complete Skyline Sweep, side with Kei in Chapter 2).',
      'At Chapter 4 finale, choose the Vanguard Assault plan. Save the battle log to keep Resonance Barrier path available on NG+.',
      'After the final boss, talk to the Vanguard captain within 10 minutes to watch the exclusive ending cinematic and unlock the “Iron Aegis” title.',
    ],
    reward: 'Alternate credits sequence + unique Burst skin “Aegis Overlay”.',
  },
  {
    name: 'Collectible – Chrono Shards',
    steps: [
      'Earn the Resonance Lens in Chapter 2. Equip it to reveal faint shimmering trails in exploration zones.',
      'Collect 15 shards before Chapter 5. The final shard only spawns if you completed the Memory Dive side quest.',
      'Return to Professor Hikawa for the Chrono Archive cutscene and a permanent +5% skill haste bonus.',
    ],
    reward: 'Passive skill “Accelerated Synapse” for the entire party.',
  },
];

export default async function LostChroniclePage({
  params,
}: LostChroniclePageProps) {
  await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-10 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-pink-300">
          Secrets
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-3 text-sm text-slate-400">
          Warning: spoilers ahead. Bookmark this page only if you intend to
          chase 100% completion or unlock alternate endings.
        </p>
      </header>

      <section className="space-y-6">
        {SECRET_ROUTES.map((route) => (
          <div
            key={route.name}
            className="rounded-xl border border-pink-400/20 bg-pink-500/10 p-6"
          >
            <h2 className="text-2xl font-semibold text-white">{route.name}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-200">
              {route.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-emerald-200">
              Reward: {route.reward}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-2xl text-white">
          Puzzle Reference – Glyph Alignment
        </h2>
        <p>
          The Chapter 3 Glyph puzzle rotates symbols according to the in-game
          clock. Use the matrix below as a quick reference.
        </p>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Outer Ring</th>
                <th className="px-4 py-3">Middle Ring</th>
                <th className="px-4 py-3">Inner Ring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="px-4 py-3">06:00-11:59</td>
                <td className="px-4 py-3">Sun Glyph → East</td>
                <td className="px-4 py-3">Leaf Glyph → North</td>
                <td className="px-4 py-3">Wave Glyph → West</td>
              </tr>
              <tr className="bg-white/5">
                <td className="px-4 py-3">12:00-17:59</td>
                <td className="px-4 py-3">Moon Glyph → South</td>
                <td className="px-4 py-3">Bolt Glyph → East</td>
                <td className="px-4 py-3">Wave Glyph → North</td>
              </tr>
              <tr>
                <td className="px-4 py-3">18:00-23:59</td>
                <td className="px-4 py-3">Star Glyph → West</td>
                <td className="px-4 py-3">Leaf Glyph → South</td>
                <td className="px-4 py-3">Flame Glyph → East</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">
            New Game+ Carryover Tips
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              Harmony nodes, completed Memory Dive logs, and Chrono Shard bonus
              carry into NG+.
            </li>
            <li>
              Faction affinity resets, but titles earned from alternate endings
              unlock cosmetic auras.
            </li>
            <li>
              Hidden Digimon recruits unlocked once remain available in future
              playthroughs without repeating the puzzles.
            </li>
          </ul>
        </div>
        <aside className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
          <h3 className="text-lg font-semibold text-white">Watchlist</h3>
          <p className="mt-2">
            Publisher teasers hint at an upcoming event called{' '}
            <em>Luminous Tides</em>. Expect new collectibles; keep at least five
            Chrono Shards unspent to activate the event portal quickly.
          </p>
        </aside>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Sync this compendium with your Side Quest ledger and Walkthrough log
          to avoid missing critical windows. Report new findings via the
          Community Hub so the database stays fresh.
        </p>
      </footer>
    </article>
  );
}
