'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, MapPinned, PackageSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const cardIcons = [Database, PackageSearch, MapPinned];

export function DatabaseShowcase() {
  const t = useTranslations('DigimonHome.database');
  const cards = t.raw('cards') as Array<{
    title: string;
    description: string;
    stat: string;
    href: string;
  }>;

  return (
    <section className="border-y border-white/10 bg-[#070a1f] py-20">
      <div className="container mx-auto space-y-8 px-4">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-300">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = cardIcons[index % cardIcons.length];
            return (
              <Card
                key={`${card.title}-${index}`}
                className="flex h-full flex-col border-white/10 bg-white/5 backdrop-blur"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-blue-500/15 p-3 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl text-white">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between space-y-6 text-slate-200">
                  <p className="text-sm text-slate-300">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-200">
                      {card.stat}
                    </span>
                    <Link
                      href={card.href}
                      className="text-sm font-medium text-blue-300 hover:text-blue-200"
                    >
                      View entries
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
