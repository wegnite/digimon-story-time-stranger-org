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
    <section className="relative overflow-hidden border-b border-blue-500/20 bg-gradient-to-b from-[#0a0f24] via-[#0d1428] to-[#040610] pb-20 pt-24">
      {/* Animated digital pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.1),transparent_50%)]" />
      {/* Digital grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="relative z-10 container mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center lg:justify-center">
        <div className="max-w-2xl space-y-6 lg:flex-1">
          <Badge
            variant="outline"
            className="w-fit border-blue-400/60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-xs uppercase tracking-wide text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <Globe2 className="mr-2 h-3.5 w-3.5" />
            {t('featureLabel')}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent md:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
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
              className="border-blue-400/60 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300"
            >
              <LocaleLink href={secondaryHref}>{t('secondaryCta')}</LocaleLink>
            </Button>
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={`${feature}-${index}`}
                className="group flex items-start gap-3 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-4 transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-400 group-hover:text-blue-300 transition-colors" />
                <p className="text-sm text-slate-200 group-hover:text-white transition-colors">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full max-w-md border-blue-400/30 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] lg:flex-1">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wider text-blue-300 font-semibold">
                {t('subtitle')}
              </p>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Digimon Story Time Stranger Global Guide
              </h2>
              <p className="text-sm text-slate-300">
                {t('cardDescription', { defaultValue: t('description') })}
              </p>
            </div>
            <div className="rounded-lg border border-blue-400/30 bg-gradient-to-br from-blue-500/15 to-purple-500/10 p-4 shadow-inner">
              <p className="text-sm text-blue-300 font-medium">{t('subtitle')}</p>
              <p className="mt-2 text-sm text-slate-200 font-mono">
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

      {/* Copyright Disclaimer Banner */}
      <div className="relative z-10 container mx-auto mt-12 px-4">
        <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 backdrop-blur-sm p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <span className="text-amber-400 text-xl flex-none mt-0.5">⚠️</span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-300">
                {t('disclaimer.title', { defaultValue: 'UNOFFICIAL FAN SITE - NOT AFFILIATED WITH BANDAI NAMCO' })}
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                {t('disclaimer.content', {
                  defaultValue:
                    'This is an independent fan-created guide. We are NOT affiliated with Bandai Namco Entertainment or official Digimon entities. We do not distribute game files, ROMs, or cracked versions. This site provides informational content only under fair use for educational purposes.',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
