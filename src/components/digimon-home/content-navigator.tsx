'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContentItem {
  title: string;
  description: string;
  href: string;
  meta: string;
}

interface ContentCategory {
  id: string;
  label: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  items: ContentItem[];
}

export function ContentDiscoverySection() {
  const t = useTranslations('DigimonHome.contentDiscovery');
  const categories = t.raw('categories') as ContentCategory[];

  if (!categories || categories.length === 0) {
    return null;
  }

  const defaultValue = categories[0]?.id ?? 'guides';

  return (
    <section className="border-y border-blue-500/20 bg-gradient-to-b from-[#040610] via-[#05081a] to-[#020314] py-20">
      <div className="container mx-auto space-y-10 px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-base text-slate-300">{t('description')}</p>
        </div>

        <Tabs defaultValue={defaultValue} className="space-y-8">
          <TabsList className="mx-auto flex w-fit flex-wrap gap-2 bg-white/5 p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-100 border-blue-400/40 text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-6"
            >
              <div className="text-center text-sm text-blue-200">
                {category.tagline}
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {category.items.map((item, index) => (
                  <Card
                    key={`${category.id}-${item.title}-${index}`}
                    className="group h-full border-blue-400/30 bg-white/5 backdrop-blur transition hover:border-blue-400/60"
                  >
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-100">
                        {item.title}
                      </CardTitle>
                      <p className="text-xs uppercase tracking-wide text-blue-200">
                        {item.meta}
                      </p>
                    </CardHeader>
                    <CardContent className="flex h-full flex-col justify-between">
                      <p className="text-sm text-slate-300">
                        {item.description}
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      >
                        <LocaleLink href={item.href}>
                          {t('itemCtaLabel')}
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </LocaleLink>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-400/40 text-blue-200 hover:border-blue-400 hover:text-blue-100"
                >
                  <LocaleLink href={category.ctaHref}>
                    {category.ctaLabel}
                  </LocaleLink>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
