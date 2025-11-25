import { useState } from "react";
import { Heart, Star, MapPin, Phone, Sparkles, Edit3, Zap } from "lucide-react";

const profile = {
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  role: "Software Developer",
  org: "Two95 International",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  badge: "Verified",
  profileCompletion: 72
};

const Sidebar = () => {
  const [liked, setLiked] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-xs mx-auto">
        
        {/* White Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          
          {/* Top section with pattern */}
          <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-8 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            {/* Avatar */}
            <div className="relative z-10 flex justify-center mb-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-3 border-white"></div>
              </div>
            </div>

            {/* Verification badge */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-white font-bold text-lg">{profile.name}</span>
              <Star size={16} className="text-yellow-300 fill-yellow-300" />
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 space-y-5">
            
            {/* Role and Org */}
            <div className="text-center">
              <p className="text-blue-600 font-semibold text-sm">{profile.role}</p>
              <p className="text-gray-500 text-xs mt-1">{profile.org}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Profile Completion */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 text-sm font-medium">Profile Updated</span>
                <span className="text-blue-600 font-bold text-sm">{profile.profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${profile.profileCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700 text-sm">
                <Phone size={16} className="text-blue-500 shrink-0" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 text-sm">
                <MapPin size={16} className="text-blue-500 shrink-0" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200"></div>

            {/* Like button */}
            <button
              onClick={() => setLiked(!liked)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition font-medium"
            >
              <Heart
                size={18}
                className={liked ? "fill-red-500 text-red-500" : ""}
              />
              <span>{liked ? "Liked" : "Like Profile"}</span>
            </button>

            {/* AI Edit Button */}
            <button
              onClick={() => setShowAiSuggestions(!showAiSuggestions)}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg transition font-medium"
            >
              <Sparkles size={18} />
              <span>AI Edit Profile</span>
            </button>

            {/* AI Suggestions */}
            {showAiSuggestions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Zap size={16} className="text-blue-600 mt-1 shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-800 font-medium">Add Work Experience</p>
                    <p className="text-gray-600 text-xs mt-1">Boost your profile by 15%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={16} className="text-blue-600 mt-1 shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-800 font-medium">Upload Portfolio</p>
                    <p className="text-gray-600 text-xs mt-1">Increase visibility by 10%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap size={16} className="text-blue-600 mt-1 shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-800 font-medium">Write Bio Summary</p>
                    <p className="text-gray-600 text-xs mt-1">Complete your profile</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm font-medium mt-3">
                  Apply AI Suggestions
                </button>
              </div>
            )}

            {/* Edit Profile button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium flex items-center justify-center gap-2">
              <Edit3 size={18} />
              Edit Profile
            </button>
          </div>

          {/* Footer */}
          <div className="bg-blue-50 px-6 py-4 text-center border-t border-blue-100">
            <p className="text-gray-600 text-xs">Member since 2020</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;