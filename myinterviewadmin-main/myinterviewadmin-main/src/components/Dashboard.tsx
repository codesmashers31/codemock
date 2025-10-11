import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import InterviewsManager from './InterviewsManager';
import CategoriesManager from './CategoriesManager';
import HRManager from './HRManager';
import ExpertsManager from './ExpertsManager';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'interviews':
        return <InterviewsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'hrs':
        return <HRManager />;
      case 'experts':
        return <ExpertsManager />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="lg:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


import  { useRef, useState } from "react";
import { Briefcase, MapPin, Clock, Star, ChevronLeft, ChevronRight, BookOpen, Users, Zap, Award } from "lucide-react";
import { useNavigate } from 'react-router-dom';
// ---- Helper for section backgrounds ----
function getSectionBg(section) {
  if (section === "IT") return "bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100";
  if (section === "HR") return "bg-gradient-to-r from-pink-50 via-purple-50 to-pink-100";
  if (section === "Business") return "bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-100";
  return "bg-gray-50";
}

// ---- Helper for category colors ----
function getCategoryColor(section) {
  if (section === "IT") return "text-blue-700 bg-blue-100";
  if (section === "HR") return "text-purple-700 bg-purple-100";
  if (section === "Business") return "text-amber-700 bg-amber-100";
  return "text-gray-700 bg-gray-100";
}





// ---- DATA ----
const profiles = [
  {
    name: "Sarah Johnson",
    role: "Senior HR Manager",
    experience: "8+ years",
    skills: ["Technical Hiring", "Behavioral Analysis", "Leadership"],
    rating: 4.8,
    price: "₹299/session",
    type: "hr",
    category: "HR",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "3 days ago",
    location: "Remote",
    officeLocation: "Bengaluru",
    openings: 8,
    applicants: 30,
    reviews: 290
  },
  {
    name: "Rajesh Kumar",
    role: "Full Stack Developer",
    experience: "6+ years",
    skills: ["React", "Node.js", "System Design"],
    rating: 4.9,
    price: "₹399/session",
    type: "mentor",
    category: "IT",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "5 days ago",
    location: "Remote",
    officeLocation: "Hyderabad",
    openings: 5,
    applicants: 35,
    reviews: 180
  },
  {
    name: "Priya Sharma",
    role: "Tech Recruiter",
    experience: "5+ years",
    skills: ["Frontend", "Backend", "DevOps"],
    rating: 4.7,
    price: "₹249/session",
    type: "hr",
    category: "HR",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "2 days ago",
    location: "Remote",
    officeLocation: "Pune",
    openings: 12,
    applicants: 70,
    reviews: 220
  },
  {
    name: "Vikram Singh",
    role: "Business Consultant",
    experience: "9+ years",
    skills: ["Strategy", "Business Analysis", "Operation Management"],
    rating: 4.6,
    price: "₹399/session",
    type: "business",
    category: "Business",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "4 days ago",
    location: "Remote",
    officeLocation: "Mumbai",
    openings: 4,
    applicants: 21,
    reviews: 120
  },
  {
    name: "Alok Mehta",
    role: "Cloud Engineer",
    experience: "7+ years",
    skills: ["AWS", "Azure", "GCP", "DevOps"],
    rating: 4.8,
    price: "₹449/session",
    type: "mentor",
    category: "IT",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "1 day ago",
    location: "Remote",
    officeLocation: "Delhi",
    openings: 10,
    applicants: 55,
    reviews: 190
  },
  {
    name: "Simran Dhawan",
    role: "Business Analyst",
    experience: "5+ years",
    skills: ["Finance", "Reporting", "Excel", "Extremely Long Skill For Clamp"],
    rating: 4.5,
    price: "₹299/session",
    type: "business",
    category: "Business",
    company: "Mock-in",
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    postedAgo: "6 days ago",
    location: "Remote",
    officeLocation: "Chennai",
    openings: 6,
    applicants: 32,
    reviews: 95
  }
];

function getCards(category) {
  const filtered = profiles.filter((p) => p.category === category);
  
  // Mock subject descriptions based on category
  const mockSubjects = {
    IT: [
      "System design interviews with real-world scenarios",
      "Coding practice with optimal solutions discussion",
      "Cloud architecture: AWS/Azure deployment strategies",
      "Full-stack development: React + Node.js implementation"
    ],
    HR: [
      "Behavioral interviews with situational questions",
      "Leadership and conflict resolution scenarios",
      "Company culture and values alignment",
      "Technical candidate assessment practice"
    ],
    Business: [
      "Case studies and business problem solving",
      "Strategy development and presentation skills",
      "Stakeholder management and negotiation",
      "Business analysis and reporting techniques"
    ]
  };

  return filtered.map((profile, idx) => {
    // Select a random mock subject from the category
    const randomSubject = mockSubjects[category][Math.floor(Math.random() * mockSubjects[category].length)];
    
    const navigate = useNavigate();
    function handleBookClick(profile: { name: string; role: string; experience: string; skills: string[]; rating: number; price: string; type: string; category: string; company: string; logo: string; postedAgo: string; location: string; officeLocation: string; openings: number; applicants: number; reviews: number; }): void {
      navigate(`/book-session/${profile.name.replace(/\s+/g, "-").toLowerCase()}`, {
      state: { profile }
      });
    }

    return (
      <div
        key={idx}
        className="rounded-xl border border-gray-200 bg-white shadow-lg flex flex-col w-[360px] h-[320px] px-5 py-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
      >
        {/* Profile Header - Compact */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <img 
              src={profile.logo} 
              alt={profile.company} 
              className="w-12 h-12 rounded-xl border-2 border-white shadow-md object-cover shrink-0" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-gray-900 truncate max-w-[100px] text-sm">{profile.name}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{profile.experience}</span>
              <span className="text-yellow-500 text-xs flex items-center gap-1 font-medium">
                <Star size={12} fill="currentColor" /> {profile.rating}
                <span className="text-gray-400 ml-1">({profile.reviews})</span>
              </span>
            </div>
            <div className="text-xs text-gray-700 font-medium mb-1">{profile.role}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Briefcase className="w-3 h-3 text-gray-500 shrink-0" />
              <span className="truncate">{profile.skills.slice(0, 2).join(", ")}{profile.skills.length > 2 ? "..." : ""}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
        
        {/* Mock Focus Section - Compact */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="text-xs font-bold text-blue-700 mb-1 uppercase tracking-wide flex items-center gap-1">
            <Award size={12} />
            MOCK FOCUS:
          </div>
          <div className="text-xs text-gray-800 leading-tight mb-1 line-clamp-2 font-medium h-8">
            {randomSubject}
          </div>
          <div className="text-xs text-gray-600 mb-2 italic">
            Get expert feedback from industry professionals
          </div>
          
          <div className="flex justify-between items-center bg-blue-50 rounded-lg px-2 py-1.5">
            <div className="flex items-center text-xs text-blue-700 font-semibold">
              <Users size={10} className="mr-1 shrink-0" />
              <span>{profile.openings} slots left</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Clock size={10} className="mr-1 shrink-0" />
              <span>60 min</span>
            </div>
          </div>
        </div>
        
        {/* Footer Section - Compact */}
        <div className="flex items-center justify-between gap-2 pt-3 mt-auto">
          <div className="flex flex-col gap-0.5">
            <div className="text-xs text-gray-600 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
              <span>{profile.officeLocation}</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400 shrink-0" />
              <span>{profile.postedAgo}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-base text-blue-700">
              {profile.price}
            </span>
            <button
              onClick={() => handleBookClick(profile)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-xs shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-1"
            >
              <BookOpen size={12} />
              Book Mock
            </button>
          </div>
        </div>
      </div>
    );
  });
}

// CarouselSlider component
const CarouselSlider = ({ title, cards }) => {

  
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

    function handleBookClick(profile: any) {
    navigate(`/book-session/${profile.name.replace(/\s+/g, "-").toLowerCase()}`, {
      state: { profile }
    });
  }

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      
      setTimeout(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="font-bold text-2xl text-gray-800 tracking-tight flex items-center gap-2">
          <span className={`p-2 rounded-lg ${getCategoryColor(title.split(" ")[0])}`}>
            {title.split(" ")[0] === "IT" && <BookOpen size={20} />}
            {title.split(" ")[0] === "HR" && <Users size={20} />}
            {title.split(" ")[0] === "Business" && <Briefcase size={20} />}
          </span>
          <span>{title}</span>
        </h2>
        <div className="flex gap-2">
          {showLeftArrow && (
            <button
              onClick={() => scrollBy(-360)}
              className="p-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition shadow-sm hover:scale-110"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scrollBy(360)}
              className="p-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition shadow-sm hover:scale-110"
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
        onScroll={handleScroll}
      >
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 scroll-snap-align-start"
          >
            {c}
          </div>
        ))}
      </div>
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
};

// ---- HomePage ----
export default function CarouselPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f4f6fa] to-[#f8fafc] px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Find Your Perfect Mock Interview Coach
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Practice with industry experts from top companies and ace your next interview
          </p>
        </div> */}

        {/* Category Sections */}
        <div className={`rounded-2xl mb-12 px-4 py-8 md:px-8 shadow-inner ${getSectionBg("IT")}`}>
          <CarouselSlider title="IT Mock Sessions" cards={getCards("IT")} />
        </div>
        <div className={`rounded-2xl mb-12 px-4 py-8 md:px-8 shadow-inner ${getSectionBg("HR")}`}>
          <CarouselSlider title="HR Mock Sessions" cards={getCards("HR")} />
        </div>
        <div className={`rounded-2xl mb-12 px-4 py-8 md:px-8 shadow-inner ${getSectionBg("Business")}`}>
          <CarouselSlider title="Business Mock Sessions" cards={getCards("Business")} />
        </div>
      </div>
    </div>
  );
}

// here i have the datas in not dynamic i want to doing this datas into my 
// mongodb 
// i want that 
// move to data base 
// i want the admin panel now i want modle and 
// backend code i give you the form 
// change that form for that what i am aksing can you startr the proces 
