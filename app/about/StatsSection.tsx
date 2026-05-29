'use client';

import { useEffect, useState } from 'react';

export default function StatsSection() {

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);


  useEffect(() => {
    fetch('http://localhost:8080/about/stats')
        .then((reponse) => reponse.json())
        .then((data) => {
          // 3. Store the real numbers received from the backend
          setTotalEvents(data.totalEvents);
          setTotalSpeakers(data.totalSpeakers);
          setTotalSessions(data.totalSessions);
        })
        .catch((error) => console.error("Connection error:", error));
  }, []);

  return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#13132b] to-[#0f0f24] border border-purple-500/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-purple-500/10">


            <div className="flex flex-col items-center justify-center text-center pb-6 md:pb-0">
            <span className="text-4xl sm:text-5xl font-black text-white mb-1">
              {totalEvents}+
            </span>
              <span className="text-gray-400 text-xs tracking-wider uppercase">Events</span>
            </div>


            <div className="flex flex-col items-center justify-center text-center py-6 md:py-0">
            <span className="text-4xl sm:text-5xl font-black text-white mb-1">
              {totalSpeakers}+
            </span>
              <span className="text-gray-400 text-xs tracking-wider uppercase">Speakers</span>
            </div>


            <div className="flex flex-col items-center justify-center text-center pt-6 md:pt-0">
            <span className="text-4xl sm:text-5xl font-black text-white mb-1">
              {totalSessions}+
            </span>
              <span className="text-gray-400 text-xs tracking-wider uppercase">Sessions</span>
            </div>

          </div>
        </div>
      </section>
  );
}