"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Code,
  ChevronDown,
  ExternalLink,
  Award,
} from "lucide-react";
import FloatingParticles from "@/app/components/FloatingParticles";
import ParallaxEffect from "@/app/components/ParallaxEffect";
import Image from "next/image";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger entrance animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 60 : 80; // Smaller offset for mobile
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-16 md:pt-24 pb-12 md:pb-16 relative overflow-hidden bg-darkBlue-900"
      aria-label="Introduction to CodeX"
    >
      {/* Grid pattern with improved overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-darkBlue-900 via-transparent to-darkBlue-900"></div>

      {/* Enhanced interactive particles - reduced for mobile */}
      <FloatingParticles
        count={isMobile ? 20 : 50}
        colors={["#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"]}
        interactive={!isMobile}
        density={isMobile ? "low" : "medium"}
        direction="random"
        speed={isMobile ? "slow" : "medium"}
        minSize={1}
        maxSize={isMobile ? 3 : 5}
      />

      {/* Dynamic radial gradient background */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40"></div>

      {/* Mobile-only background logo */}
      <div
        className={`md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 w-full h-full flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-5" : "opacity-0"}`}
      >
        <div className="relative w-[280px] h-[280px]">
          <Image
            src="/images/codex-logo.png"
            alt=""
            fill
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center min-h-[90vh] md:min-h-[80vh]">
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-16 transition-all duration-1000 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left Content - Text and CTAs */}
          <div className="w-full md:w-3/5 lg:w-2/3 mb-8 md:mb-0 hero-animate text-left">
            {/* IEEE Badge - Optimized for transparent background logo */}
            <div
              className={`inline-flex items-center mb-3 md:mb-4 backdrop-blur-sm px-4 py-2 transition-all duration-1000 delay-300 transform ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <Image
                src="/images/ieee-white.png"
                alt="IEEE Sri Lanka Section"
                width={120}
                height={20}
                className="drop-shadow-lg"
                style={{
                  filter:
                    "drop-shadow(0 0 8px rgba(30, 58, 138, 0.42)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight transition-all duration-1000 delay-500 transform ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <span className="text-white">From </span>
              <span className="text-blue-400">logic</span>
              <span className="text-white"> to </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 blue-glow-text">
                legacy
              </span>
            </h1>

            <p
              className={`text-base sm:text-lg md:text-2xl font-light mb-6 md:mb-8 text-gray-300 max-w-2xl transition-all duration-1000 delay-700 transform ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              Building Sri Lanka's next generation of tech innovators through
              competitive programming.
            </p>

            {/* Buttons - Styled to match screenshot */}
            <div
              className={`flex flex-col sm:flex-row gap-3 md:gap-4 transition-all duration-1000 delay-900 transform ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <button
                onClick={() => scrollToSection("competitions")}
                className="group w-full sm:w-auto px-5 py-3.5 bg-blue-600 text-white font-medium rounded-lg blue-glow hover:bg-blue-700 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900 text-base"
                aria-label="View our competitions"
              >
                Explore Competitions
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="w-full sm:w-auto px-5 py-3.5 bg-transparent border border-blue-500 text-blue-400 font-medium rounded-lg hover:bg-blue-900 hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900 group flex items-center justify-center text-base"
                aria-label="Learn more about CodeX"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Event badge - Styled to match screenshot */}
            <div
              className={`mt-6 md:mt-8 inline-flex items-center px-3 py-1.5 bg-blue-900 bg-opacity-30 border border-blue-500 border-opacity-30 rounded-full text-xs text-blue-300 transition-all duration-1000 delay-1100 transform ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              <span>NOI 2026 concluded successfully</span>
            </div>
          </div>

          {/* Right Content - Only shown on desktop */}
          <div
            className={`hidden md:flex relative items-center justify-center w-2/5 lg:w-1/3 transition-all duration-1500 delay-500 transform ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {/* Multi-layered glow effect */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[400px] h-[400px] bg-blue-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[300px] h-[300px] bg-blue-500 rounded-full opacity-30 blur-2xl animate-pulse-slow animation-delay-500"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[200px] h-[200px] bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse-slow animation-delay-1000"></div>
            </div>

            {/* Logo container with enhanced animation */}
            <div className="relative">
              <ParallaxEffect speed={0.05} direction="scale">
                <div className="relative">
                  <Image
                    src="/images/codex-logo.png"
                    alt="CodeX IEEE Sri Lanka Logo"
                    width={450}
                    height={450}
                    className="drop-shadow-2xl"
                    priority={true}
                    onLoad={() => setIsLoaded(true)}
                  />

                  {/* Enhanced code elements decoration */}
                  <div className="absolute -top-6 -right-6 transform rotate-12 text-blue-400 opacity-75 animate-float">
                    <Code size={28} />
                  </div>
                  <div className="absolute -bottom-6 -left-6 transform -rotate-12 text-blue-400 opacity-75 animate-float animation-delay-500">
                    <Code size={28} />
                  </div>
                  <div className="absolute top-1/2 -right-10 transform rotate-45 text-blue-300 opacity-60 animate-float animation-delay-1000">
                    <Code size={20} />
                  </div>
                  <div className="absolute top-1/2 -left-10 transform -rotate-45 text-blue-300 opacity-60 animate-float animation-delay-1500">
                    <Code size={20} />
                  </div>
                </div>
              </ParallaxEffect>
            </div>
          </div>
        </div>


      </div>

      {/* Enhanced gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-16 md:h-24 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      </div>

      {/* Mobile-only background logo */}
      <div
        className={`md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 w-full h-full flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isLoaded ? "opacity-5" : "opacity-0"}`}
      >
        <div className="relative w-[1000px] h-[1000px]">
          <Image
            src="/images/codex-logo.png"
            alt=""
            fill
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Custom CSS for mobile logo effect */}
      <style jsx>{`
        @media (max-width: 768px) {
          .bg-radial-gradient {
            background: radial-gradient(
              circle at center,
              rgba(30, 58, 138, 0.1) 0%,
              rgba(17, 24, 39, 0) 70%
            );
          }
        }
      `}</style>
    </section>
  );
}
