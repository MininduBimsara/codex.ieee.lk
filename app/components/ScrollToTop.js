'use client'

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Animated icon effect
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    // Better scroll animation with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 rounded-full z-50 transition-all ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } glass-card blue-glow hover:scale-110 group focus:outline-none`}
      aria-label="Scroll to top"
    >
      <ChevronUp 
        className={`h-6 w-6 text-blue-400 transition-all ${
          isAnimating ? 'animate-bounce' : 'group-hover:transform group-hover:-translate-y-1'
        }`}
      />
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-darkBlue-700 text-blue-300 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Back to Top
      </span>
    </button>
  );
}