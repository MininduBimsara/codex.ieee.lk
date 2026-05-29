"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
  BookOpen,
  X,
  Mail,
  User,
  Globe,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import ParallaxEffect from "@/app/components/ParallaxEffect";
import GlassCard from "@/app/components/GlassCard";

// TODO: Update the session series and timeline when the data is available (Change #10 from Website Altercations PDF)
export default function SessionsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("training"); // 'training' or 'competency'

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

    const section = document.getElementById("sessions");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const trainingSessions = [
    {
      id: 1,
      title:
        "Introduction to Competitive Programming & Time and Space Complexity",
      description:
        "Kickstart your journey into competitive programming and learn to analyze algorithm efficiency through time and space complexity analysis.",
      weekDates: "Week 1: July 5-6, 2025 (Sat-Sun)",
      topics: [
        "Introduction to Competitive Programming",
        "Time and Space Complexity",
      ],
      slug: "week-1-intro-complexity",
      type: "training",
    },
    {
      id: 2,
      title: "Two Pointer Techniques & Arrays and Prefix Sums",
      description:
        "Master efficient array manipulation techniques including two-pointer methods and prefix sums for range query problems.",
      weekDates: "Week 2: July 12-13, 2025 (Sat-Sun)",
      topics: ["Two Pointer Techniques", "Arrays and Prefix Sums"],
      slug: "week-2-arrays-pointers",
      type: "training",
    },
    {
      id: 3,
      title: "Sorting Algorithms & Binary Search",
      description:
        "Dive into essential sorting algorithms and discover the power of binary search beyond simple element finding.",
      weekDates: "Week 3: July 19-20, 2025 (Sat-Sun)",
      topics: ["Sorting Algorithms", "Binary Search"],
      slug: "week-3-sorting-binary",
      type: "training",
    },
    {
      id: 4,
      title: "Recursion and Backtracking",
      description:
        "Tackle problems with recursive solutions and explore the power of backtracking in decision-making scenarios.",
      weekDates: "Week 4: July 26-27, 2025 (Sat-Sun)",
      topics: ["Recursion and Backtracking"],
      slug: "week-4-recursion-backtracking",
      type: "training",
    },
    {
      id: 5,
      title: "Advanced Recursion & Greedy Algorithms",
      description:
        "Continue with advanced recursion techniques and learn to make optimal choices using greedy methods.",
      weekDates: "Week 5: August 2-3, 2025 (Sat-Sun)",
      topics: ["Recursion and Backtracking", "Greedy Algorithms"],
      slug: "week-5-recursion-greedy",
      type: "training",
    },
    {
      id: 6,
      title: "Greedy Algorithms Deep Dive",
      description:
        "Build strong intuition for solving complex problems using greedy algorithmic approaches.",
      weekDates: "Week 6: August 9-10, 2025 (Sat-Sun)",
      topics: ["Greedy Algorithms"],
      slug: "week-6-greedy-advanced",
      type: "training",
    },
    {
      id: 7,
      title: "Dynamic Programming (Part I)",
      description:
        "Get introduced to dynamic programming, breaking problems into subproblems, and building efficient solutions.",
      weekDates: "Week 7: August 16-17, 2025 (Sat-Sun)",
      topics: ["Dynamic Programming (Part I)"],
      slug: "week-7-dp-part1",
      type: "training",
    },
    {
      id: 8,
      title: "Dynamic Programming Comprehensive",
      description:
        "Master both foundational and advanced DP techniques with memoization, tabulation, and complex problem types.",
      weekDates: "Week 8: August 23-24, 2025 (Sat-Sun)",
      topics: ["Dynamic Programming (Part I)", "Dynamic Programming (Part II)"],
      slug: "week-8-dp-comprehensive",
      type: "training",
    },
    {
      id: 9,
      title: "Dynamic Programming (Part II)",
      description:
        "Dive deeper into advanced DP techniques and tackle complex dynamic programming challenges.",
      weekDates: "Week 9: August 30-31, 2025 (Sat-Sun)",
      topics: ["Dynamic Programming (Part II)"],
      slug: "week-9-dp-part2",
      type: "training",
    },
    {
      id: 10,
      title: "Trees and Disjoint Set Union (DSU)",
      description:
        "Understand tree data structures and use the Disjoint Set Union technique for optimizing union-find problems.",
      weekDates: "Week 10: September 6-7, 2025 (Sat-Sun)",
      topics: ["Trees and Disjoint Set Union (DSU)"],
      slug: "week-10-trees-dsu",
      type: "training",
    },
    {
      id: 11,
      title: "Advanced Trees & Graph Theory Introduction",
      description:
        "Explore advanced tree concepts and begin learning graph representation and traversal algorithms.",
      weekDates: "Week 11: September 13-14, 2025 (Sat-Sun)",
      topics: [
        "Trees and Disjoint Set Union (DSU)",
        "Graph Theory and Traversals",
      ],
      slug: "week-11-trees-graphs",
      type: "training",
    },
    {
      id: 12,
      title: "Graph Theory and Traversals",
      description:
        "Master graph representation and perform traversals like BFS and DFS to solve a comprehensive range of problems.",
      weekDates: "Week 12: September 20-21, 2025 (Sat-Sun)",
      topics: ["Graph Theory and Traversals"],
      slug: "week-12-graph-traversals",
      type: "training",
    },
  ];

  const competencySession = {
    id: 1,
    title: "Competency Building Series",
    description:
      "This series focuses on developing essential soft skills including time management, team management, and strategic planning. Participants will learn how to manage their schedules effectively, coordinate with team members, and plan tasks to achieve goals efficiently - skills essential for success in competitions, projects, and future careers. More sessions in this series will be announced soon.",
    weekDates: "Details Coming Soon",
    slug: "competency-building-series",
    type: "competency",
    skills: ["Time Management", "Team Management", "Strategic Planning"],
  };

  const [selectedSession, setSelectedSession] = useState(null);

  const handleSessionClick = (session) => {
    setSelectedSession(session);
  };

  const closeModal = () => {
    setSelectedSession(null);
  };

  const currentSessions =
    activeTab === "training" ? trainingSessions : [competencySession];
  const seriesInfo =
    activeTab === "training"
      ? {
          title: "Technical Training Series",
          subtitle:
            "12-week comprehensive training program designed to build strong programming foundations",
          stats: [
            { value: "12", label: "Weekly Sessions" },
            { value: "3", label: "Months Duration" },
            { value: "Online", label: "Expert-Led Sessions" },
          ],
        }
      : {
          title: "Competency Building Series",
          subtitle:
            "Essential soft skills training for competitive programming and career success",
          stats: [
            { value: "TBA", label: "Number of Sessions" },
            { value: "3", label: "Core Skills" },
            { value: "Practical", label: "Hands-on Learning" },
          ],
        };

  return (
    <section
      id="sessions"
      className="py-24 bg-darkBlue-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern absolute inset-0"></div>
      </div>

      {/* Floating book symbols - all blue */}
      <div className="absolute top-20 left-10 text-blue-500 opacity-20 animate-bounce-slow">
        <BookOpen size={32} />
      </div>
      <div
        className="absolute bottom-20 right-10 text-blue-500 opacity-20 animate-bounce-slow"
        style={{ animationDelay: "1s" }}
      >
        <Users size={32} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">
            TRAINING
          </span>

          {/* Updated Header with CodeX Text Logo */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
            <Image
              src="/images/codex-text.png"
              alt="CodeX"
              width={160}
              height={45}
              className="drop-shadow-lg blue-glow-text"
              style={{
                filter: "drop-shadow(0 0 10px rgba(30, 58, 138, 0.5))",
              }}
            />
            <h2 className="text-3xl md:text-4xl font-bold blue-glow-text">
              Session Series
            </h2>
          </div>

          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>

          {/* Series Toggle Tabs - all blue theme */}
          <div className="mb-8">
            <div className="inline-flex p-1 bg-darkBlue-800 bg-opacity-60 rounded-lg">
              <button
                onClick={() => setActiveTab("training")}
                className={`flex items-center px-6 py-3 rounded-md transition-all text-sm font-medium ${
                  activeTab === "training"
                    ? "bg-blue-600 bg-opacity-30 text-blue-300 border border-blue-500 border-opacity-40"
                    : "text-gray-300 hover:text-blue-300 hover:bg-darkBlue-700"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Technical Training
                <span className="ml-2 text-xs bg-darkBlue-700 px-2 py-0.5 rounded-full">
                  12 Weeks
                </span>
              </button>
              <button
                onClick={() => setActiveTab("competency")}
                className={`flex items-center px-6 py-3 rounded-md transition-all text-sm font-medium ${
                  activeTab === "competency"
                    ? "bg-blue-600 bg-opacity-30 text-blue-300 border border-blue-500 border-opacity-40"
                    : "text-gray-300 hover:text-blue-300 hover:bg-darkBlue-700"
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Competency Building
                <span className="ml-2 text-xs bg-darkBlue-700 px-2 py-0.5 rounded-full">
                  TBA
                </span>
              </button>
            </div>
          </div>

          <p className="text-lg text-gray-300">{seriesInfo.subtitle}</p>
        </div>

        {/* Sessions Grid */}
        <div
          className={`grid ${activeTab === "competency" ? "lg:grid-cols-1 max-w-2xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"} gap-6 lg:gap-8`}
        >
          {currentSessions.map((session, index) => (
            <div
              key={session.id}
              className={`transition-all duration-1000 delay-${200 + index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <ParallaxEffect speed={0.03} direction="vertical">
                <GlassCard
                  className="p-6 h-full flex flex-col cursor-pointer group transition-colors duration-300"
                  hoverEffect="premium-lift"
                  glowIntensity="medium"
                  borderStyle="solid"
                  onClick={() => handleSessionClick(session)}
                >
                  {/* Top Header Row */}
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-blue-500/10 group-hover:border-blue-400/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-blue-900/40 flex items-center justify-center border border-blue-500/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                        <span className="text-blue-300 font-bold text-sm">
                          {activeTab === "training"
                            ? `W${session.id}`
                            : session.id}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {activeTab === "training" ? "Training" : "Soft Skills"}
                      </span>
                    </div>
                    <div className="text-blue-400/50 group-hover:text-cyan-300 transition-colors">
                      {activeTab === "training" ? (
                        <BookOpen className="w-5 h-5" />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors leading-tight">
                    {session.title}
                  </h3>
                  <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-grow">
                    {session.description}
                  </p>

                  {/* Topics covered */}
                  {session.topics && (
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {session.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="text-[11px] font-medium bg-[#0f172a] text-blue-300 px-2.5 py-1 rounded-md border border-blue-500/20 group-hover:border-blue-400/40 transition-colors"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills badges */}
                  {session.skills && (
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {session.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-[11px] font-medium bg-[#0f172a] text-blue-300 px-2.5 py-1 rounded-md border border-blue-500/20 group-hover:border-blue-400/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer details */}
                  <div className="mt-auto pt-4 border-t border-blue-500/10 group-hover:border-blue-400/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center text-gray-400 group-hover:text-blue-300 transition-colors">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">
                        {session.weekDates.split(':')[0]}
                      </span>
                    </div>
                    <div className="flex items-center text-blue-400 group-hover:text-cyan-300 transition-colors text-xs font-semibold">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </GlassCard>
              </ParallaxEffect>
            </div>
          ))}
        </div>

        {/* Series Overview - blue theme */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <GlassCard className="p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">
              About the {seriesInfo.title}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {activeTab === "training"
                ? "This comprehensive 12-week series is designed to take you from the basics of competitive programming to advanced algorithmic concepts. Each week features Saturday and Sunday sessions (1.5 hours each), ensuring a structured learning path that prepares you for national and international programming competitions."
                : "This specialized series focuses on developing essential soft skills that complement technical abilities. Learn to manage time effectively, lead teams successfully, and plan strategically - skills that are crucial for competitive programming success and professional career advancement. Additional sessions in this series will be announced soon."}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
              {seriesInfo.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Prominent Join Sessions Button */}
            {activeTab === "training" && (
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 bg-opacity-50 rounded-xl p-6 border border-blue-500 border-opacity-40 blue-glow-subtle">
                <h4 className="text-xl font-bold text-blue-300 mb-3">
                  Ready to Start Your Journey?
                </h4>
                <p className="text-gray-300 mb-6">
                  Join our comprehensive 12-week training series and master
                  competitive programming
                </p>
                <a
                  href="https://lu.ma/owts25tf"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all border border-blue-500 group blue-glow-subtle hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Join Session Series
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-blue-300 text-sm mt-4">
                  Register now to secure your spot and get all session details
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Session Registration Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-darkBlue-900 rounded-2xl border border-blue-500 border-opacity-30 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              {/* Header - blue theme */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-900 bg-opacity-70 flex items-center justify-center mr-4 blue-glow-subtle">
                      <span className="text-blue-400 font-bold text-lg">
                        {selectedSession.type === "training"
                          ? `W${selectedSession.id}`
                          : selectedSession.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {selectedSession.title}
                      </h3>
                      <p className="text-blue-300 text-sm mt-1">
                        {selectedSession.type === "training"
                          ? `Week ${selectedSession.id} of 12`
                          : "Competency Series"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-darkBlue-800 rounded-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Date Badge - blue theme */}
              <div className="flex items-center mb-6 bg-blue-900 bg-opacity-30 rounded-lg p-3 border border-blue-500 border-opacity-30">
                <Calendar className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-blue-300 font-medium">
                  {selectedSession.weekDates}
                </span>
              </div>

              {/* Topics covered (for training sessions) - blue theme */}
              {selectedSession.topics && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="text-sm bg-blue-900 bg-opacity-30 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills (for competency session) - blue theme */}
              {selectedSession.skills && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" />
                    Core Skills Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-sm bg-blue-900 bg-opacity-30 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  {selectedSession.type === "training" ? (
                    <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                  ) : (
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
                  )}
                  About This{" "}
                  {selectedSession.type === "training" ? "Week" : "Session"}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedSession.description}
                </p>
              </div>

              {/* Session Details */}
              <div className="bg-darkBlue-800 bg-opacity-50 rounded-xl p-5 mb-6 border border-blue-900 border-opacity-30">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  Session Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-400">Speaker:</span>
                    </div>
                    <span className="text-blue-300 font-medium bg-blue-900 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                      TBA
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-400">Schedule:</span>
                    </div>
                    <span className="text-blue-300 font-medium">
                      {selectedSession.weekDates}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-400">Time:</span>
                    </div>
                    <span className="text-blue-300 font-medium bg-blue-900 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                      1.5 hrs each day
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-400">Meeting Link:</span>
                    </div>
                    <span className="text-blue-300 font-medium bg-blue-900 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                      TBA
                    </span>
                  </div>
                </div>
              </div>

              {/* Join Sessions Button */}
              <div className="mb-6">
                <a
                  href="https://lu.ma/owts25tf"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center border border-blue-500 group blue-glow-subtle"
                >
                  <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Join Session Series
                </a>
                <p className="text-blue-300 text-sm text-center mt-2">
                  Click to register and get all session details
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 bg-opacity-30 rounded-xl p-5 border border-blue-500 border-opacity-30">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 text-blue-400 mr-2" />
                  <h4 className="text-blue-300 font-semibold">
                    Need More Information?
                  </h4>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Have questions about this{" "}
                  {selectedSession.type === "training" ? "week" : "session"}?
                  Contact our team for detailed information and updates.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:thamindusri@ieee.org"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group bg-darkBlue-800 bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70"
                  >
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm group-hover:underline">
                      thamindusri@ieee.org
                    </span>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="mailto:dineth@ieee.org"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group bg-darkBlue-800 bg-opacity-50 p-3 rounded-lg hover:bg-opacity-70"
                  >
                    <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm group-hover:underline">
                      dineth@ieee.org
                    </span>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles - only blue glow */}
      <style jsx>{`
        .blue-glow-subtle {
          box-shadow: 0 0 10px rgba(30, 58, 138, 0.3);
        }
      `}</style>
    </section>
  );
}
