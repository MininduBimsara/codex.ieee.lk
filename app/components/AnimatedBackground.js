"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let connections = [];
    let mouse = { x: -1000, y: -1000 };
    let time = 0;

    // Resize canvas to fill window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse for subtle interactivity
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle class — tiny floating dots
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(t) {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle mouse repulsion
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += (dx / dist) * force * 0.5;
          this.y += (dy / dist) * force * 0.5;
        }

        // Wrap around edges
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;

        // Pulsing opacity
        this.currentOpacity =
          this.opacity *
          (0.6 + 0.4 * Math.sin(t * this.pulseSpeed + this.pulseOffset));
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.currentOpacity})`;
        ctx.fill();
      }
    }

    // Floating glow orb class — large blurred circles
    class GlowOrb {
      constructor(index, total) {
        this.index = index;
        // Distribute orbs across the screen
        this.baseX = (canvas.width * (index + 0.5)) / total;
        this.baseY = canvas.height * (0.3 + Math.random() * 0.4);
        this.radius = 120 + Math.random() * 180;
        this.color = index % 2 === 0
          ? { r: 14, g: 165, b: 233 } // sky-500
          : { r: 2, g: 132, b: 199 };  // sky-600
        this.opacity = 0.03 + Math.random() * 0.04;
        this.driftSpeed = 0.0003 + Math.random() * 0.0005;
        this.driftRadius = 60 + Math.random() * 80;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.001 + Math.random() * 0.002;
      }

      update(t) {
        this.x = this.baseX + Math.sin(t * this.driftSpeed + this.phaseX) * this.driftRadius;
        this.y = this.baseY + Math.cos(t * this.driftSpeed * 0.7 + this.phaseY) * this.driftRadius * 0.6;
        this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(t * this.pulseSpeed));
        this.currentRadius = this.radius * (0.9 + 0.1 * Math.sin(t * this.pulseSpeed * 1.3));
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.currentRadius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 1.5})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Determine particle count based on screen size
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 80;
    const orbCount = isMobile ? 2 : 4;
    const connectionDistance = isMobile ? 100 : 140;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Initialize glow orbs
    const orbs = [];
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new GlowOrb(i, orbCount));
    }

    // Draw connections between nearby particles
    const drawConnections = (ctx, particles, maxDist) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw glow orbs (behind everything)
      for (const orb of orbs) {
        orb.update(time);
        orb.draw(ctx);
      }

      // Update and draw particles
      for (const particle of particles) {
        particle.update(time);
        particle.draw(ctx);
      }

      // Draw constellation connections
      drawConnections(ctx, particles, connectionDistance);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize — reset orb positions
    const handleResize = () => {
      resize();
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].baseX = (canvas.width * (i + 0.5)) / orbs.length;
        orbs[i].baseY = canvas.height * (0.3 + Math.random() * 0.4);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Canvas for animated particles + orbs */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.7, mixBlendMode: "screen" }}
      />
      {/* Grain overlay for depth/texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: 0.4,
        }}
      />
    </>
  );
}
