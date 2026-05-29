'use client'

import { useState, useEffect } from 'react';
import GlassCard from '@/app/components/GlassCard';
import { ExternalLink, ArrowRight, BookOpen, Trophy } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
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
    
    observer.observe(document.getElementById('about'));
    return () => observer.disconnect();
  }, []);
  
  return (
    <section
      id="about"
      className="py-24 blue-gradient relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div
          className={`max-w-6xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">
            ABOUT US
          </span>

          {/* Updated Header with CodeX Text Logo */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold blue-glow-text">
              About
            </h2>
            <div className="flex items-center gap-3">
              <Image
                src="/images/codex-text.png"
                alt="CodeX Sri Lanka"
                width={180}
                height={50}
                className="drop-shadow-lg blue-glow-text"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
                }}
              />
              <h2 className="text-3xl md:text-4xl font-bold blue-glow-text">
                Sri Lanka
              </h2>
            </div>
          </div>

          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
        </div>

        {/* What is CodeX Section */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassCard
            className="rounded-2xl p-8 md:p-10 max-w-4xl mx-auto"
            glowIntensity="medium"
            blurStrength="medium"
            hoverEffect="subtle"
            interactive={true}
          >
            <h3 className="text-2xl font-bold text-blue-300 mb-6 text-center">
              What is IEEE CodeX Sri Lanka?
            </h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p className="text-lg">
                IEEE CodeX Sri Lanka is the latest initiative by the IEEE Sri
                Lanka Section aimed at promoting competitive programming in Sri
                Lanka through various coding contests and training sessions.
              </p>
              <p>
                We are actively engaged in facilitating three major competitive
                programming events: the{" "}
                <strong className="text-blue-400">National Olympiad in Informatics (NOI) 2026</strong>,{" "}
                <strong className="text-blue-400">
                  Sri Lanka Artificial Intelligence Olympiad (SLAIO) 2026
                </strong>
                , <strong className="text-blue-400">IEEEXtreme 20.0</strong>, and the{" "}
                <strong className="text-blue-400">
                  International Collegiate Programming Contest (ICPC) 2026
                </strong>
                . These competitions provide platforms for aspiring programmers
                to showcase their skills, learn from experts, and foster a
                strong programming culture within the country.{" "}
              </p>
              <p>
                In addition to hosting competitions, we offer a comprehensive{" "}
                <strong className="text-blue-400">
                  12-session training series
                </strong>{" "}
                designed for both school students and undergraduates. These
                sessions cover everything from basic competitive programming
                concepts to advanced algorithms like dynamic programming and
                graph theory, ensuring participants are well-prepared for
                national and international competitions.
              </p>
              <p>
                We also provide a specialized{" "}
                <strong className="text-blue-400">
                  Competency Building series
                </strong>{" "}
                focused on developing essential soft skills including time
                management, team management, and strategic planning. These
                skills complement technical abilities and are crucial for
                success in competitive programming environments and professional
                career advancement.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Two Main Sections */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl w-full mx-auto">
          {/* Session Series Section */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <GlassCard
              className="rounded-2xl p-6 md:p-8 h-full"
              glowIntensity="medium"
              blurStrength="medium"
              hoverEffect="subtle"
              interactive={true}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-900 bg-opacity-70 flex items-center justify-center mr-4 blue-glow-subtle">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">
                  Session Series
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Our comprehensive training program includes a 12-session
                technical series building strong foundations in competitive
                programming, plus a specialized competency building series.
                Expert speakers guide participants through essential algorithmic
                concepts, problem-solving techniques, and crucial soft skills
                for career success.
              </p>

              <div className="bg-darkBlue-800 bg-opacity-50 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3 text-sm">
                  Key Features:
                </h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• 12 comprehensive technical training sessions</li>
                  <li>
                    • Multiple competency building sessions (details coming
                    soon)
                  </li>
                  <li>• Expert speakers and industry professionals</li>
                  <li>• From basics to advanced algorithms</li>
                  <li>• Interactive problem-solving workshops</li>
                  <li>
                    • Soft skills development (time, team & strategic
                    management)
                  </li>
                  <li>• All skill levels welcome</li>
                </ul>
              </div>

              <div className="text-center">
                <a
                  href="#sessions"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("sessions")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Explore all sessions</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Competitions Section */}
          <div
            className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <GlassCard
              className="rounded-2xl p-6 md:p-8 h-full"
              glowIntensity="medium"
              blurStrength="medium"
              hoverEffect="subtle"
              interactive={true}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-900 bg-opacity-70 flex items-center justify-center mr-4 blue-glow-subtle">
                  <Trophy className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-300">
                  Hosting Competitions
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                We facilitate and support major competitive programming events
                that provide platforms for aspiring programmers to showcase
                their skills and represent Sri Lanka on international stages.
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-darkBlue-800 bg-opacity-50 p-4 rounded-lg border border-blue-900 border-opacity-30">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center mr-3 text-blue-400 text-xs font-bold">
                      1
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      National Olympiad in Informatics (NOI)
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    For secondary school students to compete at national and
                    international levels.
                  </p>
                </div>

                <div className="bg-darkBlue-800 bg-opacity-50 p-4 rounded-lg border border-blue-900 border-opacity-30">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center mr-3 text-blue-400 text-xs font-bold">
                      2
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      Sri Lanka Artificial Intelligence Olympiad (SLAIO)
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    For secondary school students to compete at national and
                    international levels.
                  </p>
                </div>

                <div className="bg-darkBlue-800 bg-opacity-50 p-4 rounded-lg border border-blue-900 border-opacity-30">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center mr-3 text-blue-400 text-xs font-bold">
                      3
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      IEEEXtreme 19.0
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    24-hour global programming competition for IEEE student
                    members.
                  </p>
                </div>

                <div className="bg-darkBlue-800 bg-opacity-50 p-4 rounded-lg border border-blue-900 border-opacity-30">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 bg-opacity-30 flex items-center justify-center mr-3 text-blue-400 text-xs font-bold">
                      4
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      International Collegiate Programming Contest (ICPC)
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Team-based programming contest for university students.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#competitions"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("competitions")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>Learn more about competitions</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Bottom Summary */}
        <div
          className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassCard
            className="rounded-2xl p-6 md:p-8 text-center"
            glowIntensity="medium"
            blurStrength="medium"
            hoverEffect="subtle"
            interactive={true}
          >
            <h3 className="text-xl font-bold text-blue-300 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Our goal is to equip all aspiring coders with the confidence and
              skills necessary to excel in competitive programming and
              effectively represent Sri Lanka on the global stage. Through our
              comprehensive training sessions and world-class competitions, we
              are building the next generation of Sri Lanka's vibrant tech
              community.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-blue-900 bg-opacity-30 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-blue-400">12+</div>
                <div className="text-xs text-gray-400">Training Sessions</div>
              </div>
              <div className="bg-blue-900 bg-opacity-30 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-blue-400">4</div>
                <div className="text-xs text-gray-400">Major Competitions</div>
              </div>
              <div className="bg-blue-900 bg-opacity-30 rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-blue-400">500+</div>
                <div className="text-xs text-gray-400">
                  Expected Participants
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}