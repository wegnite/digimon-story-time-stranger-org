import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Apex Threat Dossiers';
const DESCRIPTION =
  'Comprehensive boss strategy guide for Digimon Story Time Stranger, featuring mechanic breakdowns, suggested squads, and timeline counterplay for late-game encounters.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'GuidesBoss' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/guides/boss/apex-dossiers', locale),
  });
}

interface BossDossiersPageProps {
  params: Promise<{ locale: Locale }>;
}

type BossCard = {
  name: string;
  location: string;
  level: number;
  hp: number;
  mechanics: string[];
  counter: string;
  recommended: string[];
};

const BOSSES: BossCard[] = [
  {
    name: 'Temporal Guardian – Seraphimon (Variant Ω)',
    location: 'Skyspire Citadel (Chapter 5)',
    level: 52,
    hp: 32500,
    mechanics: [
      'Alternates between Light and Null phases every two turns. Damage types that match the current phase heal Seraphimon instead of harming it.',
      'Timeline Seal prevents turn manipulation once HP drops below 60%.',
      'Wings of Penance triggers if no Harmony node is spent within three rounds, resulting in a team-wide Stasis debuff.',
    ],
    counter:
      'Maintain two dedicated Harmony users to avoid Wings of Penance. Bring Null-type techs such as Kyubimon’s Spirit Dragoon to pierce the Light phase without triggering the heal. Use Team Builder layouts emphasizing resistance chips over raw attack.',
    recommended: ['Kyubimon', 'Angemon', 'ExVeemon'],
  },
  {
    name: 'Paradox Behemoth – Metallum Etemon',
    location: 'Neon District Reactor Core',
    level: 56,
    hp: 28400,
    mechanics: [
      'Stacks Crowdwork Armor each time you repeat a skill. At three stacks, becomes immune to physical damage for five turns.',
      'Throws out Shock Sync pulses that spread paralysis unless cleansed immediately.',
      'Summons Speaker Drones at 70% and 30% HP; they heal 6% HP per turn if not destroyed.',
    ],
    counter:
      'Rotate at least six unique skills to avoid armor stacking. Equip Disruption Chip γ to refresh cooldowns faster. Prioritize destroying Speaker Drones with wide-area attacks (Greymon’s Mega Flame) while allocating one healer to spam cleanse for Shock Sync.',
    recommended: ['Greymon', 'Sunflowmon', 'Gargomon'],
  },
  {
    name: 'Chrono Aberration – Lilithmon Prime',
    location: 'Astral Library – Forbidden Annex',
    level: 60,
    hp: 37800,
    mechanics: [
      'Applies Corruption stacks via Night Parade. At five stacks, a partner turns hostile for two turns.',
      'Uses Dark Waltz to dance across the timeline, acting twice in a row if no Digimon occupies the second slot.',
      'Summons Mirror Avatars that copy your highest Attack stat partner.',
    ],
    counter:
      'Rotate your party order every turn to deny Dark Waltz extra actions. Bring status cleansing (Lekismon, Wisemon) and stun skills to control Mirror Avatars before they mirror your burst Digimon. Stack Light-resist plugins and a Null-type nuke for the final 25% phase.',
    recommended: ['Lekismon', 'Wisemon', 'Aquilamon'],
  },
];

export default async function BossDossiersPage({
  params,
}: BossDossiersPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-5xl">
      <header className="mb-10 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-purple-300">
          Boss Strategies
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-3 text-sm text-slate-400">
          Strategies verified for build 1.1.2. Future patches may change turn
          counts or ability names; consult the News patch tracker for updates.
        </p>
      </header>

      <section className="grid gap-6">
        {BOSSES.map((boss) => (
          <div
            key={boss.name}
            className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-6"
          >
            <header className="flex flex-col gap-1 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-semibold text-white">{boss.name}</h2>
              <p className="text-sm text-slate-300">{boss.location}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Lv. {boss.level} · HP {boss.hp.toLocaleString()} · Recommended
                Burst Gauge: 3+
              </p>
            </header>

            <div className="mt-4 grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-lg font-semibold text-white">Mechanics</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
                  {boss.mechanics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <aside className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-200">
                <h3 className="text-base font-semibold text-white">
                  Recommended Squad
                </h3>
                <ul className="mt-2 space-y-1">
                  {boss.recommended.map((partner) => (
                    <li key={partner}>• {partner}</li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100">
              <h3 className="text-base font-semibold text-white">
                Counterplan
              </h3>
              <p className="mt-2 leading-relaxed">{boss.counter}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-2xl text-white">Burst Gauge Routing</h2>
        <p>
          Keep at least three Burst gauges banked before each encounter. Use the
          Team Builder’s simulation mode to test burst chains; you should always
          have one emergency gauge in case of unexpected timeline skips.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Pair Sunflowmon&apos;s Radiant Bloom with Kyubimon&apos;s Spirit
            Dragoon to trigger double Harmony nodes.
          </li>
          <li>
            Save ExVeemon&apos;s Dragon Impulse burst for the final 20% HP
            phase.
          </li>
          <li>
            Equip at least one Digimon with the Chrono Lens to predict incoming
            turn skips.
          </li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Need help tuning your builds? The Skill Planner and Evolution Tree
          primers cover late-game synergy paths and resource budgeting.
        </p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <a
            className="inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
            href={getUrlWithLocale('/tools/skill-planner/combo-theory', locale)}
          >
            Skill Planner Combo Theory →
          </a>
          <a
            className="inline-flex items-center rounded-lg border border-blue-300/30 px-4 py-2 text-blue-100 transition hover:bg-blue-500/10"
            href={getUrlWithLocale(
              '/tools/evolution-tree/planner-basics',
              locale
            )}
          >
            Evolution Tree Planner Basics →
          </a>
        </div>
      </footer>
    </article>
  );
}
