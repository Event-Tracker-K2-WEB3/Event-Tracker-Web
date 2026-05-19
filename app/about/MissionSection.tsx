export default function MissionSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-purple-500/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">


                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Notre mission</h2>
                    <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-light">
                        Nous simplifions la navigation dans vos événements et plaçons l'expérience participant au cœur de tout.
                        Notre mission est de connecter les personnes, les contenus et les moments qui comptent.
                    </p>
                </div>


                <div className="lg:col-span-7 space-y-4">

                    <div className="flex gap-5 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Suivi en temps réel</h3>
                            <p className="text-gray-400 font-light text-sm sm:text-base">Accédez aux sessions en direct et ne manquez rien de l'action.</p>
                        </div>
                    </div>


                    <div className="flex gap-5 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Interaction live</h3>
                            <p className="text-gray-400 font-light text-sm sm:text-base">Posez vos questions, réagissez et échangez avec les intervenants.</p>
                        </div>
                    </div>


                    <div className="flex gap-5 p-6 rounded-2xl bg-[#13132b] border border-white/5 hover:border-purple-500/20 transition-all duration-300">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Organisation facile</h3>
                            <p className="text-gray-400 font-light text-sm sm:text-base">Ajoutez vos favoris, créez votre parcours et gérez votre agenda.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}