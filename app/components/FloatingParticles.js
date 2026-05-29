'use client'

import { useEffect, useState, useRef } from 'react';

export default function FloatingParticles({ 
  count = 20,
  colors = ['#3b82f6', '#60a5fa', '#93c5fd'],
  minSize = 1,
  maxSize = 5,
  minDuration = 5,
  maxDuration = 15,
  interactive = true,
  density = 'normal',
  direction = 'up',
  speed = 'medium'
}) {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);
  const actualCountRef = useRef(0);

  // Convert density to actual particle count
  const densityMap = {
    'low': count * 0.5,
    'normal': count,
    'high': count * 2,
    'ultra': count * 4
  };
  
  // Convert speed to duration multiplier
  const speedMap = {
    'slow': 1.5,
    'medium': 1,
    'fast': 0.6,
    'turbo': 0.3
  };
  
  // Direction mapping to animation properties
  const directionMap = {
    'up': { x: 0, y: -1 },
    'down': { x: 0, y: 1 },
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 },
    'random': { x: null, y: null }
  };

  // Initialize configurations once on mount
  useEffect(() => {
    actualCountRef.current = densityMap[density] || count;
    
    // Handle resize events
    const handleResize = () => {
      // Use timeout to avoid too many updates
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        if (containerRef.current) {
          generateParticles();
        }
      }, 250);
    };
    
    // Track mouse position for interactive mode
    const handleMouseMove = (e) => {
      if (!interactive) return;
      
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      mousePos.current = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      };
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(window.resizeTimer);
    };
  }, [count, density, interactive]);

  // Generate particles once on component mount or when props change
  useEffect(() => {
    if (!containerRef.current) return;
    generateParticles();
  }, [count, colors, minSize, maxSize, minDuration, maxDuration, direction, density, speed]);

  // Function to generate particles based on current props
  const generateParticles = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const actualCount = actualCountRef.current;
    const speedMultiplier = speedMap[speed] || 1;
    const dirVector = directionMap[direction] || directionMap.up;
    
    // Generate new set of particles
    const newParticles = Array.from({ length: actualCount }).map((_, index) => {
      // Random position within container
      const posX = Math.random() * containerRect.width;
      const posY = Math.random() * containerRect.height;
      
      // Random direction if 'random' is selected
      let xDirection = dirVector.x;
      let yDirection = dirVector.y;
      
      if (direction === 'random') {
        const angle = Math.random() * Math.PI * 2;
        xDirection = Math.cos(angle);
        yDirection = Math.sin(angle);
      }
      
      return {
        id: index,
        size: minSize + Math.random() * (maxSize - minSize),
        x: posX,
        y: posY,
        // Apply speed multiplier to duration
        duration: (minDuration + Math.random() * (maxDuration - minDuration)) * speedMultiplier,
        delay: Math.random() * 5,
        opacity: 0.1 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        xDirection: xDirection,
        yDirection: yDirection
      };
    });
    
    setParticles(newParticles);
  };

  const getParticleStyle = (particle) => {
    let animationName;
    let transformEnd;
    
    if (direction === 'random') {
      // Custom direction for each particle
      const distance = Math.max(window.innerWidth, window.innerHeight);
      transformEnd = `translate(${particle.xDirection * distance}px, ${particle.yDirection * distance}px)`;
      animationName = 'floatCustom';
    } else if (direction === 'up') {
      animationName = 'floatUp';
    } else if (direction === 'down') {
      animationName = 'floatDown';
    } else if (direction === 'left') {
      animationName = 'floatLeft';
    } else if (direction === 'right') {
      animationName = 'floatRight';
    }
    
    return {
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      opacity: particle.opacity,
      backgroundColor: particle.color,
      animation: `${animationName} ${particle.duration}s linear infinite`,
      animationDelay: `${particle.delay}s`,
      '--transform-end': transformEnd, // CSS variable for custom direction
    };
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        '--float-up-end': 'translate(100px, -100vh)',
        '--float-down-end': 'translate(100px, 100vh)',
        '--float-left-end': 'translate(-100vw, -50px)',
        '--float-right-end': 'translate(100vw, -50px)'
      }}
    >
      {particles.map((particle) => (
        <div 
          key={particle.id}
          className="absolute rounded-full"
          style={getParticleStyle(particle)}
        ></div>
      ))}

      {/* Additional CSS for animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          90% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          100% {
            transform: var(--float-up-end);
            opacity: 0;
          }
        }
        
        @keyframes floatDown {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          90% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          100% {
            transform: var(--float-down-end);
            opacity: 0;
          }
        }
        
        @keyframes floatLeft {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          90% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          100% {
            transform: var(--float-left-end);
            opacity: 0;
          }
        }
        
        @keyframes floatRight {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          90% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          100% {
            transform: var(--float-right-end);
            opacity: 0;
          }
        }
        
        @keyframes floatCustom {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          90% {
            opacity: ${interactive ? '0.5' : '0.2'};
          }
          100% {
            transform: var(--transform-end);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}