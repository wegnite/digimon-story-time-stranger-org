'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { Quote, Volume2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SpotlightEntry {
  id: string;
  title: string;
  quote: string;
  source: string;
  sourceUrl: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  voiceLines: Array<{
    character: string;
    line: string;
  }>;
}

export function SpotlightFeaturesSection() {
  const t = useTranslations('DigimonHome.spotlight');
  const features = t.raw('features') as SpotlightEntry[];

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-blue-500/20 bg-gradient-to-b from-[#020314] via-[#060b1f] to-[#040610] py-20">
      <div className="container mx-auto space-y-10 px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-100">
            <Quote className="h-3.5 w-3.5" />
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-slate-300">{t('description')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="flex h-full flex-col border-purple-400/30 bg-white/5 backdrop-blur transition hover:border-purple-400/60"
            >
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
                <blockquote className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-200">
                  <p className="italic">“{feature.quote}”</p>
                  <footer className="mt-3 text-xs text-purple-200">
                    <a
                      href={feature.sourceUrl}
                      className="underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {feature.source}
                    </a>
                  </footer>
                </blockquote>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between space-y-6">
                <p className="text-sm text-slate-300">{feature.summary}</p>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-100">
                    {t('voiceLinesLabel')}
                  </p>
                  <div className="space-y-2">
                    {feature.voiceLines.map((line, index) => (
                      <div
                        key={`${feature.id}-voice-${index}`}
                        className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                      >
                        <Volume2 className="mt-1 h-4 w-4 flex-none text-purple-200" />
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-purple-100">
                            {line.character}
                          </p>
                          <p className="text-sm text-slate-200">{line.line}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  <LocaleLink href={feature.ctaHref}>
                    {feature.ctaLabel}
                  </LocaleLink>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
