import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Event Briefing – Luminous Tides Festival';
const DESCRIPTION =
  'Schedule, rewards, and preparation checklist for the limited-time Luminous Tides event in Digimon Story Time Stranger.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'NewsEvents' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale(
      '/news/events/luminous-tides-briefing',
      locale
    ),
  });
}

interface EventBriefingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function EventBriefingPage({
  params,
}: EventBriefingPageProps) {
  const { locale } = await params;

  return (
    <article className="prose prose-invert mx-auto max-w-4xl">
      <header className="mb-8 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
          Event Briefing
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{TITLE}</h1>
        <p className="mt-3 text-slate-300">{DESCRIPTION}</p>
        <p className="mt-3 text-sm text-slate-400">
          Event window: 2024-10-18 10:00 UTC → 2024-11-01 09:59 UTC.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl text-white">Event Structure</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            <strong>Festival Missions:</strong> Daily tasks rewarding Tide
            Tokens.
          </li>
          <li>
            <strong>Tempest Raids:</strong> 8-player co-op fights against event
            exclusive bosses.
          </li>
          <li>
            <strong>Harmony Parade:</strong> Social mini-event unlocking story
            cutscenes as the community donates tokens.
          </li>
        </ul>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-slate-200">
          <h3 className="text-lg font-semibold text-white">
            Daily Reset Checklist
          </h3>
          <ul className="mt-3 space-y-2">
            <li>Complete 3 Festival Missions (approx. 15 min).</li>
            <li>Spend Tide Tokens on the rotating shop stock.</li>
            <li>Contribute at least 10 tokens to the Harmony Parade bar.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-teal-400/30 bg-teal-500/10 p-6 text-sm text-teal-100">
          <h3 className="text-lg font-semibold text-white">
            Tempest Raid Loadout
          </h3>
          <ul className="mt-3 space-y-2">
            <li>Recommended resistances: Water, Wind.</li>
            <li>
              Bring at least one cleanse/heal Digimon (Sunflowmon, Wisemon).
            </li>
            <li>Coordinate Burst timings via Team Builder share codes.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Reward Highlights</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>Lopmon costume: Tide Voyager (cosmetic, event exclusive).</li>
          <li>Accessory: Tidal Charm (+8% Water resistance).</li>
          <li>
            Title: Luminous Ambassador (requires donating 300+ tokens during the
            Harmony Parade).
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl text-white">Prep Recommendations</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-200">
          <li>
            Stockpile 25 Chrono Shards to unlock the event portal instantly.
          </li>
          <li>
            Review the Side Quest Expedition ledger; some quests award bonus
            Tide Tokens while the event is live.
          </li>
          <li>
            Upgrade Regen plugins to Tier β to counter Tempest raid damage.
          </li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-300">
        <p>
          Share raid clears and token totals in the Community Hub to unlock
          global milestones faster.
        </p>
        <a
          className="mt-3 inline-flex items-center rounded-lg border border-white/15 px-4 py-2 text-white transition hover:bg-white/10"
          href={getUrlWithLocale('/community', locale)}
        >
          Coordinate with the community →
        </a>
      </footer>
    </article>
  );
}
