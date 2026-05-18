export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#13132b] to-[#0f0f24] border border-purple-500/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-purple-500/10">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center text-center pb-6 md:pb-0">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1">25+</span>
            <span className="text-gray-400 font-medium uppercase text-xs tracking-wider">Événements</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center text-center pt-6 md:pt-0 pb-6 md:pb-0">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1">120+</span>
            <span className="text-gray-400 font-medium uppercase text-xs tracking-wider">Intervenants</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center text-center pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.439.817-.439.99 0l3.01 6.113 6.715.975a.511.511 0 01.283.872l-4.858 4.732 1.147 6.693c.04.23-.201.416-.407.305L12 20.013l-6.002 3.155c-.206.111-.447-.075-.407-.305l1.147-6.693L1.82 12.33a.511.511 0 01.283-.872l6.716-.975 3.01-6.113z" />
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1">300+</span>
            <span className="text-gray-400 font-medium uppercase text-xs tracking-wider">Sessions</span>
          </div>

        </div>
      </div>
    </section>
  );
}