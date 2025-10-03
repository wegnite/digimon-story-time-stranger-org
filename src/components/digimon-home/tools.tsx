'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Sparkles, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const icons = [GitBranch, Sparkles, Users];

export function PlanningTools() {
  const t = useTranslations('DigimonHome.tools');
  const cards = t.raw('cards') as Array<{
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
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card
              key={`${card.title}-${index}`}
              className="group flex h-full flex-col border-white/10 bg-white/5 backdrop-blur transition hover:border-blue-400/60"
            >
              <CardHeader className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/15 p-3 text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl text-white">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between space-y-6 text-slate-200">
                <p className="text-sm text-slate-300">{card.description}</p>
                <Link
                  href={card.href}
                  className="text-sm font-medium text-blue-300 transition group-hover:text-blue-200"
                >
                  Launch tool
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
