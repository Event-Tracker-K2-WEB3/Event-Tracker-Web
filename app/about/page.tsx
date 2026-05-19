import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-[#0d0d1a] text-white font-sans antialiased selection:bg-purple-500/30 overflow-x-hidden">
        <HeroSection />

        <MissionSection />

        <FeaturesSection />

        <StatsSection />
      </div>
  );
}