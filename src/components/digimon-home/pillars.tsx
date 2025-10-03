'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function StrategyPillars() {
  const t = useTranslations('DigimonHome.pillars');
  const items = t.raw('items') as Array<{
    title: string;
    description: string;
    href: string;
  }>;

  return (
    <section className="container mx-auto space-y-8 px-4 py-16">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          {t('title')}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <Card
            key={`${item.title}-${index}`}
            className="group flex h-full flex-col border-white/10 bg-white/5 backdrop-blur transition hover:border-blue-400/60"
          >
            <CardHeader>
              <CardTitle className="text-xl text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-6 text-slate-200">
              <p className="text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-blue-300 transition group-hover:text-blue-200"
              >
                <span>Open section</span>
                <ArrowRightCircle className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
