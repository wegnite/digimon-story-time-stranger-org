'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

/**
 * Get footer config with translations
 *
 * NOTICE: used in client components only
 */
export function getFooterLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.footer');

  return [
    {
      title: t('guides.title'),
      items: [
        {
          title: t('guides.items.beginner'),
          href: Routes.GuidesBeginner,
          external: false,
        },
        {
          title: t('guides.items.walkthrough'),
          href: Routes.GuidesWalkthrough,
          external: false,
        },
        {
          title: t('guides.items.boss'),
          href: Routes.GuidesBoss,
          external: false,
        },
      ],
    },
    {
      title: t('database.title'),
      items: [
        {
          title: t('database.items.digimon'),
          href: Routes.DatabaseDigimon,
          external: false,
        },
        {
          title: t('database.items.items'),
          href: Routes.DatabaseItems,
          external: false,
        },
        {
          title: t('database.items.maps'),
          href: Routes.DatabaseMaps,
          external: false,
        },
      ],
    },
    {
      title: t('tools.title'),
      items: [
        {
          title: t('tools.items.evolutionTree'),
          href: Routes.ToolsEvolutionTree,
          external: false,
        },
        {
          title: t('tools.items.skillPlanner'),
          href: Routes.ToolsSkillPlanner,
          external: false,
        },
        {
          title: t('tools.items.teamBuilder'),
          href: Routes.ToolsTeamBuilder,
          external: false,
        },
      ],
    },
    {
      title: t('community.title'),
      items: [
        {
          title: t('community.items.hub'),
          href: Routes.Community,
          external: false,
        },
        {
          title: t('community.items.submit'),
          href: Routes.CommunitySubmit,
          external: false,
        },
        {
          title: t('community.items.updates'),
          href: Routes.NewsUpdates,
          external: false,
        },
        {
          title: t('community.items.blueprint'),
          href: Routes.ProductBlueprint,
          external: false,
        },
        {
          title: t('community.items.contact'),
          href: Routes.Contact,
          external: false,
        },
      ],
    },
    {
      title: t('legal.title'),
      items: [
        {
          title: t('legal.items.cookiePolicy'),
          href: Routes.CookiePolicy,
          external: false,
        },
        {
          title: t('legal.items.privacyPolicy'),
          href: Routes.PrivacyPolicy,
          external: false,
        },
        {
          title: t('legal.items.termsOfService'),
          href: Routes.TermsOfService,
          external: false,
        },
      ],
    },
  ];
}
