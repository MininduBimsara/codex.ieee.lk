"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  ChevronUp,
  Linkedin,
  Facebook,
  Instagram,
  Code,
} from "lucide-react";
import Image from "next/image";
import GlassCard from "@/app/components/GlassCard";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect when to show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation on page load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Smooth scroll to section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // External resources with proper links
  const resources = [
    {
      name: "IEEE Sri Lanka",
      url: "https://ieee.lk",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
    {
      name: "International Olympiad in Informatics",
      url: "https://ioinformatics.org",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
    {
      name: "IEEEXtreme Global",
      url: "https://ieeextreme.org",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
    {
      name: "ICPC Official",
      url: "https://icpc.global",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
    {
      name: "Competitive Programming Resources",
      url: "https://cp-algorithms.com",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
    {
      name: "International AI Olympiad",
      url: "https://ioai-official.org/",
      icon: <ExternalLink className="w-3 h-3 mr-2" />,
    },
  ];

  // Social media links
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1Bq1tN26qg/",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ieeesrilanka?igsh=NDU0eTU3ZjE4czBh",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/company/ieeesrilanka/",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="pt-20 pb-10 text-white relative overflow-hidden">
      {/* Scroll to top button */}
      <button
        className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg z-50 text-white hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Background elements */}
      <div className="absolute inset-0 opacity-8">
        <div className="grid-pattern absolute inset-0"></div>
        <div className="absolute inset-0 -z-10 animated-gradient opacity-40"></div>
      </div>

      {/* Decorative code elements */}
      <div className="absolute top-10 left-10 text-blue-600 opacity-5 transform -rotate-12">
        <Code className="w-20 h-20" />
      </div>
      <div className="absolute bottom-10 right-10 text-blue-600 opacity-5 transform rotate-12">
        <Code className="w-20 h-20" />
      </div>

      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`glass-card p-6 md:p-8 rounded-2xl grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {/* CodeX Text Logo */}
              <Image
                src="/images/codex-text.png"
                alt="CodeX"
                width={120}
                height={32}
                className="drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(30, 58, 138, 0.5))",
                }}
              />

              {/* IEEE Logo with white background */}
              <div className="px-2 py-1 flex items-center shadow-sm">
                <Image
                  src="/images/ieee-section-flag.png"
                  alt="IEEE Sri Lanka"
                  width={160}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-lg italic font-light">
              From logic to legacy
            </p>
            <p className="text-gray-400 text-sm">
              Building a thriving tech community through the power of
              competitive programming and collaboration.
            </p>

            {/* Social links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  className="p-2 bg-darkBlue-800 bg-opacity-60 rounded-full text-blue-400 hover:bg-blue-900 hover:text-white transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <div className="w-1 h-4 bg-blue-500 mr-2"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", id: "about" },
                { name: "Sessions", id: "sessions" },
                { name: "Competitions", id: "competitions" },
                { name: "Timeline", id: "timeline" },
                { name: "Our Team", id: "team" },
                { name: "FAQ", id: "faq" },
                { name: "Contact", id: "contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group focus:outline-none focus:text-blue-400"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <div className="w-1 h-4 bg-blue-500 mr-2"></div>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group focus:outline-none focus:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.icon}
                    <span className="group-hover:underline">
                      {resource.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-900/40 my-8"></div>

        {/* Bottom section */}
        <div
          className={`flex flex-col sm:flex-row justify-between items-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-400 text-sm">
              © 2026 IEEE CodeX Sri Lanka. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              A proud initiative of the IEEE Sri Lanka Section.
            </p>
          </div>

          <div className="flex items-center">
            <span className="text-gray-400 mr-2 text-sm">Developed by</span>
            <a
              href="http://hiruna.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
            >
              Hiruna Gallage
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
