import Image from 'next/image';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-purple-500/10">
      <div className="space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center lg:text-left">What the platform offers</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          

          <Link href="/events" className="group flex flex-col justify-between sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/40 hover:bg-[#181836] transition-all duration-300">
            <div className="space-y-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">Events</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">Discover all upcoming events and find the one that fits you.</p>
            </div>
            <div className="relative w-full sm:w-[200px] h-[150px] rounded-xl overflow-hidden flex-shrink-0">
              <Image 
                src="/Hero.png"
                alt="Events" 
                fill 
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>


          <Link href="/planning" className="group flex flex-col justify-between sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/40 hover:bg-[#181836] transition-all duration-300">
            <div className="space-y-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">Schedule</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">View the global program and detailed schedules by room and day.</p>
            </div>
            <div className="relative w-full sm:w-[200px] h-[150px] rounded-xl overflow-hidden flex-shrink-0">
              <Image 
                src="/event.png"
                alt="Schedule" 
                fill 
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>


          <Link href="/speakers" className="group flex flex-col justify-between sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/40 hover:bg-[#181836] transition-all duration-300">
            <div className="space-y-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">Speakers</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">Access speaker profiles and find their sessions in one click.</p>
            </div>
            <div className="relative w-full sm:w-[200px] h-[150px] rounded-xl overflow-hidden flex-shrink-0">
              <Image 
                src="/intervenant.png"
                alt="Speakers" 
                fill 
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}