import HeroSection from './HeroSection';
import MissionSection from './MissionSection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';
import FooterSection from "./FooterSection";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0d0d1a] text-white font-sans antialiased selection:bg-purple-500/30 overflow-x-hidden">

            <style>
                {`
            @keyframes pageFadeUp {
              from {
                opacity: 0;
                transform: translateY(28px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .page-section-animation {
              opacity: 0;
              animation: pageFadeUp 0.8s ease-out forwards;
            }

            .delay-hero {
              animation-delay: 0.1s;
            }

            .delay-mission {
              animation-delay: 0.25s;
            }

            .delay-features {
              animation-delay: 0.4s;
            }

            .delay-stats {
              animation-delay: 0.55s;
            }

            .delay-footer {
              animation-delay: 0.7s;
            }
          `}
            </style>

            <div className="page-section-animation delay-hero">
                <HeroSection />
            </div>

            <div className="page-section-animation delay-mission">
                <MissionSection />
            </div>

            <div className="page-section-animation delay-features">
                <FeaturesSection />
            </div>

            <div className="page-section-animation delay-stats">
                <StatsSection />
            </div>

            <div className="page-section-animation delay-footer">
                <FooterSection />
            </div>
        </div>
    );
}