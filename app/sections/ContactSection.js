import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import ParallaxEffect from '@/app/components/ParallaxEffect';
import GlassCard from '@/app/components/GlassCard';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [particles, setParticles] = useState([]);
  
  // Intersection Observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }
    
    return () => observer.disconnect();
  }, []);

  // Generate random particles on client side to prevent hydration errors
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map(() => ({
      width: `${2 + Math.random() * 5}px`,
      height: `${2 + Math.random() * 5}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.1 + Math.random() * 0.3,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }));
    setParticles(newParticles);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with simple mailto
  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link
      const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from IEEE CodeX Sri Lanka Contact Form`
      );
      
      const mailtoLink = `mailto:thamindusri@ieee.org?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Show success message after a short delay
      setTimeout(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error opening email client:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  // Reset status after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <section id="contact" className="py-24 bg-gradient-to-r from-darkBlue-900 via-blue-900 to-darkBlue-800 text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-darkBlue-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-darkBlue-900 to-transparent"></div>
      
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <div 
            key={index}
            className="absolute rounded-full animate-pulse"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              opacity: particle.opacity,
              backgroundColor: '#3b82f6',
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full border border-blue-500 border-opacity-30 mb-4 inline-block">CONNECT</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 blue-glow-text">Get In Touch</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 mb-12">
            Click send to open your email client and send message to thamindusri@ieee.org
          </p>
          
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ParallaxEffect speed={0.03} direction="vertical">
              <GlassCard className="p-8 md:p-12 rounded-2xl bg-opacity-80 backdrop-blur-lg max-w-3xl mx-auto">
                <div className="space-y-6">
                  {/* Status Messages */}
                  {submitStatus && (
                    <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                      submitStatus === 'success' 
                        ? 'bg-green-900 bg-opacity-30 border border-green-500 border-opacity-30 text-green-300' 
                        : 'bg-red-900 bg-opacity-30 border border-red-500 border-opacity-30 text-red-300'
                    }`}>
                      {submitStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Message sent successfully! We'll get back to you soon.</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          <span>Failed to send message. Please try again.</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-300 text-left">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-darkBlue-800 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-300 text-left">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 bg-darkBlue-800 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Field - Now a text input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-blue-300 text-left">
                      Subject *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-darkBlue-800 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter the subject of your message"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-blue-300 text-left">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full pl-11 pr-4 py-3 bg-darkBlue-800 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto group ${
                        isSubmitting 
                          ? 'opacity-70 cursor-not-allowed' 
                          : 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </ParallaxEffect>
          </div>
        </div>
      </div>
    </section>
  );
}