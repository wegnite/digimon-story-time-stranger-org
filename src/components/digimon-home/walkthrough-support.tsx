import { Card, CardContent } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { BrainCircuit, Compass, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SupportPillar {
  title: string;
  description: string;
  bullets: string[];
  href: string;
  cta: string;
}

const icons = [Sparkles, BrainCircuit, Compass];

export function WalkthroughSupportSection() {
  const t = useTranslations('DigimonHome.walkthroughSupport');
  const pillars = t.raw('pillars') as SupportPillar[];

  if (!pillars?.length) {
    return null;
  }

  return (
    <section className="border-b border-purple-500/20 bg-gradient-to-b from-[#040610] via-[#080c22] to-[#020314] py-20">
      <div className="container mx-auto space-y-12 px-4">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-slate-300">{t('description')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card
                key={`${pillar.title}-${index}`}
                className="group h-full border-purple-400/25 bg-white/5 backdrop-blur transition hover:border-purple-400/60"
              >
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-center gap-3 text-purple-200">
                    <Icon className="h-5 w-5" />
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      {t('pillarLabel')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-200">
                    {pillar.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${pillar.title}-${bulletIndex}`}
                        className="rounded-lg border border-purple-400/20 bg-purple-500/10 p-3"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <LocaleLink
                    href={pillar.href}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition hover:text-purple-100"
                  >
                    {pillar.cta}
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
