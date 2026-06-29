export default function HomeAnimations() {
  return (
    <style>
      {`
        @keyframes homeCardPop {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes floatingCard {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes softGlow {
          0%, 100% {
            box-shadow: 0 0 28px rgba(124, 58, 237, 0.16);
          }
          50% {
            box-shadow: 0 0 55px rgba(168, 85, 247, 0.28);
          }
        }

        @keyframes sessionCardChange {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .home-reveal {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(8px);
          transition:
            opacity 800ms ease,
            transform 800ms ease,
            filter 800ms ease;
        }

        .home-page-ready .home-reveal {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .home-image-reveal {
          opacity: 0;
          transform: scale(1.05);
          filter: blur(10px);
          transition:
            opacity 1000ms ease,
            transform 1200ms ease,
            filter 1000ms ease;
        }

        .home-page-ready .home-image-reveal {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }

        .home-delay-100 { transition-delay: 100ms; }
        .home-delay-200 { transition-delay: 200ms; }
        .home-delay-300 { transition-delay: 300ms; }
        .home-delay-400 { transition-delay: 400ms; }
        .home-delay-500 { transition-delay: 500ms; }
        .home-delay-600 { transition-delay: 600ms; }
        .home-delay-700 { transition-delay: 700ms; }

        .home-card-pop {
          animation: homeCardPop 650ms ease-out both;
        }

        .home-floating-card {
          animation: floatingCard 5s ease-in-out infinite;
        }

        .home-glow-card {
          animation: softGlow 4s ease-in-out infinite;
        }

        .session-card-change {
          animation: sessionCardChange 650ms ease-out both;
        }
      `}
    </style>
  );
}
