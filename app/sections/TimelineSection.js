'use client'

import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Calendar as CalendarIcon, Award, Code, Trophy, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

// TODO: Update the timeline when the data is available (Change #10 from Website Altercations PDF)
export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const timelineRef = useRef(null);
  
  // Calculate current date for timeline indicator
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
    
    const section = document.getElementById('timeline');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  // Toggle event expanded state
  const toggleEventExpanded = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  // Toggle maximize/minimize
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    setExpandedEvent(null); // Reset expanded state when toggling
  };

  // Minimized events (5 condensed key milestones)
  const minimizedEvents = [
    { 
      date: "Feb-May 2025", 
      title: "NOI 2025 Complete Cycle", 
      description: "Full NOI cycle: Registration → Qualifiers → National Finals → IOI Team Selection", 
      status: "past",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "Complete National Olympiad in Informatics cycle including registration (February), two qualifier rounds (March-April), and national finals (May) to select the 4-member Sri Lankan team for IOI 2025."
    },
    { 
      date: "Jun-Sep 2025", 
      title: "12-Session Training Series", 
      description: "Comprehensive competitive programming training from basics to advanced algorithms", 
      status: "future",
      icon: <BookOpen className="h-4 w-4" />,
      detailedInfo: "Weekly training sessions covering all essential competitive programming topics from introduction to advanced algorithms like dynamic programming and graph theory."
    },
    { 
      date: "Oct 2025", 
      title: "IEEEXtreme 19.0", 
      description: "24-hour global programming competition for IEEE student members", 
      status: "future",
      icon: <Code className="h-4 w-4" />,
      detailedInfo: "Global 24-hour programming competition where teams of IEEE student members compete to solve algorithmic problems from designated centers."
    },
    { 
      date: "Oct-Dec 2025", 
      title: "ICPC Regional Cycle", 
      description: "National selections followed by Asia Regional Contest", 
      status: "future",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "University teams compete in national selections to qualify for the ICPC Asia Regional Contest, with potential advancement to World Finals."
    },
    { 
      date: "Feb 2026", 
      title: "NOI 2026 & Awards", 
      description: "Next NOI cycle begins + Annual recognition ceremony", 
      status: "future",
      icon: <Award className="h-4 w-4" />,
      detailedInfo: "NOI 2026 registration opens alongside annual awards ceremony recognizing achievements with scholarships and opportunities."
    }
  ];

  // Maximized events (8 detailed events)
  const maximizedEvents = [
    { 
      date: "February 2025", 
      title: "NOI 2025 Registration Opens", 
      description: "Registration begins for the National Olympiad in Informatics 2025.", 
      status: "past",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "Registration for NOI 2025 opened to all secondary school students across Sri Lanka. Students could register through their schools or individually online."
    },
    { 
      date: "March 15, 2025", 
      title: "NOI 2025 Qualifier Round 1", 
      description: "First qualifying round for NOI 2025 - online contest.", 
      status: "past",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "The first qualifier was an online contest lasting 3 hours with 4-5 problems of varying difficulty. Students competed from their schools or designated centers."
    },
    { 
      date: "April 12, 2025", 
      title: "NOI 2025 Qualifier Round 2", 
      description: "Second qualifying round for NOI 2025 - advanced problems.", 
      status: "past",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "The second qualifier featured more challenging algorithmic problems. Top performers from Round 1 advanced to compete in this round."
    },
    { 
      date: "May 10, 2025", 
      title: "NOI 2025 National Finals", 
      description: "National finals to select the Sri Lankan team for IOI 2025.", 
      status: "past",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "The national finals consisted of two 5-hour contests held over two days. The top 4 students were selected to represent Sri Lanka at the International Olympiad in Informatics."
    },
    { 
      date: "Jun-Sep 2025", 
      title: "12-Session Training Series", 
      description: "Comprehensive competitive programming training from basics to advanced algorithms", 
      status: "future",
      icon: <BookOpen className="h-4 w-4" />,
      detailedInfo: "Weekly training sessions covering: Introduction to CP, Complexity Analysis, Arrays & Prefix Sums, Sorting, Two-Pointers, Binary Search, Greedy Algorithms, Recursion & Backtracking, Dynamic Programming (2 parts), Graph Theory, and Trees & DSU."
    },
    { 
      date: "October 2025", 
      title: "IEEEXtreme 19.0", 
      description: "24-hour global programming competition for IEEE student members", 
      status: "future",
      icon: <Code className="h-4 w-4" />,
      detailedInfo: "Global 24-hour programming competition where teams of IEEE student members compete to solve algorithmic problems. Sri Lankan teams will participate from designated competition centers."
    },
    { 
      date: "Oct-Dec 2025", 
      title: "ICPC Regional Cycle", 
      description: "National selections followed by Asia Regional Contest", 
      status: "future",
      icon: <Trophy className="h-4 w-4" />,
      detailedInfo: "University teams compete in national selections (October-November) to qualify for the ICPC Asia Regional Contest (December). Winning teams may advance to the ICPC World Finals."
    },
    { 
      date: "February 2026", 
      title: "NOI 2026 & Awards Ceremony", 
      description: "Next NOI cycle begins + Annual recognition ceremony", 
      status: "future",
      icon: <Award className="h-4 w-4" />,
      detailedInfo: "NOI 2026 registration opens and the annual awards ceremony recognizing outstanding achievements across all CodeX competitions and training sessions, with scholarships and internship opportunities."
    }
  ];

  // Choose events based on maximize state
  const events = isMaximized ? maximizedEvents : minimizedEvents;

  // Get event status styling
  const getEventStatusStyle = (status) => {
    switch(status) {
      case 'past':
        return 'opacity-70';
      case 'current':
        return 'border-2 border-blue-400';
      case 'future':
      default:
        return '';
    }
  };

  return (
    <section id="timeline" className={`${isMaximized ? 'py-24' : 'py-16'} bg-darkBlue-900 relative overflow-hidden transition-all duration-500`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern absolute inset-0"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`${isMaximized ? 'max-w-6xl' : 'max-w-4xl'} mx-auto text-center ${isMaximized ? 'mb-16' : 'mb-12'} transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">ROADMAP</span>
          <h2 className={`${isMaximized ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold mb-4 blue-glow-text transition-all duration-500`}>Event Timeline</h2>
          <div className={`${isMaximized ? 'w-16' : 'w-12'} h-1 bg-blue-500 mx-auto mb-4 transition-all duration-500`}></div>
          <p className={`${isMaximized ? 'text-lg' : 'text-base'} text-gray-300 mb-6 transition-all duration-500`}>
            {isMaximized ? 'Comprehensive timeline of all events, competitions, and milestones' : 'Key milestones and major events in our competitive programming journey'}
          </p>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Current date indicator */}
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-900 bg-opacity-30 border border-blue-500 border-opacity-30 rounded-lg text-white text-sm">
              <CalendarIcon className="h-3 w-3 mr-2 text-blue-400" />
              <span>Today: {formattedCurrentDate}</span>
            </div>
            
            {/* Maximize/Minimize Button */}
            <button
              onClick={toggleMaximize}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isMaximized
                  ? 'bg-red-600 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30 hover:bg-red-500 hover:bg-opacity-30'
                  : 'bg-blue-600 bg-opacity-20 text-blue-300 border border-blue-500 border-opacity-30 hover:bg-blue-500 hover:bg-opacity-30'
              } hover:scale-105 shadow-lg`}
              aria-label={isMaximized ? "Minimize timeline" : "Maximize timeline"}
            >
              {isMaximized ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
              {isMaximized ? 'Minimize View' : 'Maximize View'}
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className={`${isMaximized ? 'max-w-6xl' : 'max-w-4xl'} mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {!isMaximized ? (
            /* Minimized - Compact List View */
            <div className="grid gap-4">
              {events.map((event, index) => {
                const isExpanded = expandedEvent === index;
                
                return (
                  <div 
                    key={index}
                    className={`transition-all duration-1000 ${getEventStatusStyle(event.status)}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.6s ease-out ${200 + index * 100}ms`
                    }}
                  >
                    <GlassCard 
                      className="p-4 rounded-lg hover:scale-[1.02] transition-all duration-300"
                      hoverEffect="subtle"
                      glowIntensity="medium"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Icon */}
                          <div className="bg-blue-600 bg-opacity-20 p-2 rounded-full flex-shrink-0">
                            {event.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold text-blue-300 text-sm sm:text-base">{event.title}</h3>
                              <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span className="font-mono">{event.date}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm mt-1">{event.description}</p>
                            
                            {/* Expanded details */}
                            {isExpanded && (
                              <div className="mt-3 bg-darkBlue-800 bg-opacity-50 p-3 rounded-lg border border-blue-900 border-opacity-30">
                                <p className="text-gray-300 text-sm">{event.detailedInfo}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Expand button */}
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => toggleEventExpanded(index)}
                              className="p-1.5 rounded-full bg-darkBlue-800 bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 text-gray-400 hover:text-blue-300 transition-colors"
                              aria-label={isExpanded ? "Show less details" : "Show more details"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Maximized - Detailed Timeline View */
            <div 
              ref={timelineRef}
              className="relative"
            >
              {/* Timeline vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-800 z-0 hidden md:block rounded-full"></div>
              
              <div className="relative z-10">
                {events.map((event, index) => {
                  const isExpanded = expandedEvent === index;
                  
                  return (
                    <div 
                      key={index} 
                      className={`mb-12 flex items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      } ${getEventStatusStyle(event.status)}`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.6s ease-out ${200 + index * 100}ms`
                      }}
                    >
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                        <ParallaxEffect speed={0.03} direction="vertical" reverse={index % 2 === 0}>
                          <GlassCard 
                            className={`p-6 rounded-xl relative transition-all duration-300 ${
                              isExpanded ? 'scale-105 shadow-xl' : ''
                            }`}
                            hoverEffect="scale"
                            glowIntensity="medium"
                          >
                            {/* Enhanced category indicator */}
                            <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} h-full w-1.5 rounded-l bg-gradient-to-b from-blue-400 via-blue-400 to-blue-400/70`}></div>
                            
                            {/* Event content */}
                            <div className="flex items-start gap-3 md:gap-0">
                              <div className="md:hidden bg-blue-600 bg-opacity-20 p-2 rounded-full flex-shrink-0">
                                {event.icon}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <div className={`${index % 2 === 0 ? 'ml-auto' : ''} flex items-center gap-2`}>
                                    <div className={`bg-blue-400 bg-opacity-20 p-2 rounded-full ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                                      {event.icon}
                                    </div>
                                    <h3 className={`font-bold text-xl text-blue-300 ${index % 2 === 0 ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                                      {event.title}
                                    </h3>
                                  </div>
                                </div>
                                
                                <div className={`flex items-center text-gray-400 text-sm mb-3 ${
                                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                                }`}>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span className="font-mono">{event.date}</span>
                                </div>
                                
                                <p className="text-gray-300">{event.description}</p>
                                
                                {/* Detailed info (expandable) */}
                                {isExpanded && (
                                  <div className="mt-4 bg-darkBlue-800 bg-opacity-50 p-3 rounded-lg border border-blue-900 border-opacity-30">
                                    <p className="text-gray-300 text-sm">{event.detailedInfo}</p>
                                  </div>
                                )}
                                
                                {/* Footer with expand button */}
                                <div className={`mt-4 flex items-center ${
                                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                                }`}>
                                  <button 
                                    onClick={() => toggleEventExpanded(index)}
                                    className="p-1 rounded-full bg-darkBlue-800 bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 text-gray-400 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    aria-label={isExpanded ? "Show less details" : "Show more details"}
                                    aria-expanded={isExpanded}
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </GlassCard>
                        </ParallaxEffect>
                      </div>
                      
                      {/* Timeline node - hidden on mobile */}
                      <div className="hidden md:flex items-center justify-center z-20">
                        <div className="relative">
                          {/* Animated pulse background */}
                          <div className="absolute -inset-2 rounded-full animate-pulse-slow opacity-30 bg-blue-400"></div>
                          
                          <div className={`bg-blue-400 rounded-full w-12 h-12 border border-blue-400 flex items-center justify-center blue-glow relative z-10 transition-transform duration-300 ${
                            isExpanded ? 'scale-125' : ''
                          }`}>
                            {event.icon}
                          </div>
                        </div>
                      </div>
                      
                      <div className="hidden md:block md:w-1/2"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block py-2 px-4 bg-blue-900 bg-opacity-30 rounded-full border border-blue-500 border-opacity-30">
            <span className="text-blue-300 font-medium flex items-center text-sm">
              <span>
                Showing {events.length} events
                {isMaximized ? ' (Maximized View)' : ' (Minimized View)'}
              </span>
            </span>
          </div>
          
          {/* Keyboard shortcuts hint for maximized mode */}
          {isMaximized && (
            <div className="mt-4 text-xs text-gray-500">
              <p>
                Press <kbd className="px-1.5 py-0.5 bg-darkBlue-800 rounded border border-gray-700">ESC</kbd> to minimize •
                Click events to expand details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ESC key handler for maximize mode */}
      <div 
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && isMaximized) {
            setIsMaximized(false);
          }
        }}
        className="sr-only"
        ref={(el) => {
          if (isMaximized && el) {
            el.focus();
          }
        }}
      />

      {/* Custom styles */}
      <style jsx>{`
        @keyframes animate-pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-slow {
          animation: animate-pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}