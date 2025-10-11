import React, { useState, useEffect } from "react";

const ChennaiInterviewHero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  // SEO Strong Content - Chennai focused
  const slidingTexts = [
    "interview coach",
    "IT career mentor", 
    "placement prep partner",
    "tech interview expert",
    "HR round specialist",
    "coding interview guide"
  ];

  // Multiple images for rotation
  const images = [
    "/media/img/6.jpg",
    "/media/img/3.jpg", 
    "/media/img/2.jpg",
    "/media/img/1.jpg",
  
  ];

  const stats = [
    { number: "2.5K+", label: "Students Placed" },
    { number: "94%", label: "Success Rate" },
    { number: "200+", label: "Chennai Companies" },
    { number: "4.9★", label: "Student Rating" }
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
    <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6 order-2 lg:order-1">
            
            {/* Main Heading with Sliding Text */}
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-blue-800">Trusted by Chennai Students</span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Meet your Life Changer here{" "}
                  <div className="h-12 sm:h-14 lg:h-16 overflow-hidden mt-1">
                    {slidingTexts.map((text, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index === currentText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
                        }`}
                      >
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md">
                  Roleplay mock interviews with AI & real HRs. Master Chennai company patterns for Zoho, Infosys, TCS and more.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-lg sm:text-xl font-bold text-blue-800">{stat.number}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-sm">Start Your Interview Prep</h3>
                  <p className="text-gray-600 text-xs mt-1">Get placed in top Chennai companies</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
                    Free Mock Interview
                  </button>
                  
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      {bookingCount.toLocaleString()}+ booked
                    </div>
                    <div className="text-xs text-orange-600 font-semibold">20% OFF first session</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Main Image with Transition */}
              <div className="relative rounded-xl shadow-xl border-4 border-white overflow-hidden">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Chennai Interview Coach"
                    className={`w-full h-56 sm:h-64 lg:h-72 object-cover transition-opacity duration-1000 ${
                      index === currentImage ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                    }`}
                  />
                ))}
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -top-2 -right-2 bg-white rounded-lg p-2 shadow-md border">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-900">Live Coach</span>
                </div>
              </div>
              
              <div className="absolute -bottom-2 -left-2 bg-blue-600 text-white rounded-lg px-2.5 py-1 shadow-md">
                <div className="text-xs font-semibold">Chennai Based</div>
              </div>

              {/* Floating Element - Success Rate */}
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white rounded-lg px-3 py-1.5 shadow-lg">
                <div className="text-xs font-bold">94% Success</div>
              </div>

              {/* Image Indicator Dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImage ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Chennai Specific */}
        <div className="mt-10 lg:mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
          {/* Floating elements in background */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/10 rounded-full"></div>
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3">Chennai's #1 Interview Preparation Platform</h2>
            <p className="text-blue-100 text-sm mb-4 max-w-2xl mx-auto leading-relaxed">
              Specifically designed for Chennai students and freshers. Get real interview questions from local companies and practice with AI that understands Chennai's job market.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold">50+</div>
                <div className="text-blue-200 text-xs mt-1">IT Companies in Chennai</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold">500+</div>
                <div className="text-blue-200 text-xs mt-1">Interview Questions</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-xl font-bold">24/7</div>
                <div className="text-blue-200 text-xs mt-1">AI Practice Available</div>
              </div>
            </div>

            {/* Floating CTA */}
            <div className="mt-4 flex justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Join 3284+ Successful Students
              </button>
            </div>
          </div>
        </div>

        {/* Additional Floating Elements */}
        {/* <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
            <div className="text-xs font-bold">🎯</div>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default ChennaiInterviewHero;