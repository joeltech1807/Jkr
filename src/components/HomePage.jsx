import Hero from './Hero';
import IntroSection from './IntroSection';
import Marquee from './Marquee';
import ExpertiseSection from './ExpertiseSection';
import CampaignsSection from './CampaignsSection';
import VisionSection from './VisionSection';
import CultureSection from './CultureSection';
import ReviewStrip from './ReviewStrip';
import ContactSection from './ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ExpertiseSection />
      <CampaignsSection />
      <Marquee />
      <VisionSection />
      <CultureSection />
      <ReviewStrip />
      <ContactSection />
    </>
  );
}

