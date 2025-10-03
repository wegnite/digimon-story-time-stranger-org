'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  GitBranch,
  Globe,
  Heart,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

export function GameFeaturesSection() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: '210+ Digimon',
      description:
        'Collect and raise more than 210 Digimon spanning classic and new lineages',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: 'Complex Evolution System',
      description:
        'Non-linear evolution paths with multiple digivolution and de-digivolution options',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: <Swords className="h-8 w-8" />,
      title: 'Strategic Turn-Based Combat',
      description:
        'Dynamic battles combining strategy, timing, and Digimon abilities',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'DNA/Jogress Evolution',
      description:
        'Combine compatible Digimon pairs for powerful fusion attacks',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: '16 Personality Types',
      description:
        'Each personality influences stat growth and battle behavior',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Olympos XII Encounters',
      description:
        'Face legendary figures such as Merukimon, Minervamon, and Bacchusmon through late-game questlines',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Human & Digital Worlds',
      description:
        'Explore interconnected worlds with rich storylines and mysteries',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Agent Rank System',
      description:
        'Progressive power gating that manages your evolution progression',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  return (
    <section className="border-b border-white/10 bg-[#040610] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-blue-500/60 bg-blue-500/10 text-xs uppercase tracking-wide"
          >
            Game Features
          </Badge>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Dive into the most comprehensive Digimon RPG experience yet
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={`${feature.title}-${index}`}
              className="group border-white/10 bg-white/5 backdrop-blur transition-all hover:border-blue-500/50 hover:bg-white/10"
            >
              <CardContent className="space-y-4 p-6">
                <div
                  className={`inline-flex rounded-lg ${feature.bgColor} p-3 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
