import { Card, CardContent } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight, Bookmark, Map, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RoadmapBeat {
  title: string;
  details: string;
}

interface RoadmapPhase {
  phase: string;
  heading: string;
  description: string;
  href: string;
  beats: RoadmapBeat[];
}

const phaseIcons = [Bookmark, Map, Target];

export function WalkthroughRoadmapSection() {
  const t = useTranslations('DigimonHome.walkthroughRoadmap');
  const timeline = t.raw('timeline') as RoadmapPhase[];

  if (!timeline?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-b border-blue-500/20 bg-gradient-to-b from-[#030516] via-[#04071b] to-[#020314] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.18),transparent_70%)]" />
      <div className="relative z-10 container mx-auto space-y-12 px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-slate-300">{t('description')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {timeline.map((phase, index) => {
            const Icon = phaseIcons[index % phaseIcons.length];
            return (
              <Card
                key={`${phase.phase}-${phase.heading}`}
                className="group h-full border-blue-400/25 bg-white/5 backdrop-blur transition hover:border-blue-400/60"
              >
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-center gap-3 text-blue-200">
                    <Icon className="h-5 w-5" />
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      {phase.phase}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {phase.heading}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {phase.description}
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-200">
                    {phase.beats.map((beat) => (
                      <li
                        key={`${beat.title}-${beat.details}`}
                        className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-3"
                      >
                        <p className="text-sm font-medium text-white">
                          {beat.title}
                        </p>
                        <p className="text-xs text-slate-300">{beat.details}</p>
                      </li>
                    ))}
                  </ul>
                  <LocaleLink
                    href={phase.href}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-blue-100"
                  >
                    {t('ctaLabel')}
                    <ArrowRight className="h-4 w-4" />
                  </LocaleLink>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
