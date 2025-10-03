'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { AlarmClock, Bell, Globe2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function UpdatesAndLocalization() {
  const tUpdates = useTranslations('DigimonHome.updates');
  const tLocalization = useTranslations('DigimonHome.localization');
  const tCta = useTranslations('DigimonHome.cta');

  const updateItems = tUpdates.raw('items') as Array<{
    title: string;
    description: string;
  }>;
  const regions = tLocalization.raw('regions') as string[];

  const primaryHref = tCta('primaryHref');
  const secondaryHref = tCta('secondaryHref');

  return (
    <section className="space-y-16 bg-[#050719] py-20">
      <div className="container mx-auto space-y-10 px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-blue-500/15 p-3 text-blue-300">
                <AlarmClock className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl text-white">
                {tUpdates('title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-200">
              {updateItems.map((item, index) => (
                <div key={`${item.title}-${index}`} className="space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-emerald-500/15 p-3 text-emerald-300">
                <Globe2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl text-white">
                {tLocalization('title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-200">
              <p className="text-sm text-slate-300">
                {tLocalization('description')}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {regions.map((region, index) => (
                  <div
                    key={`${region}-${index}`}
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-200"
                  >
                    {region}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/20 p-8 text-center">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">
            {tCta('title')}
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200">
            {tCta('description')}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <LocaleLink href={primaryHref}>{tCta('primaryCta')}</LocaleLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/40 text-white hover:bg-white/10"
            >
              <LocaleLink href={secondaryHref}>
                {tCta('secondaryCta')}
              </LocaleLink>
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-300">
            <Bell className="h-4 w-4" />
            <span>
              {tCta('meta', {
                defaultValue:
                  'Set your locale preference to receive notifications in your language.',
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
