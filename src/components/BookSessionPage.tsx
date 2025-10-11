import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Clock, BookOpen, Users, Award, 
  Calendar, CheckCircle, CreditCard, Shield, Video,
  ChevronLeft, ChevronRight, X, ThumbsUp, Zap,
  User, Settings2, Home, Search, MessageCircle, Briefcase
} from "lucide-react";
import Swal from "sweetalert2";


import Navigation from "@/components/Navigation";
import Footer from "./Footer";

const BookSessionPage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = location.state || {};
  
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showProfile, setShowProfile] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer",
      rating: 5,
      comment: "Exceptional feedback that helped me land my dream job. The technical questions were spot-on.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager",
      rating: 5,
      comment: "The mock interview was incredibly realistic. Great insights on communication skills.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "UX Designer",
      rating: 4,
      comment: "Very professional session. The feedback was detailed and actionable.",
      date: "2 weeks ago"
    }
  ];

  // Dates for next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Time slots
  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "01:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:30 PM", available: true },
    { time: "06:00 PM", available: false },
    { time: "07:30 PM", available: true },
  ];

  // const handleBooking = () => {
  //   if (selectedSlot) {
  //     alert(`Session booked with ${profile.name} on ${dates[selectedDate].toDateString()} at ${selectedSlot.time}`);
  //     navigate('/confirmation');
  //   }
  // };

  // Category colors
  const getCategoryColor = (section) => {
    const colors = {
      "IT": "text-blue-700 bg-blue-100",
      "HR": "text-purple-700 bg-purple-100", 
      "Business": "text-amber-700 bg-amber-100"
    };
    return colors[section] || "text-gray-700 bg-gray-100";
  };

  // Booking Banner Component
  const BookingBanner = () => (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=80')" }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/80" />
      
      <div className="relative z-10 px-6 py-8 md:px-12 md:py-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-semibold">LIMITED SPOTS AVAILABLE</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Master Your Next <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Interview</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed">
            Get personalized coaching from industry experts. Boost your confidence with realistic mock interviews and detailed feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Session Now
            </button>
            
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-medium text-white backdrop-blur-sm transition-all duration-200 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              View Testimonials
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Promo Banner Component
const PromoBanner = () => (
  <div className="relative mb-8">
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-5">
        {/* Left content */}
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            Unlock Your First Mock Interview 🚀
          </h3>
          <p className="text-sm text-gray-600">
            Get <span className="font-medium text-blue-600">20% OFF</span> your first session with top industry experts.
          </p>
        </div>

        {/* Right action button */}
        <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
          Claim Offer
        </button>
      </div>
    </div>
  </div>
);





  // Booking Sidebar Component
  const BookingSidebar = () => (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Select Date & Time
        </h3>
        
        {/* Date Scroll */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-4">
          {dates.map((date, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`flex flex-col items-center py-3 px-4 rounded-xl min-w-[100px] transition-all ${
                selectedDate === index
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="font-semibold text-sm">
                {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-xs mt-1">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              disabled={!slot.available}
              onClick={() => setSelectedSlot(slot)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                slot.available
                  ? selectedSlot?.time === slot.time
                    ? "border-blue-500 bg-blue-50 shadow-md transform scale-105"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            >
              <div className="font-semibold">{slot.time}</div>
              <div className={`text-xs mt-1 ${slot.available ? 'text-green-600' : 'text-red-500'}`}>
                {slot.available ? "✓ Available" : "✗ Booked"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>
        
        {selectedSlot ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Expert</span>
              <span className="font-semibold">{profile.name}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-right">
                {dates[selectedDate].toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}<br/>
                at {selectedSlot.time}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">60 minutes</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Session Type</span>
              <span className="font-semibold">{profile.category} Mock Interview</span>
            </div>
            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-blue-700">{profile.price}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-blue-200" />
            <p>Please select a time slot to continue</p>
          </div>
        )}

   <button
  onClick={() => setShowPayment(true)}   // ✅ open payment modal
  disabled={!selectedSlot}
  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all mt-6 flex items-center justify-center gap-2 ${
    selectedSlot
      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105"
      : "bg-gray-300 cursor-not-allowed"
  }`}
>
  <CreditCard className="w-5 h-5" />
  {selectedSlot ? "Proceed to Payment" : "Select Time Slot"}
</button>


        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
          <Shield className="w-3 h-3 text-green-500" />
          <span>Secure payment • 24-hour cancellation policy</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <h4 className="font-semibold text-gray-800 mb-3">Why Choose Us?</h4>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-600">98% Success Rate</span>
          </div>
          <div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-gray-600">500+ Experts</span>
          </div>
          <div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-600">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation for Mobile
  const BottomNav = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
      <div className="grid grid-cols-4 py-3">
        <button className="flex flex-col items-center text-blue-600" onClick={() => navigate('/')}>
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center text-gray-600" onClick={() => setShowProfile(true)}>
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <Settings2 size={20} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
      
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
          <div className="w-full bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your Profile</h3>
              <button onClick={() => setShowProfile(false)} className="p-2">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold text-lg">John Doe</h4>
                  <p className="text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-blue-700">5</span>
                  <span className="text-sm text-gray-600">Sessions</span>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <span className="block text-2xl font-bold text-green-700">4.8</span>
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Edit Profile Settings
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 lg:pb-0">
      <Navigation />
      
      {/* Mobile Booking FAB */}
      <div className="lg:hidden fixed bottom-20 right-4 z-10">
        <button 
          onClick={() => setShowMobileBooking(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Calendar size={24} />
        </button>
      </div>

      {/* Mobile Booking Sheet */}
      {showMobileBooking && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-3xl">
              <h3 className="text-xl font-bold text-gray-800">Book Your Session</h3>
              <button onClick={() => setShowMobileBooking(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <BookingSidebar />
            </div>
          </div>
        </div>
      )}

      {showPayment && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Dummy Payment Gateway
          </h3>
          <p className="text-gray-600 mb-6">
            Pay <span className="font-semibold text-blue-600">{profile.price}</span> to confirm your booking.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowPayment(false);
                Swal.fire({
                  title: "Payment Successful 🎉",
                  text: "Your session has been booked successfully!",
                  icon: "success",
                  confirmButtonColor: "#2563eb",
                }).then(() => navigate("/my-sessions"));
              }}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Pay Now
            </button>

            <button
              onClick={() => {
                setShowPayment(false);
                Swal.fire({
                  title: "Payment Cancelled",
                  text: "You cancelled the payment. Slot not booked.",
                  icon: "info",
                  confirmButtonColor: "#2563eb",
                });
              }}
              className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <PromoBanner />
            
            {/* Coach Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
  <div className="flex items-start gap-6">
    {/* Profile Image with Status */}
    <div className="relative flex-shrink-0">
      <div className="relative">
        <img
          src={profile.logo}
          alt={profile.name}
          className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
        />
        <div className="absolute -bottom-2 -right-2 bg-green-500 border-2 border-white w-5 h-5 rounded-full"></div>
      </div>
      <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-sm">
        PRO
      </div>
    </div>

    {/* Profile Information */}
    <div className="flex-1 min-w-0">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">{profile.name}</h1>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
              <span className="text-sm font-medium text-gray-900">{profile.rating}</span>
              <span className="text-sm text-gray-500">({profile.reviews})</span>
            </div>
          </div>
          <p className="text-lg text-gray-700 font-medium">{profile.role}</p>
        </div>
        <span className={`px-3 py-1 rounded-full ${getCategoryColor(profile.category)} text-sm font-medium`}>
          {profile.category}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{profile.openings}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Available Slots</div>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="text-2xl font-bold text-gray-900">98%</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">24h</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Response</div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>{profile.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span>500+ sessions</span>
        </div>
      </div>

      {/* Expertise */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Details & Reviews Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 px-6 py-4 font-semibold border-b-2 transition-all ${
                      activeTab === "details"
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Session Details
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 px-6 py-4 font-semibold border-b-2 transition-all ${
                      activeTab === "reviews"
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Reviews & Ratings ({reviews.length})
                  </button>
                </div>
              </div>

              <div className="p-8">
                {activeTab === "details" ? (
                  <div className="space-y-8">
                    {/* Session Overview */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-600" />
                        Mock Interview Session Overview
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">60 Minutes</div>
                            <div className="text-sm text-gray-600">Session Duration</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Video className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">Video Call</div>
                            <div className="text-sm text-gray-600">Session Format</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">Personalized</div>
                            <div className="text-sm text-gray-600">Tailored Questions</div>
                          </div>
                        </div>
                      </div>

                      {/* Session Process */}
                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-gray-800">Session Structure</h4>
                        {[
                          {
                            step: "1",
                            title: "Introduction & Goal Setting",
                            description: "Discuss your background, target role, and specific areas you want to focus on during the session."
                          },
                          {
                            step: "2",
                            title: "Technical/Behavioral Questions",
                            description: "Industry-relevant questions tailored to your experience level and target position."
                          },
                          {
                            step: "3",
                            title: "Real-world Scenario",
                            description: "Practical problem-solving exercise to demonstrate your skills and approach."
                          },
                          {
                            step: "4",
                            title: "Detailed Feedback Session",
                            description: "Comprehensive analysis of your performance with actionable improvement suggestions."
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {item.step}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-2">{item.title}</h5>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-6">What You'll Receive</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Detailed performance assessment report",
                          "Personalized improvement plan",
                          "Session recording with timestamped feedback",
                          "Industry-specific interview questions",
                          "Communication skills evaluation",
                          "Follow-up resources and preparation materials"
                        ].map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Rating Summary */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                          <div className="text-5xl font-bold text-gray-800 mb-2">{profile.rating}</div>
                          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.floor(profile.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <div className="text-gray-600">Based on {profile.reviews} reviews</div>
                        </div>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-4">{star}</span>
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full" 
                                  style={{ width: `${(star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 2 : 0)}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                                  <p className="text-gray-600 text-sm">{review.role}</p>
                                </div>
                                <span className="text-sm text-gray-500 mt-1 sm:mt-0">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                              <div className="flex items-center gap-4 mt-4">
                                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                  <ThumbsUp className="w-4 h-4" />
                                  Helpful
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Section */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <BookingSidebar />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
    <Footer />
    </>
  );
};

export default BookSessionPage;