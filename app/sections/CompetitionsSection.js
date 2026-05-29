'use client'

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

export default function CompetitionsSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(document.getElementById('competitions'));
    return () => observer.disconnect();
  }, []);

  const competitions = [
    {
      name: "National Olympiad in Informatics (NOI)",
      description: "An annual algorithmic programming contest to select the national team for the International Olympiad in Informatics (IOI). Participants tackle complex computational problems requiring algorithmic thinking and coding skills.",
      timeline: "February to June 2026",
      eligibility: "Open to all Sri Lankan school students",
      logo: "/images/noi.png",
      website: "https://www.noi.lk/" // Official NOI website
    },
    {
      name: "Sri Lanka Artificial Intelligence Olympiad (SLAIO)",
      description: "An annual IoT-based Artificial Intelligence contest to select the national team for the International Olympiad in Informatics (IAIO). Participants solve complex problems related to Artificial Intelligence within the given time limit.",
      timeline: "May to July 2026",
      eligibility: "Open to all Sri Lankan school students",
      logo: "/images/noi.png", // TODO: Replace with SLAIO logo when available
      website: "https://www.slaio.org/"
    },
    {
      name: "IEEEXtreme 20.0",
      description: "A global 24-hour hackathon where university teams compete in algorithm-based programming challenges. Develop skills in rapid problem-solving and collaborative coding under time pressure.",
      timeline: "July to November 2026",
      eligibility: "IEEE undergraduate and graduate members",
      logo: "/images/ieeextreme.png",
      website: "https://xtreme.ieee.lk/" // Official IEEEXtreme website
    },
    {
      name: "International Collegiate Programming Contest (ICPC)",
      description: "The world's largest algorithmic competition for university students. Teams of three compete to solve complex real-world problems with elegant solutions under strict time constraints.",
      timeline: "July to November 2026",
      eligibility: "University students under 24 years of age",
      logo: "/images/icpc.png",
      website: "https://icpc.global/" // Official ICPC website
    }
    // TODO: Update the OC (Organizing Committee) once the information is available (Change #5)
  ];

  return (
    <section id="competitions" className="py-24 blue-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">HOSTING</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 blue-glow-text">Hosting Competitions</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Major competitive programming events we facilitate and support
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {competitions.map((competition, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${300 + index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <ParallaxEffect speed={0.05} direction="scale" className="h-full">
                <GlassCard 
                  className="p-6 sm:p-8 h-full flex flex-col card-3d"
                  hoverEffect="3d"
                  glowIntensity="medium"
                >
                  {/* Competition Logo */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={competition.logo}
                      alt={`${competition.name} logo`}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-center text-blue-300 leading-tight">{competition.name}</h3>
                  <p className="text-gray-300 mb-6 text-base leading-relaxed flex-grow">{competition.description}</p>
                  
                  {/* Competition details */}
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center text-blue-400 mb-3">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{competition.timeline}</span>
                    </div>
                    
                    {/* Eligibility tag */}
                    <div className="bg-blue-600 bg-opacity-20 text-blue-300 px-4 py-2 rounded-full border border-blue-500 border-opacity-30 text-sm text-center">
                      {competition.eligibility}
                    </div>
                    
                    <div className="pt-4 border-t border-blue-900 border-opacity-70 mt-4">
                      <a 
                        href={competition.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 bg-blue-900 bg-opacity-50 hover:bg-opacity-70 text-blue-300 rounded-md transition-all hover:text-white"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </ParallaxEffect>
            </div>
          ))}
        </div>
        
        {/* Updated call to action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400">
            Have questions about our competitions? <a href="#faq" className="text-blue-400 hover:text-blue-300 transition-colors" onClick={(e) => {
              e.preventDefault();
              document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
            }}>Check our FAQ</a>
          </p>
        </div>
      </div>
    </section>
  );
}