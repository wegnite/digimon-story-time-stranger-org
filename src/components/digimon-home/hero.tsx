'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Gamepad2,
  Globe2,
  History,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DigimonHero() {
  const t = useTranslations('DigimonHome.hero');
  const audience = t.raw('audience') as string[];
  const stats = t.raw('stats') as Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  const quickStart = t.raw('quickStart') as Array<{
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  }>;
  const cardHighlights = t.raw('cardHighlights') as Array<{
    title: string;
    description: string;
  }>;
  const primaryHref = t('primaryHref');
  const secondaryHref = t('secondaryHref');
  const statIcons = [CalendarDays, Gamepad2, History];

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
            {audience.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="group flex items-start gap-3 rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-4 transition-all duration-300 hover:border-blue-400/45 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              >
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-blue-400 group-hover:text-blue-200 transition-colors" />
                <p className="text-sm text-slate-200 group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <div
                  key={`${stat.label}-${index}`}
                  className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                >
                  <div className="flex items-center gap-3 text-blue-200">
                    <Icon className="h-5 w-5" />
                    <p className="text-xs uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">{stat.helper}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 pt-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                {t('quickStartHeading')}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {t('quickStartDescription')}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {quickStart.map((item, index) => (
                <Card
                  key={`${item.title}-${index}`}
                  className="group h-full border-blue-400/30 bg-white/5 backdrop-blur transition hover:border-blue-400/60"
                >
                  <CardContent className="flex h-full flex-col justify-between space-y-4 p-5">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                        0{index + 1}
                      </p>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {item.description}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                    >
                      <LocaleLink href={item.href}>{item.ctaLabel}</LocaleLink>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md border-blue-400/30 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] lg:flex-1">
          <CardHeader className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
              {t('card.tagline')}
            </p>
            <CardTitle className="text-2xl font-bold text-white">
              {t('card.title')}
            </CardTitle>
            <p className="text-sm text-slate-300">{t('card.description')}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              {cardHighlights.map((highlight, index) => (
                <div
                  key={`${highlight.title}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                    {highlight.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-blue-400/30 bg-gradient-to-br from-blue-500/15 to-purple-500/10 p-4 shadow-inner">
              <p className="text-sm text-blue-300 font-medium">
                {t('card.metaLabel')}
              </p>
              <p className="mt-2 text-sm text-slate-200 font-mono">
                {t('card.metaValue')}
              </p>
              <p className="mt-2 text-xs text-slate-300">
                {t('card.metaHelper')}
              </p>
            </div>
            <p className="text-xs text-slate-400">{t('card.footnote')}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
