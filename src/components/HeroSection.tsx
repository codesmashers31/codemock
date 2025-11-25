import { useState, useEffect } from "react";
import { 
  Star, Users, TrendingUp, Award, 
  CheckCircle, ArrowRight, Sparkles, Target
} from "lucide-react";

export default function ModernHeroBanner() {
  const [currentText, setCurrentText] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  const slidingTexts = [
    "Interview Coach",
    "Career Mentor", 
    "Placement Partner",
    "Tech Expert",
    "HR Specialist"
  ];

  const images = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop", 
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop"
  ];

  const stats = [
    { icon: Users, number: "2.5K+", label: "Students Placed", color: "blue" },
    { icon: TrendingUp, number: "94%", label: "Success Rate", color: "green" },
    { icon: Award, number: "200+", label: "Companies", color: "purple" },
    { icon: Star, number: "4.9", label: "Rating", color: "yellow" }
  ];

  const features = [
    "Real HR interview practice",
    "AI-powered feedback",
    "Company-specific prep",
    "24/7 availability"
  ];

  // Sliding text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % slidingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Booking counter
  useEffect(() => {
    const endCount = 3284;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil((endCount - current) / 20);
      if (current >= endCount) {
        setBookingCount(endCount);
        clearInterval(interval);
      } else {
        setBookingCount(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">Trusted by 3,000+ Students</span>
              <div className="flex -space-x-1">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                ))}
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Meet Your</span>
                <br />
                <div className="relative inline-block h-16 sm:h-20 overflow-hidden">
                  {slidingTexts.map((text, index) => (
                    <span
                      key={index}
                      className={`absolute left-0 transition-all duration-500 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${
                        index === currentText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Master interviews with AI & real HRs. Practice for top companies like Zoho, Infosys, TCS and get placed faster.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                Start Free Mock Interview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">{bookingCount.toLocaleString()}+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative lg:block">
            <div className="relative">
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Interview Coach"
                    className={`w-full h-[500px] object-cover transition-opacity duration-1000 ${
                      index === currentImage ? "opacity-100" : "opacity-0 absolute inset-0"
                    }`}
                  />
                ))}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">94%</div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100 animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2.5K+</div>
                    <div className="text-xs text-gray-600">Placed</div>
                  </div>
                </div>
              </div>

              {/* Live Indicator */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-900">Live Sessions</span>
              </div>

              {/* Image Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              purple: "bg-purple-50 text-purple-600",
              yellow: "bg-yellow-50 text-yellow-600"
            };
            
            return (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color]} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Chennai's #1 Interview Prep Platform
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Join thousands of successful candidates who landed their dream jobs
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                Get Started - It's Free
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">No credit card required</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200">IT Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200">AI Available</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}