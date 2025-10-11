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
  className="rounded-xl border border-gray-200 bg-white shadow-lg w-[400px] px-6 py-5 transition-all duration-300 hover:shadow-xl hover:border-blue-200 group"
>
  {/* Profile Header */}
  <div className="flex items-start gap-4 mb-4">
    <div className="relative flex-shrink-0">
      <img 
        src={profile.logo} 
        alt={profile.company} 
        className="w-14 h-14 rounded-lg border-2 border-white shadow-md object-cover transition-all duration-300 group-hover:shadow-lg" 
      />
      {/* Verified Badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-gray-900 text-lg truncate">{profile.name}</span>
        <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full font-semibold whitespace-nowrap">
          {profile.experience}
        </span>
      </div>
      
      <div className="text-sm text-gray-700 font-semibold mb-3">{profile.role}</div>
      
      {/* Skills - Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {profile.skills.map((skill, skillIdx) => (
          <span 
            key={skillIdx} 
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 border border-gray-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Rating & Location */}
  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 text-blue-500" />
      <span className="text-sm font-medium text-gray-700">{profile.location}</span>
    </div>
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 text-yellow-500 fill-current" />
      <span className="text-sm font-semibold text-gray-900">{profile.rating}</span>
      <span className="text-xs text-gray-500">({profile.reviews})</span>
    </div>
  </div>
  
  {/* Mock Focus Section */}
  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">Mock Focus</span>
    </div>
    <div className="text-sm text-gray-800 font-semibold mb-2 leading-relaxed">
      {randomSubject}
    </div>
    <div className="text-xs text-gray-600">
      Expert feedback from industry professionals
    </div>
  </div>
  
  {/* Availability & Session */}
  <div className="grid grid-cols-2 gap-3 mb-4">
    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
      <Users className="w-4 h-4 text-green-600" />
      <div>
        <div className="text-sm font-semibold text-green-700">{profile.openings}</div>
        <div className="text-xs text-green-600">slots left</div>
      </div>
    </div>
    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <Clock className="w-4 h-4 text-purple-600" />
      <div>
        <div className="text-sm font-semibold text-purple-700">60 min</div>
        <div className="text-xs text-purple-600">session</div>
      </div>
    </div>
  </div>
  
  {/* Footer Section */}
  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
    <div className="flex flex-col">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="font-medium">{profile.officeLocation}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4 text-gray-400" />
        <span>{profile.postedAgo}</span>
      </div>
    </div>
    
    <div className="flex flex-col items-end gap-2">
      <span className="font-bold text-xl text-blue-700">
        {profile.price}
      </span>
      <button
        onClick={() => handleBookClick(profile)}
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap"
      >
        <BookOpen className="w-4 h-4" />
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