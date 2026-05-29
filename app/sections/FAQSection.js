'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle, Filter, X, Tag } from 'lucide-react';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

export default function FAQSection() {
  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFocused, setSearchFocused] = useState(false);
  const answerRefs = useRef([]);
  const searchInputRef = useRef(null);
  
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
    
    const section = document.getElementById('faq');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  // Updated FAQ data with only 5 questions and enhanced answers
  const faqs = [
    { 
      question: "What is IEEE CodeX Sri Lanka?", 
      answer: "IEEE CodeX Sri Lanka is the latest initiative by the IEEE Sri Lanka Section aimed at promoting competitive programming in Sri Lanka through various coding contests and training sessions. Our mission is to build a thriving tech community and develop world-class programming talent in Sri Lanka. We are actively engaged in facilitating three major competitive programming events: the National Olympiad in Informatics (NOI), Sri Lanka Artificial Intelligence Olympiad (SLAIO), IEEEXtreme, and the International Collegiate Programming Contest (ICPC). These competitions provide platforms for aspiring programmers to showcase their skills, learn from experts, and foster a strong programming culture within the country.",
      category: "general"
    },
    { 
      question: "How can I participate in the competitions?", 
      answer: "Participants can register for the National Olympiad in Informatics (NOI), Sri Lanka Artificial Intelligence Olympiad (SLAIO), IEEEXtreme, and ICPC through the respective official websites once registrations open. For NOI, students need to register through their schools, often with the guidance of a teacher or academic coordinator. For IEEEXtreme, you must be an IEEE member to be eligible to participate, ensuring you meet this prerequisite before attempting to register. For ICPC, your university team coach will need to register your team, highlighting the team-based nature of this competition and the need for institutional support.", 
      category: "participation"
    },
    { 
      question: "What training sessions are available?", 
      answer: "We offer a series of training sessions focusing on problem-solving, algorithmic thinking, teamwork, time management, and insights from past winners to prepare participants for competitions. These include weekly online practice sessions, in-person workshops, and specialized boot camps before major competitions. All skill levels are welcome! Each session is carefully designed to build both technical and soft skills, helping participants grow steadily and confidently. Whether you're a beginner or an experienced competitor, there's always something new to learn and apply. Our comprehensive 12-session series covers everything from basic competitive programming concepts to advanced algorithms like dynamic programming and graph theory.", 
      category: "training"
    },
    { 
      question: "Who can participate in these competitions?", 
      answer: "Competitions like IEEEXtreme and the International Collegiate Programming Contest (ICPC) are open to university students, while the National Olympiad in Informatics (NOI) and Sri Lanka Artificial Intelligence Olympiad (SLAIO) are geared towards secondary school students. Age restrictions may apply for certain competitions, particularly for international advancement. For instance, NOI and SLAIO participants must be under 20 years of age, and ICPC is typically open to undergraduate students under the age of 24. These guidelines ensure fair competition and alignment with global standards.", 
      category: "eligibility"
    },
    { 
      question: "How can sponsors get involved?", 
      answer: "Sponsors can partner with us to gain visibility, access top talent, and showcase their brand through various promotional opportunities. We offer different sponsorship tiers with benefits including logo placement, speaking opportunities, recruitment access, and more. Sponsorship also provides a unique platform to engage with a passionate community of young innovators and future tech leaders. For detailed sponsorship packages and customized collaboration options, please contact us through our contact form or reach out directly to our team.", 
      category: "sponsorship"
    }
  ];

  // Enhanced category metadata with distinct colors (removed technical category)
  const categories = {
    all: { label: 'All Questions', color: 'green-400', icon: <Filter className="w-3.5 h-3.5 mr-1.5" /> },
    general: { label: 'General', color: 'green-400', icon: <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> },
    participation: { label: 'Participation', color: 'green-400', icon: <Tag className="w-3.5 h-3.5 mr-1.5" /> },
    training: { label: 'Training', color: 'green-400', icon: <Tag className="w-3.5 h-3.5 mr-1.5" /> },
    eligibility: { label: 'Eligibility', color: 'green-400', icon: <Tag className="w-3.5 h-3.5 mr-1.5" /> },
    sponsorship: { label: 'Sponsorship', color: 'green-400', icon: <Tag className="w-3.5 h-3.5 mr-1.5" /> }
  };

  // Filter FAQs based on search term and active category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  // Clear search and filters
  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Focus search when pressing certain keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Focus search bar when pressing / (common shortcut)
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section id="faq" className="py-24 bg-darkBlue-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern absolute inset-0"></div>
      </div>
      
      {/* Enhanced decorative elements with animation */}
      <div className="absolute top-20 left-10 text-blue-600 opacity-10 transform -rotate-12 animate-pulse-slow">
        <HelpCircle className="w-20 h-20" />
      </div>
      <div className="absolute bottom-20 right-10 text-blue-600 opacity-10 transform rotate-12 animate-pulse-slow animation-delay-500">
        <HelpCircle className="w-20 h-20" />
      </div>
      <div className="absolute top-1/2 right-10 text-blue-600 opacity-5 transform rotate-45 animate-pulse-slow animation-delay-1000">
        <HelpCircle className="w-16 h-16" />
      </div>
      <div className="absolute bottom-1/3 left-10 text-blue-600 opacity-5 transform -rotate-45 animate-pulse-slow animation-delay-1500">
        <HelpCircle className="w-16 h-16" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">SUPPORT</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 blue-glow-text">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300">
            Find answers to common questions about IEEE CodeX Sri Lanka
          </p>
        </div>

        {/* Enhanced search bar with keyboard shortcut hint */}
        <div className={`max-w-3xl mx-auto mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className={`h-5 w-5 transition-colors ${searchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="w-full py-3.5 pl-12 pr-12 bg-darkBlue-800 bg-opacity-70 border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-200 placeholder-gray-400 shadow-inner transition-all"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search frequently asked questions"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {!searchTerm && (
                <span className="text-xs text-gray-500 bg-darkBlue-700 px-1.5 py-0.5 rounded">
                  Press /
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className={`max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap gap-2 justify-center p-1 rounded-lg bg-darkBlue-800 bg-opacity-50">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center text-sm px-3 py-1.5 rounded-md transition-all ${
                  activeCategory === key 
                    ? `bg-${category.color} bg-opacity-20 text-${category.color} border border-${category.color} border-opacity-40` 
                    : 'text-gray-400 hover:text-white hover:bg-darkBlue-700'
                }`}
                aria-pressed={activeCategory === key}
                aria-label={`Filter by ${category.label}`}
              >
                {category.icon}
                {category.label}
                {key !== 'all' && (
                  <span className="ml-1.5 text-xs bg-darkBlue-700 px-1.5 rounded-full">
                    {faqs.filter(faq => faq.category === key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="max-w-3xl mx-auto mb-4 text-sm text-gray-400">
            Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} {activeCategory !== 'all' && `in ${categories[activeCategory].label}`}
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const categoryDetails = categories[faq.category] || categories.general;
              
              return (
                <div 
                  key={index} 
                  className="mb-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.8s ease-out ${300 + index * 100}ms`
                  }}
                >
                  <ParallaxEffect speed={0.02}>
                    <GlassCard 
                      className={`rounded-xl overflow-hidden border-l-4 border-${categoryDetails.color}`}
                      hoverEffect="shine"
                      glowIntensity={openIndex === index ? "strong" : "medium"}
                      interactive={true}
                    >
                      <div 
                        className={`flex items-center justify-between p-6 transition-all ${
                          openIndex === index 
                            ? `bg-darkBlue-800 bg-opacity-60` 
                            : 'hover:bg-darkBlue-800 hover:bg-opacity-40'
                        } cursor-pointer`}
                        onClick={() => toggleFAQ(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        tabIndex={0}
                        role="button"
                        aria-expanded={openIndex === index}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <div className="flex items-start pr-8">
                          <h3 className={`text-lg font-medium ${openIndex === index ? 'text-white' : 'text-blue-300'}`}>
                            {searchTerm ? (
                              highlightSearchTerm(faq.question, searchTerm)
                            ) : (
                              faq.question
                            )}
                          </h3>
                        </div>
                        <div className="flex items-center">
                          {/* Enhanced category badge */}
                          <span className={`mr-4 text-xs px-2 py-1 rounded-full bg-${categoryDetails.color} bg-opacity-20 text-${categoryDetails.color} border border-${categoryDetails.color} border-opacity-30 hidden md:inline-flex items-center`}>
                            {categoryDetails.icon}
                            {categoryDetails.label}
                          </span>
                          
                          <ChevronDown 
                            className={`h-5 w-5 ${openIndex === index ? 'text-white' : 'text-blue-400'} transition-transform duration-500 flex-shrink-0 ${
                              openIndex === index ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced answer section with improved animation */}
                      <div 
                        id={`faq-answer-${index}`}
                        ref={el => answerRefs.current[index] = el}
                        className={`px-6 pb-6 text-gray-300 transition-all duration-500 overflow-hidden ${
                          openIndex === index 
                            ? 'bg-darkBlue-800 bg-opacity-30 border-t border-blue-900 border-opacity-20' 
                            : ''
                        }`}
                        style={{
                          maxHeight: openIndex === index ? `${answerRefs.current[index]?.scrollHeight}px` : '0',
                          opacity: openIndex === index ? 1 : 0,
                          paddingTop: openIndex === index ? '1rem' : '0'
                        }}
                      >
                        {/* Enhanced mobile category badge */}
                        <span className={`mb-3 text-xs px-2 py-1 rounded-full bg-${categoryDetails.color} bg-opacity-20 text-${categoryDetails.color} border border-${categoryDetails.color} border-opacity-30 inline-flex items-center md:hidden`}>
                          {categoryDetails.icon}
                          {categoryDetails.label}
                        </span>
                        
                        <p className="leading-relaxed">
                          {searchTerm ? (
                            highlightSearchTerm(faq.answer, searchTerm)
                          ) : (
                            faq.answer
                          )}
                        </p>
                      </div>
                    </GlassCard>
                  </ParallaxEffect>
                </div>
              );
            })
          ) : (
            <div className={`text-center py-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <GlassCard className="p-8 rounded-xl">
                <HelpCircle className="h-12 w-12 text-blue-400 mx-auto mb-4 opacity-70" />
                <h3 className="text-xl font-medium text-blue-300 mb-3">No matching questions found</h3>
                <p className="text-gray-300 mb-6">Try using different keywords or select a different category.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900"
                  >
                    Reset all filters
                  </button>
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 border border-blue-500 text-blue-300 font-medium rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900 ${activeCategory === 'all' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={activeCategory === 'all'}
                  >
                    Show all categories
                  </button>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
        
        {/* Enhanced "Still have questions" call-to-action */}
        <div className={`max-w-3xl mx-auto mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <GlassCard className="p-8 rounded-xl background-shimmer">
            <h3 className="text-xl font-medium text-blue-300 mb-3">Still have questions?</h3>
            <p className="text-gray-300 mb-6">Our team is ready to assist you with any additional questions you might have.</p>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all hover:scale-105 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900"
            >
              Contact Us
              <MessageCircle className="ml-2 h-5 w-5 transform transition-transform group-hover:scale-110" />
            </a>
          </GlassCard>
        </div>
        
        {/* Keyboard shortcuts hint */}
        <div className="max-w-3xl mx-auto mt-6 text-center text-xs text-gray-500">
          <p>Press <kbd className="px-1.5 py-0.5 bg-darkBlue-800 rounded border border-gray-700">/</kbd> to focus search • Press <kbd className="px-1.5 py-0.5 bg-darkBlue-800 rounded border border-gray-700">ESC</kbd> to clear search</p>
        </div>
      </div>
    </section>
  );
}

// Enhanced highlight function with better styling
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm.trim()) return text;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? 
          <span key={i} className="bg-blue-900 bg-opacity-50 text-blue-100 px-1 py-0.5 rounded font-medium">{part}</span> : 
          part
      )}
    </>
  );
}