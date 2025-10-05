import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const TITLE = 'Beginner Field Manual – Launch Protocols';
const DESCRIPTION =
  'Detailed onboarding blueprint for new tamers entering Time Stranger, covering starter partners, resource routes, and early combat fundamentals.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  await getTranslations({ locale, namespace: 'GuidesBeginner' }).catch(
    () => undefined
  );

  return constructMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalUrl: getUrlWithLocale('/guides/beginner/field-manual', locale),
  });
}

interface FieldManualPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function FieldManualPage({
  params,
}: FieldManualPageProps) {
  const { locale } = await params;
  const localeLabel = locale === 'ja' ? 'JP' : locale.toUpperCase();

  return (
    <article className="prose prose-invert mx-auto max-w-4xl prose-headings:font-semibold prose-p:text-slate-200">
      <header className="mb-10 border-b border-white/10 pb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
          Orientation · {localeLabel}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white lg:text-4xl">
          {TITLE}
        </h1>
        <p className="mt-4 text-base text-slate-300">{DESCRIPTION}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl">Mission Brief</h2>
        <p>
          The opening three hours of <em>Time Stranger</em> are
          intentionally dense: systems unlock in quick succession, affinity
          choices lock major narrative paths, and the Chrono Grid tutorial is
          unforgiving if you approach it like a traditional turn-based RPG. This
          field manual condenses our lab notes into a clear onboarding plan you
          can follow without slowing your real-time momentum.
        </p>
        <ul className="list-disc space-y-1 pl-6 text-slate-200">
          <li>
            Establish a stable partner triad before the first Atlas breach.
          </li>
          <li>Secure a sustainable digi-core income loop by cycle 3.</li>
          <li>
            Internalize the stagger system and disruption windows to prevent
            Chrono Overload wipes.
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl">Starter Partner Matrix</h2>
        <p>
          You pick two partners in the prologue and recruit a third after the
          Tutorial Rift. The table below lists synergistic trios tested during
          v1.0 balancing. Attribute coverage and Harmony arcs were prioritized
          over raw damage so the compositions stay relevant through Chapter 4.
        </p>

        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 text-left text-sm uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-4 py-3">Role Blueprint</th>
                <th className="px-4 py-3">Partner Trio</th>
                <th className="px-4 py-3">Synergy Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-white">
                  Chrono Control
                </td>
                <td className="px-4 py-3">
                  Patamon → Angemon • Lunamon → Lekismon • Floramon → Sunflowmon
                </td>
                <td className="px-4 py-3">
                  Double stagger tools and the Sunflow healing field allow you
                  to safely learn the delay-counter system; ideal for players
                  new to timeline manipulation.
                </td>
              </tr>
              <tr className="bg-white/5">
                <td className="px-4 py-3 font-medium text-white">
                  Burst Vanguard
                </td>
                <td className="px-4 py-3">
                  Agumon → Greymon • Renamon → Kyubimon • Hawkmon → Aquilamon
                </td>
                <td className="px-4 py-3">
                  Greymon&apos;s Flame Crash primes enemies for Kyubimon&apos;s
                  foxfire pierce. Aquilamon&apos;s sky lanes supply consistent
                  guard breaks.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">
                  Sustain Expedition
                </td>
                <td className="px-4 py-3">
                  Terriermon → Gargomon • Palmon → Togemon • Veemon → ExVeemon
                </td>
                <td className="px-4 py-3">
                  High DEF and access to reactive shields let you capture Chrono
                  Rift nodes without draining items. Gargomon&apos;s rapid fire
                  keeps the Burst Gauge filled.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-2xl">Cycle-by-Cycle Route</h2>
        <p>
          The timeline below assumes Normal difficulty. Hard mode pushes the
          resource windows forward by approximately 15 minutes, so adjust your
          farming laps accordingly.
        </p>
        <ol className="list-decimal space-y-3 pl-6 text-slate-200">
          <li>
            <strong>Cycle 0 – Prologue Simulations:</strong> Do not spend the
            initial 2,000 digi-credits. Instead, complete all three training
            modules to earn the Instructor&apos;s Cache and unlock the first
            Affinity burst.
          </li>
          <li>
            <strong>Cycle 1 – Verdant Crossroad:</strong> Prioritize relic scans
            on the north ridge. The Chrono Beetles here drop Modular Shells that
            convert into early Guard Plug-ins.
          </li>
          <li>
            <strong>Cycle 2 – Obsidian Transit:</strong> Unlock the subway safe
            room. This becomes the backbone of your quick-travel network once
            you capture three Anchor Points.
          </li>
          <li>
            <strong>Cycle 3 – Fractured Plaza:</strong> Engage the optional Rift
            Warden. The fight teaches counter play with minimal punishment and
            rewards the Chrono Lens accessory.
          </li>
        </ol>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-6 text-sm text-emerald-50">
          <h3 className="text-lg font-semibold text-white">
            Battle Fundamentals
          </h3>
          <p className="mt-2">
            Master these three interactions before Chapter 2 and you will avoid
            90% of early defeats.
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <strong>Timeline Compression:</strong> Trigger the Compress order
              only when an enemy is already staggered. Doing so on a stable
              target accelerates their next turn instead of yours.
            </li>
            <li>
              <strong>Signal Drift:</strong> Status ailments introduced in Time
              Stranger stack in &ldquo;drift tiers&rdquo;. Cleanse the drift,
              not the underlying ailment, to prevent reapplication the following
              round.
            </li>
            <li>
              <strong>Resonance Chains:</strong> Activating two Harmony nodes in
              one round grants a free follow-up from the reserve partner. Bake
              this into your burst rotations early.
            </li>
          </ul>
        </div>

        <aside className="rounded-xl border border-blue-400/40 bg-blue-500/10 p-6 text-sm text-blue-100">
          <h3 className="text-lg font-semibold text-white">
            Milestone Checklist
          </h3>
          <ul className="mt-3 space-y-2">
            <li>✔ Unlock double-techs before entering the Astral Library.</li>
            <li>✔ Reach Affinity rank 2 with at least one partner.</li>
            <li>
              ✔ Hoard 12+ Modular Shells for the Chapter 2 crafting quest.
            </li>
            <li>
              ✔ Complete three Community Board bounties to open the Bazaar.
            </li>
          </ul>
        </aside>
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-2xl">Actionable Next Steps</h2>
        <p>
          With the foundation laid, move directly into the Chapter 1 walkthrough
          and the Side Quest Atlas. Keep updating your partner journal with AI
          taunt patterns—the more data you capture now, the easier it will be to
          predict boss rotations later in the campaign.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <a
            href={getUrlWithLocale('/guides/walkthrough/main-arc', locale)}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Continue to Main Story Logbook
          </a>
          <a
            href={getUrlWithLocale(
              '/guides/side-quests/expedition-ledger',
              locale
            )}
            className="inline-flex items-center justify-center rounded-lg border border-blue-300/40 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-500/20"
          >
            Download the Side Quest Atlas
          </a>
        </div>
      </section>
    </article>
  );
}
