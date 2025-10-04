'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  CalendarDays,
  Compass,
  Database,
  FileText,
  Flag,
  GitBranch,
  Globe2,
  Info,
  Mail,
  Map,
  MapPinned,
  Megaphone,
  MessageCircle,
  PackageSearch,
  PenSquare,
  Sparkles,
  Swords,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 */
export function getNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  const resourcesItems: NestedMenuItem['items'] = [
    {
      title: t('resources.items.prd.title'),
      description: t('resources.items.prd.description'),
      icon: <FileText className="size-4 shrink-0" />,
      href: Routes.ProductBlueprint,
      external: false,
    },
    {
      title: t('resources.items.about.title'),
      description: t('resources.items.about.description'),
      icon: <Info className="size-4 shrink-0" />,
      href: Routes.About,
      external: false,
    },
    {
      title: t('resources.items.contact.title'),
      description: t('resources.items.contact.description'),
      icon: <Mail className="size-4 shrink-0" />,
      href: Routes.Contact,
      external: false,
    },
  ];

  if (websiteConfig.blog.enable) {
    resourcesItems.push({
      title: t('resources.items.blog.title'),
      description: t('resources.items.blog.description'),
      icon: <Sparkles className="size-4 shrink-0" />,
      href: Routes.Blog,
      external: false,
    });
  }

  if (websiteConfig.docs.enable) {
    resourcesItems.push({
      title: t('resources.items.docs.title'),
      description: t('resources.items.docs.description'),
      icon: <FileText className="size-4 shrink-0" />,
      href: Routes.Docs,
      external: false,
    });
  }

  return [
    {
      title: t('guides.title'),
      items: [
        {
          title: t('guides.items.beginner.title'),
          description: t('guides.items.beginner.description'),
          icon: <Compass className="size-4 shrink-0" />,
          href: Routes.GuidesBeginner,
          external: false,
        },
        {
          title: t('guides.items.walkthrough.title'),
          description: t('guides.items.walkthrough.description'),
          icon: <Map className="size-4 shrink-0" />,
          href: Routes.GuidesWalkthrough,
          external: false,
        },
        {
          title: t('guides.items.sideQuests.title'),
          description: t('guides.items.sideQuests.description'),
          icon: <Flag className="size-4 shrink-0" />,
          href: Routes.GuidesSideQuests,
          external: false,
        },
        {
          title: t('guides.items.boss.title'),
          description: t('guides.items.boss.description'),
          icon: <Swords className="size-4 shrink-0" />,
          href: Routes.GuidesBoss,
          external: false,
        },
        {
          title: t('guides.items.secrets.title'),
          description: t('guides.items.secrets.description'),
          icon: <Sparkles className="size-4 shrink-0" />,
          href: Routes.GuidesSecrets,
          external: false,
        },
        {
          title: t('guides.items.personality.title'),
          description: t('guides.items.personality.description'),
          icon: <Users className="size-4 shrink-0" />,
          href: Routes.GuidesPersonality,
          external: false,
        },
      ],
    },
    {
      title: t('database.title'),
      items: [
        {
          title: t('database.items.digimon.title'),
          description: t('database.items.digimon.description'),
          icon: <Database className="size-4 shrink-0" />,
          href: Routes.DatabaseDigimon,
          external: false,
        },
        {
          title: t('database.items.items.title'),
          description: t('database.items.items.description'),
          icon: <PackageSearch className="size-4 shrink-0" />,
          href: Routes.DatabaseItems,
          external: false,
        },
        {
          title: t('database.items.maps.title'),
          description: t('database.items.maps.description'),
          icon: <MapPinned className="size-4 shrink-0" />,
          href: Routes.DatabaseMaps,
          external: false,
        },
      ],
    },
    {
      title: t('tools.title'),
      items: [
        {
          title: t('tools.items.evolutionTree.title'),
          description: t('tools.items.evolutionTree.description'),
          icon: <GitBranch className="size-4 shrink-0" />,
          href: Routes.ToolsEvolutionTree,
          external: false,
        },
        {
          title: t('tools.items.skillPlanner.title'),
          description: t('tools.items.skillPlanner.description'),
          icon: <Sparkles className="size-4 shrink-0" />,
          href: Routes.ToolsSkillPlanner,
          external: false,
        },
        {
          title: t('tools.items.teamBuilder.title'),
          description: t('tools.items.teamBuilder.description'),
          icon: <Users className="size-4 shrink-0" />,
          href: Routes.ToolsTeamBuilder,
          external: false,
        },
      ],
    },
    {
      title: t('news.title'),
      items: [
        {
          title: t('news.items.updates.title'),
          description: t('news.items.updates.description'),
          icon: <Megaphone className="size-4 shrink-0" />,
          href: Routes.NewsUpdates,
          external: false,
        },
        {
          title: t('news.items.events.title'),
          description: t('news.items.events.description'),
          icon: <CalendarDays className="size-4 shrink-0" />,
          href: Routes.NewsEvents,
          external: false,
        },
      ],
    },
    {
      title: t('community.title'),
      items: [
        {
          title: t('community.items.hub.title'),
          description: t('community.items.hub.description'),
          icon: <Globe2 className="size-4 shrink-0" />,
          href: Routes.Community,
          external: false,
        },
        {
          title: t('community.items.submit.title'),
          description: t('community.items.submit.description'),
          icon: <PenSquare className="size-4 shrink-0" />,
          href: Routes.CommunitySubmit,
          external: false,
        },
        {
          title: t('community.items.discussion.title'),
          description: t('community.items.discussion.description'),
          icon: <MessageCircle className="size-4 shrink-0" />,
          href: Routes.CommunityDiscussion,
          external: false,
        },
      ],
    },
    {
      title: t('resources.title'),
      items: resourcesItems,
    },
  ];
}
