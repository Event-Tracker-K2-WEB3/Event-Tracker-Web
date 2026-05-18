import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13132b] border border-purple-500/30 text-purple-400 text-sm font-medium tracking-wide w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063 1.06l-.041.02a.75.75 0 01-1.062-1.06zM12 21a9 9 0 110-18 9 9 0 010 18zm0 0v-4.5" />
                    </svg>
                    À PROPOS
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    À propos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400">EventSync</span>
                </h1>

                {/* Description */}
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
                    EventSync est la plateforme qui vous permet de vivre chaque événement plus simplement.
                    Suivez les sessions en direct, découvrez le programme, interagissez avec les intervenants
                    et organisez votre expérience.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                        href="/events"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] hover:from-[#6d28d9] hover:to-[#7c3aed] text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        Découvrir les événements
                    </Link>
                    <Link
                        href="/planning"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 hover:border-white/60 hover:bg-white/5 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                        Voir le planning
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden group shadow-2xl shadow-purple-950/20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a] via-[#0d0d1a]/40 to-transparent z-10 pointer-events-none hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent z-10 pointer-events-none lg:hidden" />
                <Image
                    src="/Hero.png"
                    alt="EventSync Hero Illustration"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
            </div>
        </section>
    );
}