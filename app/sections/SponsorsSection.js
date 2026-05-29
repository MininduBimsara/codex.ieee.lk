'use client'

import { useState, useEffect } from 'react';
import { ExternalLink, Mail, Download, Star, Award, Users, Target, ArrowRight } from 'lucide-react';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

export default function SponsorsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSponsor, setHoveredSponsor] = useState(null);
  const [particles, setParticles] = useState([]);
  
  // Intersection Observer to trigger animations when section comes into view
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
    
    const section = document.getElementById('sponsors');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  // Generate random particles on client side to prevent hydration errors
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      width: `${3 + Math.random() * 8}px`,
      height: `${3 + Math.random() * 8}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.1 + Math.random() * 0.2,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
    setParticles(newParticles);
  }, []);

  // Sponsor data
  const sponsors = {
    gold: [
      {
        name: "IFS",
        logo: "/images/ifs-logo.png", // You'll need to add this image
        tier: "Gold Sponsor",
        description: "Leading global enterprise software company",
        website: "https://www.ifs.com"
      }
    ]
  };

  // Benefits for potential sponsors
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Access to Top Talent",
      description: "Connect with emerging young coders and top university students"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Brand Visibility",
      description: "Showcase your brand to a vibrant coding community"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Innovation Partnership",
      description: "Be part of the future of software engineering and digital innovation"
    }
  ];

  return (
    <section id="sponsors" className="py-24 bg-gradient-to-r from-darkBlue-900 via-blue-900 to-darkBlue-800 text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div 
            key={index}
            className="absolute rounded-full animate-pulse"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
              backgroundColor: '#3b82f6',
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          ></div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-blue-600 opacity-10 transform -rotate-12 animate-pulse-slow">
        <Star className="w-24 h-24" />
      </div>
      <div className="absolute bottom-20 right-10 text-blue-600 opacity-10 transform rotate-12 animate-pulse-slow animation-delay-1000">
        <Award className="w-20 h-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">PARTNERS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 blue-glow-text">
            Our Sponsors
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our sponsors fuel every line of code written, every challenge solved, and every breakthrough achieved at CodeX. 
            By supporting us, they are investing directly in the future of software engineering, problem-solving, and digital innovation.
          </p>
        </div>

        {/* Gold Sponsors */}
        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-blue-300 flex items-center justify-center">
              <Award className="w-6 h-6 mr-2" />
              GOLD SPONSOR
            </h3>
            <div className="w-12 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ParallaxEffect speed={0.02}>
              <GlassCard 
                className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-900/30 to-darkBlue-800/40 border-2 border-blue-400/30"
                glowIntensity="strong"
                hoverEffect="lift"
              >
                <div className="text-center">
                  {sponsors.gold.map((sponsor, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredSponsor(sponsor.name)}
                      onMouseLeave={() => setHoveredSponsor(null)}
                    >
                      {/* IFS Logo */}
                      <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-105 border-4 border-blue-200 p-4">
                        <img 
                          src="/images/ifs-logo.png" 
                          alt="IFS Logo" 
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-center hidden">
                          <div className="text-5xl font-bold text-gray-800 mb-1 tracking-wide">IFS</div>
                          <div className="text-xs text-gray-600 font-medium">Enterprise Software</div>
                        </div>
                      </div>
                      
                      <h4 className="text-3xl font-bold mb-2 text-blue-300 group-hover:text-blue-200 transition-colors">
                        {sponsor.name}
                      </h4>
                      
                      <p className="text-gray-300 mb-4 text-lg">
                        {sponsor.description}
                      </p>
                      
                      <div className="flex justify-center">
                        <a 
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group-hover:underline"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ParallaxEffect>
          </div>
        </div>

        {/* Partnership Call-to-Action */}
        <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ParallaxEffect speed={0.03}>
            <GlassCard 
              className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-900/40 to-darkBlue-800/50 border border-blue-500/30"
              glowIntensity="medium"
              hoverEffect="glow"
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-300">
                  Are you ready to make a difference?
                </h3>
                <h4 className="text-xl md:text-2xl font-semibold mb-6 text-white">
                  Partner with CodeX!
                </h4>
                <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                  By sponsoring CodeX, you gain direct access to emerging young coders, top university talent, and a vibrant coding community.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 rounded-xl bg-darkBlue-800/50 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="text-blue-400 mb-4 flex justify-center">
                      {benefit.icon}
                    </div>
                    <h5 className="text-white font-semibold mb-2">{benefit.title}</h5>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:thamindusri@ieee.org"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group"
                >
                  <Mail className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                  Want to collaborate? Reach out!
                </a>
                
                <a 
                  href="http://bit.ly/3ZSMZgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group"
                >
                  <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                  Download Sponsorship Prospectus
                </a>
              </div>

              {/* Contact Information */}
              <div className="mt-8 pt-8 border-t border-blue-500/20 text-center">
                <p className="text-gray-300 text-sm">
                  For custom partnership opportunities and sponsorship packages, 
                  <a 
                    href="mailto:thamindusri@ieee.org" 
                    className="text-blue-400 hover:text-blue-300 transition-colors ml-1 underline"
                  >
                    contact us directly
                  </a>
                </p>
              </div>
            </GlassCard>
          </ParallaxEffect>
        </div>

        {/* Future Sponsors Placeholder */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-8 rounded-xl bg-darkBlue-800/30 border border-blue-500/20">
              <h4 className="text-xl font-semibold mb-4 text-blue-300">Join Our Growing Community</h4>
              <p className="text-gray-300 mb-6">
                Your logo could be here! Be part of the next generation of tech innovators.
              </p>
              <div className="flex justify-center">
                <a 
                  href="mailto:thamindusri@ieee.org"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  Become a Sponsor
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}