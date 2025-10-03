'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight, CheckCircle, Globe2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DigimonHero() {
  const t = useTranslations('DigimonHome.hero');
  const features = t.raw('features') as string[];
  const primaryHref = t('primaryHref');
  const secondaryHref = t('secondaryHref');

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#040610] pb-20 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(78,103,255,0.2),transparent_65%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(67,20,153,0.25)_0%,rgba(20,24,95,0.2)_45%,rgba(8,12,40,0.85)_100%)]" />

      <div className="relative z-10 container mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center lg:justify-center">
        <div className="max-w-2xl space-y-6 lg:flex-1">
          <Badge
            variant="outline"
            className="w-fit border-blue-500/60 bg-blue-500/10 text-xs uppercase tracking-wide"
          >
            <Globe2 className="mr-2 h-3.5 w-3.5" />
            {t('featureLabel')}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg text-slate-200 md:text-xl">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <LocaleLink href={primaryHref}>
                {t('primaryCta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </LocaleLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-slate-500/60 bg-white/5 text-white hover:bg-white/10"
            >
              <LocaleLink href={secondaryHref}>{t('secondaryCta')}</LocaleLink>
            </Button>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-emerald-400" />
                <p className="text-sm text-slate-200">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full max-w-md border-blue-500/30 bg-white/5 backdrop-blur lg:flex-1">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-blue-200">
                {t('subtitle')}
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Digimon Story Time Stranger Global Guide
              </h2>
              <p className="text-sm text-slate-200">
                {t('cardDescription', { defaultValue: t('description') })}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">{t('subtitle')}</p>
              <p className="mt-2 text-sm text-slate-200">
                https://digimonstorytimestranger.com
              </p>
            </div>
            <p className="text-xs text-slate-400">
              {t('footerNote', {
                defaultValue:
                  'Localized launch coverage with community translation hooks for additional languages.',
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
