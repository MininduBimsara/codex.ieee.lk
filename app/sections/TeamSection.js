'use client'

import { useState, useEffect } from 'react';
import { User, Users } from 'lucide-react';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  
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
    
    const teamElement = document.getElementById('team');
    if (teamElement) {
      observer.observe(teamElement);
    }
    return () => observer.disconnect();
  }, []);

  // Handle image load errors
  const handleImageError = (memberName) => {
    setImageErrors(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  // Team data with images and LinkedIn - arranged in specific order
  const team = [
    {
      name: "Prof. Sidath Liyanage",
      position: "Chair, Educational Activities Committee, IEEE Sri Lanka Section",
      image: "/images/team/sidath.png?v=2",
      social: {
        linkedin: null
      },
      bio: "Leading educational initiatives and community building efforts across IEEE Sri Lanka."
    },
    {
      name: "Dineth Palliyaguru",
      position: "Project Chair",
      image: "/images/team/DinethPalliyaguru.jpg",
      social: {
        linkedin: "https://linkedin.com/in/dineth-palliyaguru"
      },
      bio: "Leading IEEE CodeX initiatives to build a thriving tech community in Sri Lanka."
    },
    {
      name: "Sasanka Wakista",
      position: "Secretary",
      image: "/images/team/Sasanka Wakista.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/sasanka-wakista-4bb248206"
      },
      bio: "Coordinating all administrative aspects and ensuring smooth operations of our initiatives."
    },
    {
      name: "Thamalu D Bambaravanage",
      position: "Vice Chair - Public Visibility",
      image: "/images/team/Thamalu Bambaravanage.jpg",
      social: {
        linkedin: null
      },
      bio: "Managing our public presence and outreach strategies to promote competitive programming."
    },
    {
      name: "Kulakshi Thathsarani",
      position: "Vice Chair - Finance",
      image: "/images/team/Kulakshi Thathsarani.jpg",
      social: {
        linkedin: null
      },
      bio: "Managing financial resources and developing strategic partnerships with industry leaders."
    },
    {
      name: "Likitha Chathubhashini",
      position: "Vice Chair - Program",
      image: "/images/team/Likitha Chathubhashini.jpeg",
      social: {
        linkedin: null
      },
      bio: "Overseeing all programming events and competitions for maximum participant value."
    },
  ];

  // Coordinators with their corresponding images and LinkedIn
  const coordinators = [
    { name: "Yasath Amasara", image: "/images/team/Yasath Amasara.jpg", linkedin: null },
    { name: "Sanindu Thalwatte", image: "/images/team/Sanindu Thalwatte.jpg", linkedin: null },
    { name: "Chavini Wijerathna", image: "/images/team/Chavini Wijerathna.jpeg", linkedin: null },
    { name: "Nimesha Kavindu", image: "/images/team/Nimesha Kavindu.jpg", linkedin: null },
    { name: "Kusal Nirukshan", image: "/images/team/Kusal Nirukshan.jpg", linkedin: null },
    { name: "Sethini Thennakoon", image: "/images/team/Sethini Thennakoon.jpg", linkedin: null },
    { name: "Minindu Abeywardena", image: "/images/team/Minindu Abeywardena.jpeg", linkedin: null },
    { name: "Chamoth Sandeepa", image: "/images/team/Chamoth Sandeepa.jpeg", linkedin: null },
    { name: "Janidu Janadara", image: "/images/team/Janidu Janadara.png", linkedin: null },
    { name: "Madhawa Aloka", image: "/images/team/Madhawa Aloka.jpg", linkedin: "https://www.linkedin.com/in/madhawa-aloka-707940271/" }
  ];

  // Function to get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('');
  };

  // Function to generate random gradient colors for avatars
  const getGradient = (index) => {
    const gradients = [
      "from-blue-600 to-purple-600",
      "from-green-500 to-blue-600",
      "from-blue-600 to-cyan-500",
      "from-indigo-600 to-blue-500",
      "from-blue-500 to-teal-400",
      "from-purple-600 to-pink-600",
      "from-orange-500 to-red-500",
      "from-teal-500 to-green-500"
    ];
    
    return gradients[index % gradients.length];
  };

  // Component for member avatar with fallback and improved image positioning
  const MemberAvatar = ({ member, index, size = "large" }) => {
    const sizeClasses = {
      large: "w-32 h-32",
      medium: "w-20 h-20",
      small: "w-16 h-16"
    };

    const textSizeClasses = {
      large: "text-2xl",
      medium: "text-lg",
      small: "text-sm"
    };

    if (imageErrors[member.name] || !member.image) {
      // Fallback to gradient avatar with initials
      return (
        <div className={`${sizeClasses[size]} bg-gradient-to-br ${getGradient(index)} rounded-full flex items-center justify-center mx-auto ${size === 'large' ? 'mb-6 blue-glow-subtle' : 'mb-3'} transition-all duration-300 hover:scale-105`}>
          <span className={`text-white font-bold ${textSizeClasses[size]}`}>
            {getInitials(member.name)}
          </span>
        </div>
      );
    }

    const isSidath = member.name === "Prof. Sidath Liyanage";

    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden mx-auto ${size === 'large' ? 'mb-6 blue-glow-subtle' : 'mb-3'} ${isSidath ? 'bg-transparent' : `bg-gradient-to-br ${getGradient(index)}`} transition-all duration-300 hover:scale-105 shadow-lg`}>
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ objectPosition: isSidath ? 'center' : 'center 30%' }}
          onError={() => handleImageError(member.name)}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <section id="team" className="py-24 blue-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern absolute inset-0"></div>
      </div>
      
      {/* Decorative silhouettes */}
      <div className="absolute top-40 left-10 text-blue-600 opacity-5">
        <User className="w-32 h-32" />
      </div>
      <div className="absolute bottom-40 right-10 text-blue-600 opacity-5">
        <Users className="w-32 h-32" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">TEAM</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 blue-glow-text">Our Team</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Meet the dedicated individuals behind IEEE CodeX Sri Lanka
          </p>
        </div>

        {/* Executive Team - Custom layout matching the image */}
        <div className="flex flex-col items-center space-y-8">
          {/* Top Row - 2 main leaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-2xl">
            {team.slice(0, 2).map((member, index) => (
              <div 
                key={index}
                className="transition-all duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${200 + index * 150}ms`
                }}
              >
                <ParallaxEffect speed={0.03} direction="vertical">
                  <GlassCard 
                    className="rounded-xl overflow-hidden card-3d hover:shadow-2xl hover:shadow-blue-500/20"
                    hoverEffect="3d"
                    glowIntensity="medium"
                  >
                    <div className="p-6 sm:p-8 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
                      <MemberAvatar member={member} index={index} size="large" />
                      <h3 className="text-xl font-bold text-center mb-2 text-white">{member.name}</h3>
                      <p className="text-blue-300 text-center text-sm mb-0">{member.position}</p>
                      {/* LinkedIn buttons - commented out until URLs are collected
                      <div className="flex justify-center mt-4">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 border border-blue-400/20"
                            aria-label={`${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          </a>
                        )}
                      </div>
                      */}
                    </div>
                  </GlassCard>
                </ParallaxEffect>
              </div>
            ))}
          </div>

          {/* Bottom Row - 4 vice chairs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-5xl">
            {team.slice(2).map((member, index) => (
              <div 
                key={index + 2}
                className="transition-all duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${400 + index * 150}ms`
                }}
              >
                <ParallaxEffect speed={0.03} direction="vertical">
                  <GlassCard 
                    className="rounded-xl overflow-hidden card-3d hover:shadow-2xl hover:shadow-blue-500/20"
                    hoverEffect="3d"
                    glowIntensity="medium"
                  >
                    <div className="p-6 sm:p-8 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
                      <MemberAvatar member={member} index={index + 2} size="large" />
                      <h3 className="text-xl font-bold text-center mb-2 text-white">{member.name}</h3>
                      <p className="text-blue-300 text-center text-sm mb-0">{member.position}</p>
                      {/* LinkedIn buttons - commented out until URLs are collected
                      <div className="flex justify-center mt-4">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 border border-blue-400/20"
                            aria-label={`${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                          </a>
                        )}
                      </div>
                      */}
                    </div>
                  </GlassCard>
                </ParallaxEffect>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinators Section - Enhanced */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <GlassCard className="p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-10 text-blue-300">Our Coordinators</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {coordinators.map((coordinator, index) => (
                <ParallaxEffect key={index} speed={0.02} direction="scale">
                  <GlassCard 
                    className="px-4 py-4 rounded-lg text-center h-full flex flex-col items-center justify-center card-3d group hover:shadow-xl hover:shadow-blue-500/10"
                    hoverEffect="scale"
                    glowIntensity="subtle"
                  >
                    {/* Enhanced coordinator avatar */}
                    <MemberAvatar member={coordinator} index={index + team.length} size="medium" />
                    
                    <span className="text-gray-300 text-sm font-medium mb-0 group-hover:text-white transition-colors duration-200">
                      {coordinator.name}
                    </span>
                    
                    {/* LinkedIn button - commented out until URLs are collected
                    <div className="flex justify-center">
                      {coordinator.linkedin ? (
                        <a
                          href={coordinator.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full text-white text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
                          aria-label={`${coordinator.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="h-3.5 w-3.5 shrink-0" />
                          <span>LinkedIn</span>
                        </a>
                      ) : null}
                    </div>
                    */}
                  </GlassCard>
                </ParallaxEffect>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}