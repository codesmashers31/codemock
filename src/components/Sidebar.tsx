import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const profile = {
  name: "User 1",
  avatar: "/media/avatars/myimages.jpg",
  role: "Software Developemnt",
  org: "Two95 International Staffing Se...",
  profilePercent: 72
};

const mockCategories = [
  { id: "it", name: "IT", icon: "💻", color: "bg-blue-100 text-blue-800" },
  { id: "hr", name: "HR", icon: "👥", color: "bg-pink-100 text-pink-800" },
  { id: "finance", name: "Finance", icon: "💰", color: "bg-green-100 text-green-800" },
  { id: "marketing", name: "Marketing", icon: "📊", color: "bg-purple-100 text-purple-800" },
  { id: "design", name: "Design", icon: "🎨", color: "bg-orange-100 text-orange-800" }
];

const mockData = {
  it: [
    { title: "Software Developer", count: 142, trend: "up", growth: "12%", icon: "👨‍💻" },
    { title: "Data Scientist", count: 87, trend: "up", growth: "8%", icon: "📊" },
    { title: "DevOps Engineer", count: 63, trend: "stable", growth: "2%", icon: "🔄" },
    { title: "Cloud Architect", count: 45, trend: "up", growth: "15%", icon: "☁️" }
  ],
  hr: [
    { title: "Talent Acquisition", count: 78, trend: "stable", growth: "3%", icon: "🔍" },
    { title: "HR Business Partner", count: 56, trend: "up", growth: "7%", icon: "🤝" },
    { title: "Compensation Analyst", count: 34, trend: "down", growth: "-5%", icon: "💰" },
    { title: "HR Operations", count: 29, trend: "stable", growth: "1%", icon: "⚙️" }
  ],
  finance: [
    { title: "Financial Analyst", count: 92, trend: "up", growth: "9%", icon: "📈" },
    { title: "Accountant", count: 67, trend: "stable", growth: "2%", icon: "🧮" },
    { title: "Auditor", count: 43, trend: "down", growth: "-3%", icon: "🔍" },
    { title: "Investment Banker", count: 38, trend: "up", growth: "11%", icon: "💹" }
  ],
  marketing: [
    { title: "Digital Marketer", count: 115, trend: "up", growth: "14%", icon: "📱" },
    { title: "Content Strategist", count: 72, trend: "stable", growth: "4%", icon: "✏️" },
    { title: "SEO Specialist", count: 58, trend: "up", growth: "8%", icon: "🔎" },
    { title: "Brand Manager", count: 41, trend: "down", growth: "-2%", icon: "🏷️" }
  ],
  design: [
    { title: "UX Designer", count: 96, trend: "up", growth: "10%", icon: "🎨" },
    { title: "UI Developer", count: 64, trend: "stable", growth: "3%", icon: "💻" },
    { title: "Product Designer", count: 52, trend: "up", growth: "12%", icon: "📦" },
    { title: "Graphic Designer", count: 47, trend: "stable", growth: "1%", icon: "✏️" }
  ]
};

const CircularProgress = ({ percentage, radius = 38, stroke = 4 }) => {
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
          className="text-gray-200"
        />
        <circle
          cx={radius + stroke / 2}
          cy={radius + stroke / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-blue-500 transition-all duration-700"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState("it");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mockItems, setMockItems] = useState(mockData.it);
  const [profileProgress, setProfileProgress] = useState(0);

  useEffect(() => {
    // Animate profile progress on component mount
    const timer = setTimeout(() => {
      setProfileProgress(profile.profilePercent);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(progress + 10);
        } else {
          setLoading(false);
          setMockItems(mockData[activeCategory]);
          setProgress(0);
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading, progress, activeCategory]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId !== activeCategory) {
      setLoading(true);
      setActiveCategory(categoryId);
      setProgress(0);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return "📈";
      case "down": return "📉";
      default: return "↔️";
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <aside className="w-full max-w-xs mx-auto mt-2">
      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg px-6 pt-7 pb-6 mb-7 flex flex-col items-center">
        {/* Avatar with circular completion gauge */}
        <div className="relative mb-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <CircularProgress percentage={profileProgress} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {profileProgress}%
          </span>
        </div>
        {/* Name and Info */}
        <div className="text-center">
          <div className="font-bold text-lg text-gray-800">{profile.name}</div>
          <div className="text-sm text-gray-600 font-medium">{profile.role}</div>
          <div className="text-xs text-gray-400 font-normal my-1">
            @ {profile.org}
          </div>
          <div className="text-xs text-gray-500 mb-2">Last updated today</div>
        </div>
        <Button className="w-full rounded-full font-semibold text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 mb-3 transition-all shadow-md hover:shadow-lg">
          Complete profile
        </Button>
        {/* Profile Performance */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl px-3 py-3 mb-2 border border-blue-100">
          <div className="font-bold text-[15px] text-blue-900 flex items-center justify-between mb-2">
            Profile performance
            <span className="text-gray-400 text-base cursor-pointer" title="More info">ⓘ</span>
          </div>
          <div className="flex items-center justify-between mb-2 text-blue-800">
            <div className="flex flex-col items-center flex-1">
              <div className="font-bold text-lg">8</div>
              <div className="text-xs text-gray-600 text-center">Search appearances</div>
            </div>
            <div className="h-6 border-l border-blue-200 mx-2" />
            <div className="flex flex-col items-center flex-1">
              <div className="font-bold text-lg">0</div>
              <div className="text-xs text-gray-600 text-center">Recruiter actions</div>
            </div>
          </div>
          <div className="mt-2 w-full">
            <div className="flex items-center gap-2 bg-white rounded-lg py-2 px-3 border border-blue-100 text-[13px] text-blue-700 font-medium cursor-pointer hover:bg-blue-100 transition-all shadow-sm hover:shadow">
              <span className="text-yellow-500">⚡</span>
              Get 3X boost to your profile performance
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;