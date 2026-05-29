'use client'

// Import components
import Navbar from '@/app/components/Navbar';
import ScrollToTopButton from '@/app/components/ScrollToTop';
import HeroSection from '@/app/sections/HeroSection';
import AboutSection from '@/app/sections/AboutSection';
import SessionsSection from '@/app/sections/SessionsSection';
import CompetitionsSection from '@/app/sections/CompetitionsSection';
import TimelineSection from '@/app/sections/TimelineSection';
import TeamSection from '@/app/sections/TeamSection';
import CommunitySection from '@/app/sections/CommunitySection';
import FAQSection from '@/app/sections/FAQSection';
import ContactSection from '@/app/sections/ContactSection';
import SponsorsSection from '@/app/sections/SponsorsSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-darkBlue-900 overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Sessions Section */}
      <SessionsSection />

      {/* Competitions Section */}
      <CompetitionsSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Team Section */}
      <TeamSection />

      {/* Community Section */}
      <CommunitySection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Sponsors Section */}
      <SponsorsSection />
      
      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}