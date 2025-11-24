import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const profile = {
  name: "User 1",
  avatar: "/media/avatars/myimages.jpg",
  role: "Software Developer",
  org: "Two95 International Staffing Se...",
  profilePercent: 72
};

type CircularProgressProps = {
  percentage: number;
  radius?: number;
  stroke?: number;
};

const CircularProgress = ({ percentage, radius = 42, stroke = 4 }: CircularProgressProps) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={radius * 2 + stroke} height={radius * 2 + stroke}>
        <circle
          cx={radius + stroke / 2}
          cy={radius + stroke / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-gray-100"
        />
        <circle
          cx={radius + stroke / 2}
          cy={radius + stroke / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-blue-500 drop-shadow-sm"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <span className="absolute text-blue-700 font-bold text-base">{percentage}%</span>
    </div>
  );
};

const Sidebar = () => {
  const [profileProgress, setProfileProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileProgress(profile.profilePercent);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="w-full max-w-xs mx-auto mt-3">
      {/* Enhanced Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl px-6 pt-10 pb-8 mb-7 flex flex-col items-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full opacity-60"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-50 rounded-full opacity-60"></div>

        {/* Avatar with Progress Circle */}
        <div className="relative mb-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <CircularProgress percentage={profileProgress} radius={46} stroke={5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg border-2 border-white min-w-[60px] text-center">
            {profileProgress}%
          </span>
        </div>

        {/* Name & Info */}
        <div className="text-center space-y-2 mb-6 relative z-10">
          <div className="font-bold text-2xl text-gray-800 tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {profile.name}
          </div>
          <div className="text-blue-600 font-semibold text-lg bg-blue-50 px-3 py-1 rounded-full inline-block">
            {profile.role}
          </div>
          <div className="text-xs text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100">
            @{profile.org}
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <Button className="w-full rounded-xl font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 mb-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] py-3 relative z-10">
          <span className="drop-shadow-sm">Complete your profile</span>
        </Button>

        {/* Enhanced Performance Card */}
        <div className="w-full bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl px-5 py-4 mb-1 border border-blue-100/50 shadow-lg backdrop-blur-sm relative z-10">
          <div className="font-bold text-[15px] text-blue-900 flex items-center justify-between mb-3">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Performance Metrics
            </span>
            <span className="text-gray-400 text-base cursor-pointer hover:text-blue-500 transition-colors" title="More info">ⓘ</span>
          </div>
          
          <div className="flex items-center justify-between mb-3 text-blue-800">
            <div className="flex flex-col items-center flex-1">
              <span className="font-bold text-xl text-gray-800">8</span>
              <div className="text-xs text-gray-500 mt-1">Search appearances</div>
            </div>
            <div className="h-8 border-l border-blue-200 mx-2" />
            <div className="flex flex-col items-center flex-1">
              <span className="font-bold text-xl text-gray-800">0</span>
              <div className="text-xs text-gray-500 mt-1">Recruiter actions</div>
            </div>
          </div>

          <div className="mt-3 w-full cursor-pointer group">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl py-3 px-4 border border-blue-100 text-[14px] text-blue-700 font-semibold hover:bg-white hover:shadow-md transition-all duration-300 group-hover:scale-[1.02] shadow-sm">
              <span className="text-yellow-500 text-lg drop-shadow-sm">⚡</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Get 3X boost to your profile performance
              </span>
            </div>
          </div>
        </div>

        {/* Additional decorative element */}
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-200 rounded-full opacity-40"></div>
      </div>
    </aside>
  );
};

export default Sidebar;