import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import { ContentDiscoverySection } from './content-navigator';
import { DigimonHero } from './hero';
import { SpotlightFeaturesSection } from './spotlight-features';
import { UpdatesAndLocalization } from './updates-localization';
import { VideoShowcaseSection } from './video-showcase';

export function DigimonHomepage() {
  return (
    <div className="min-h-screen bg-[#020314] text-white">
      <DigimonHero />
      <VideoShowcaseSection />
      <ContentDiscoverySection />
      <SpotlightFeaturesSection />
      <UpdatesAndLocalization />
      <section className="container mx-auto px-4 py-16">
        <NewsletterCard />
      </section>
    </div>
  );
}
