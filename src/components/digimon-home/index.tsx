import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import { DatabaseShowcase } from './database-showcase';
import { DigimonHero } from './hero';
import { StrategyPillars } from './pillars';
import { PlanningTools } from './tools';
import { UpdatesAndLocalization } from './updates-localization';

export function DigimonHomepage() {
  return (
    <div className="min-h-screen bg-[#020314] text-white">
      <DigimonHero />
      <StrategyPillars />
      <DatabaseShowcase />
      <PlanningTools />
      <UpdatesAndLocalization />
      <section className="container mx-auto px-4 py-16">
        <NewsletterCard />
      </section>
    </div>
  );
}

export { DigimonHero, StrategyPillars, DatabaseShowcase, PlanningTools };
