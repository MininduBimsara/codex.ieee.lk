"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Handle active section tracking
      const sections = [
        "hero",
        "about",
        "sessions",
        "competitions",
        "timeline",
        "team",
        "faq",
        "contact",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Handle navbar appearance - glass effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Always close the menu after clicking
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed w-full z-50">
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* CodeX Text Logo */}
            <Image
              src="/images/codex-text.png"
              alt="CodeX"
              width={120}
              height={32}
              className="drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.4))",
              }}
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              "about",
              "sessions",
              "competitions",
              "timeline",
              "team",
              "faq",
              "contact",
            ].map((section) => (
              <button
                key={section}
                className={`text-sm font-medium transition-all relative hover:text-sky-400 ${
                  activeSection === section ? "text-sky-400" : "text-gray-300/80"
                } focus:outline-none`}
                onClick={() => scrollToSection(section)}
              >
                {section === "sessions"
                  ? "Sessions"
                  : section.charAt(0).toUpperCase() + section.slice(1)}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transform scale-x-0 transition-transform origin-left duration-300 ${
                    activeSection === section ? "scale-x-100" : ""
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/25 text-sky-300 font-semibold hover:bg-sky-500/25 hover:border-sky-400/40 transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - separated from the nav to avoid translation issues */}
      <div
        className={`md:hidden backdrop-blur-2xl bg-[#020617]/95 border-t border-sky-500/20 absolute w-full z-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="py-2">
          {[
            "about",
            "sessions",
            "competitions",
            "timeline",
            "team",
            "faq",
            "contact",
          ].map((section) => (
            <button
              key={section}
              className={`block w-full text-left px-4 py-4 text-sm font-medium hover:bg-sky-500/10 transition-colors border-b border-white/5 last:border-0 ${
                activeSection === section
                  ? "text-sky-400 bg-sky-500/5"
                  : "text-gray-300"
              } focus:outline-none`}
              onClick={() => scrollToSection(section)}
            >
              {section === "sessions"
                ? "Sessions"
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
