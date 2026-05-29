"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Users,
  Bell,
  Share2,
  ArrowRight,
  ExternalLink,
  Zap,
  Network,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import ParallaxEffect from "@/app/components/ParallaxEffect";
import GlassCard from "@/app/components/GlassCard";

export default function CommunitySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("community");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const communityFeatures = [
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Stay Informed",
      description:
        "Get session updates and resources delivered directly to your phone",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Discuss & Share",
      description:
        "Share strategies, insights, and solve problems together with peers",
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Build Networks",
      description:
        "Connect with competitive programmers across Sri Lanka and beyond",
    },
  ];

  const handleWhatsAppChannel = () => {
    // Replace with actual WhatsApp channel link
    window.open(
      "https://whatsapp.com/channel/0029VbB9vyIHbFV7qVYULT41",
      "_blank",
    );
  };

  const handleDiscussionGroup = () => {
    // Replace with actual WhatsApp group link
    window.open("https://chat.whatsapp.com/LIbD4bzTGQZ5oirimM5RRL", "_blank");
  };

  return (
    <section
      id="community"
      className="py-24 bg-gradient-to-br from-darkBlue-900 via-blue-900 to-darkBlue-800 relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern absolute inset-0"></div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>

      {/* Animated floating elements - all blue */}
      <div className="absolute top-20 left-10 text-blue-500 opacity-20 animate-bounce-slow">
        <Users size={40} />
      </div>
      <div
        className="absolute bottom-20 right-10 text-blue-500 opacity-20 animate-bounce-slow"
        style={{ animationDelay: "1s" }}
      >
        <MessageSquare size={40} />
      </div>
      <div className="absolute top-1/2 right-20 text-blue-400 opacity-10 transform rotate-12 animate-pulse-slow">
        <Network size={60} />
      </div>
      <div className="absolute bottom-1/3 left-20 text-blue-400 opacity-10 transform -rotate-12 animate-pulse-slow animation-delay-500">
        <Share2 size={50} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">
            COMMUNITY
          </span>

          {/* Header with CodeX logo - blue glow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Join</h2>
            <Image
              src="/images/codex-text.png"
              alt="CodeX"
              width={160}
              height={45}
              className="drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 10px rgba(30, 58, 138, 0.5))",
              }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Sri Lanka Community
            </h2>
          </div>

          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>

          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-4">
              Your journey doesn't stop at the sessions.
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join a growing community of competitive programmers where ideas
              spark, updates drop first, and connections turn into
              collaborations.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {communityFeatures.map((feature, index) => (
            <div key={index}>
              <ParallaxEffect speed={0.03} direction="vertical">
                <GlassCard
                  className="p-6 text-center h-full"
                  hoverEffect="scale"
                  glowIntensity="medium"
                >
                  <div className="w-16 h-16 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 blue-glow-subtle">
                    <div className="text-blue-400">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-blue-300 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </ParallaxEffect>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div
          className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassCard className="p-8 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-400">Active Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-400">Community Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  Daily
                </div>
                <div className="text-sm text-gray-400">Updates & Resources</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Call to Action Buttons */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassCard className="p-8 md:p-12 rounded-2xl text-center background-shimmer">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Connect?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Choose how you want to engage with the CodeX Sri Lanka community
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* WhatsApp Channel Button */}
              <button
                onClick={handleWhatsAppChannel}
                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900"
              >
                <Bell className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                <span>Join WhatsApp Channel</span>
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Discussion Group Button */}
              <button
                onClick={handleDiscussionGroup}
                className="group flex items-center justify-center px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-400 font-semibold rounded-xl hover:bg-blue-900 hover:bg-opacity-30 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-darkBlue-900"
              >
                <MessageSquare className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                <span>Join Discussion Group</span>
                <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Additional Info - all blue theme */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-500 border-opacity-30">
                <div className="flex items-center mb-2">
                  <Bell className="w-4 h-4 text-blue-400 mr-2" />
                  <h4 className="font-semibold text-blue-300">
                    WhatsApp Channel
                  </h4>
                </div>
                <p className="text-sm text-gray-300">
                  • Receive session announcements
                  <br />
                  • Get exclusive resources
                  <br />• Stay updated with events
                </p>
              </div>

              <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-500 border-opacity-30">
                <div className="flex items-center mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-400 mr-2" />
                  <h4 className="font-semibold text-blue-300">
                    Discussion Group
                  </h4>
                </div>
                <p className="text-sm text-gray-300">
                  • Ask questions and get help
                  <br />
                  • Share programming tips
                  <br />• Network with peers
                </p>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                By joining our community, you agree to maintain a respectful and
                supportive environment for all members.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Bottom encouragement */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="text-lg font-medium">
              The future of competitive programming in Sri Lanka starts here
            </span>
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Custom styles - blue theme only */}
      <style jsx>{`
        .blue-glow-subtle {
          box-shadow: 0 0 15px rgba(30, 58, 138, 0.3);
        }

        .background-shimmer {
          background: linear-gradient(
            135deg,
            rgba(16, 32, 64, 0.9) 0%,
            rgba(30, 58, 138, 0.7) 50%,
            rgba(16, 32, 64, 0.9) 100%
          );
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        @keyframes animate-bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes animate-pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-bounce-slow {
          animation: animate-bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: animate-pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
