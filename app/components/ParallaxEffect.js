'use client'

import { useEffect, useRef } from 'react';

export default function ParallaxEffect({ 
  children, 
  speed = 0.1, 
  direction = 'vertical',
  className = '',
  reverse = false
}) {
  const elementRef = useRef(null);
  const initialPosition = useRef({ top: 0, left: 0 });
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Store the initial position
    const rect = element.getBoundingClientRect();
    initialPosition.current = {
      top: rect.top,
      left: rect.left
    };

    const handleScroll = () => {
      if (!element) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const windowMiddle = scrollPosition + windowHeight / 2;
      
      // Calculate element's position relative to document
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollPosition;
      const elementMiddle = elementTop + rect.height / 2;
      
      // Calculate distance from middle of the screen to middle of the element
      const distanceFromMiddle = elementMiddle - windowMiddle;
      
      // Apply parallax effect
      const modifier = reverse ? -1 : 1;
      
      // Use a local transform variable instead of directly modifying the element
      let transform = '';
      
      if (direction === 'vertical' || direction === 'both') {
        const translateY = distanceFromMiddle * speed * modifier;
        transform = `translateY(${translateY}px)`;
      } else if (direction === 'horizontal') {
        const translateX = distanceFromMiddle * speed * modifier;
        transform = `translateX(${translateX}px)`;
      } else if (direction === 'rotate') {
        const rotate = distanceFromMiddle * speed * 0.02 * modifier;
        transform = `rotate(${rotate}deg)`;
      } else if (direction === 'scale') {
        // Scale between 0.9 and 1.1 based on position
        const scale = 1 + (distanceFromMiddle * speed * 0.0005 * modifier);
        transform = `scale(${Math.max(0.9, Math.min(1.1, scale))})`;
      } else if (direction === 'both') {
        const translateY = distanceFromMiddle * speed * modifier;
        const translateX = distanceFromMiddle * speed * 0.2 * modifier;
        transform = `translate(${translateX}px, ${translateY}px)`;
      }
      
      // Apply the transform to the element
      element.style.transform = transform;
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once to position elements correctly
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, reverse]);

  return (
    <div 
      ref={elementRef} 
      className={`transition-transform duration-200 will-change-transform ${className}`}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </div>
  );
} 