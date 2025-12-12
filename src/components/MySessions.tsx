import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Video, 
  User, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  X,
  MoreVertical
} from "lucide-react";
import Navigation from "./Navigation";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

type Session = {
  id: number;
  expert: string;
  role: string;
  company: string;
  category: string;
  location: string;
  date: string;
  time: string;
  price: string;
  status: "Upcoming" | "Confirmed" | "Completed" | "upcoming" | "confirmed" | "completed";
  meetLink: string;
  rating: number;
  reviews: number;
  duration: string;
  expertise: string[];
  avatarColor: string;
};

const MySessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sessionsPerPage] = useState<number>(6);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // 1. Define Static Dummy Data (The "Booked Experts")
    const dummySessions: Session[] = [
      {
        id: 101, // Changed IDs to avoid conflict with backend test ID (if any)
        expert: "Rajesh Kumar",
        role: "Senior Software Engineer",
        company: "Google",
        category: "IT",
        location: "Chennai, India",
        date: "2025-10-01",
        time: "10:30 AM",
        price: "₹999",
        status: "Confirmed",
        meetLink: "https://meet.google.com/xyz-1234",
        rating: 4.8,
        reviews: 127,
        duration: "60 minutes",
        expertise: ["React", "Node.js", "System Design"],
        avatarColor: "from-blue-500 to-blue-600"
      },
      {
        id: 102,
        expert: "Anitha R",
        role: "HR Specialist",
        company: "Microsoft",
        category: "HR",
        location: "Bangalore, India",
        date: "2025-10-05",
        time: "3:00 PM",
        price: "₹799",
        status: "Upcoming",
        meetLink: "https://meet.google.com/abc-5678",
        rating: 4.9,
        reviews: 89,
        duration: "45 minutes",
        expertise: ["Interview Prep", "Career Growth", "Resume"],
        avatarColor: "from-purple-500 to-purple-600"
      },
      {
        id: 103,
        expert: "Mike Johnson",
        role: "Product Manager",
        company: "Amazon",
        category: "Product",
        location: "Remote",
        date: "2025-10-08",
        time: "11:00 AM",
        price: "₹1299",
        status: "Completed",
        meetLink: "https://meet.google.com/def-9012",
        rating: 4.7,
        reviews: 203,
        duration: "60 minutes",
        expertise: ["Product Strategy", "UX", "Roadmapping"],
        avatarColor: "from-gray-600 to-gray-700"
      },
      {
        id: 104,
        expert: "Sarah Chen",
        role: "Data Scientist",
        company: "Meta",
        category: "Data Science",
        location: "Hyderabad, India",
        date: "2025-10-12",
        time: "2:00 PM",
        price: "₹1499",
        status: "Confirmed",
        meetLink: "https://meet.google.com/ghi-3456",
        rating: 4.9,
        reviews: 156,
        duration: "60 minutes",
        expertise: ["Machine Learning", "Python", "AI"],
        avatarColor: "from-green-500 to-green-600"
      },
      {
        id: 105,
        expert: "David Wilson",
        role: "Frontend Architect",
        company: "Netflix",
        category: "IT",
        location: "Remote",
        date: "2025-10-15",
        time: "4:30 PM",
        price: "₹1799",
        status: "Upcoming",
        meetLink: "https://meet.google.com/jkl-7890",
        rating: 4.8,
        reviews: 98,
        duration: "60 minutes",
        expertise: ["React", "TypeScript", "Performance"],
        avatarColor: "from-red-500 to-red-600"
      },
      {
        id: 106,
        expert: "Priya Sharma",
        role: "Career Coach",
        company: "Self Employed",
        category: "Career",
        location: "Delhi, India",
        date: "2025-10-18",
        time: "1:00 PM",
        price: "₹899",
        status: "Confirmed",
        meetLink: "https://meet.google.com/mno-2345",
        rating: 4.6,
        reviews: 67,
        duration: "45 minutes",
        expertise: ["Career Transition", "Leadership", "Soft Skills"],
        avatarColor: "from-indigo-500 to-indigo-600"
      }
    ];

    // 2. Fetch Dynamic Test Data & Merge
    const fetchSessions = async () => {
        try {
            // Restricted Candidate ID
            const candidateId = user?.id || "";
            const res = await fetch(`http://localhost:3000/api/sessions/user/${candidateId}/role/candidate`);
            const data = await res.json();
            
            let allSessions = [...dummySessions];

            if (Array.isArray(data) && data.length > 0) {
                 const backendSessions = data.map((s: any) => ({
                    id: s._id || 999,
                    expert: "Restricted Test Expert",
                    role: "Strict Mode",
                    company: "CodeMock",
                    category: "IT",
                    location: "Strict Server",
                    date: new Date(s.startTime).toLocaleDateString(),
                    time: new Date(s.startTime).toLocaleTimeString(),
                    price: "PRIVATE",
                    status: s.status,
                    meetLink: "",
                    rating: 5.0,
                    reviews: 0,
                    duration: "60 minutes",
                    expertise: s.topics || ["Live"],
                    avatarColor: "from-red-500 to-pink-600",
                    sessionId: s.sessionId,
                    startTime: s.startTime,
                    endTime: s.endTime
                }));
                allSessions = [...backendSessions, ...dummySessions];
            }
            setSessions(allSessions);
            setFilteredSessions(allSessions);
        } catch (err) {
            console.error("Failed to fetch sessions", err);
            setSessions(dummySessions);
            setFilteredSessions(dummySessions);
        }
    };
    fetchSessions(); 
  }, []);

  const handleJoinMeeting = async (session: any) => {
    const candidateId = user?.id || "";  
    try {
        const res = await fetch(`http://localhost:3000/api/sessions/${session.sessionId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: candidateId })
        });
        
        const data = await res.json();
        
        if (res.ok && data.permitted) {
            navigate(`/live-meeting?meetingId=${data.meetingId}&role=candidate&userId=${candidateId}`);
        } else {
            alert(data.message || "Cannot join session at this time.");
        }
    } catch (error) {
        console.error("Join Error:", error);
        alert("Failed to join session.");
    }
  };

  const isSessionActive = (session: any) => {
      const now = new Date();
      let start, end;

      if (session.startTime && session.endTime) {
          // Backend format (ISO strings)
          start = new Date(session.startTime);
          end = new Date(session.endTime);
      } else if (session.date && session.time) {
          // Dummy data format ("YYYY-MM-DD", "HH:MM AM/PM")
          // Parse date string + time string
          const dateStr = session.date; // "2025-10-01"
          const timeStr = session.time; // "10:30 AM"
          const dateTimeStr = `${dateStr} ${timeStr}`;
          start = new Date(dateTimeStr);
          
          // Assume 1 hour duration for dummy if parsing works, else fail safe
          if (!isNaN(start.getTime())) {
             end = new Date(start.getTime() + 60 * 60 * 1000);
          } else {
             return false; // Invalid date
          }
      } else {
          return false;
      }

      // Check current time window
      // Allow joining 10 mins before start until end
      const bufferStart = new Date(start.getTime() - 10 * 60 * 1000); 
      return now >= bufferStart && now < end;
  };

  // Filter sessions based on search and filters
  useEffect(() => {
    let filtered = sessions.filter(session => {
      const matchesSearch = session.expert.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          session.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || session.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || session.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
    setFilteredSessions(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, sessions]);

  // Pagination
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: Session["status"]) => {
    switch (status) {
      case "Confirmed":
        return "✅";
      case "Upcoming":
        return "⏳";
      case "Completed":
        return "🎯";
      default:
        return "📝";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">My Sessions</h1>
            <p className="text-gray-600">Manage and track your mentoring sessions</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search Bar */}
              <div className="flex-1 w-full relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 bg-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="relative flex-1 lg:flex-none">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="IT">IT & Development</option>
                    <option value="HR">HR & Recruitment</option>
                    <option value="Product">Product Management</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Career">Career Coaching</option>
                  </select>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Results Count */}
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  
                  {searchTerm && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded border border-blue-200">
                      <span>Search: "{searchTerm}"</span>
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="ml-1 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {statusFilter !== 'all' && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-sm rounded border border-green-200">
                      <span>Status: {statusFilter}</span>
                      <button 
                        onClick={() => setStatusFilter("all")}
                        className="ml-1 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {categoryFilter !== 'all' && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded border border-purple-200">
                      <span>Category: {categoryFilter}</span>
                      <button 
                        onClick={() => setCategoryFilter("all")}
                        className="ml-1 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sessions Grid */}
          {currentSessions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {currentSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden group"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${session.avatarColor} p-5 text-white`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border border-white/30">
                        {session.expert.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-lg truncate">{session.expert}</h2>
                        <p className="text-white/90 text-sm truncate">{session.role}</p>
                        <p className="text-white/80 text-xs truncate">{session.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="p-5">
                    {/* Status and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(session.status)}`}>
                        {getStatusIcon(session.status)} {session.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{session.rating}</span>
                        <span className="text-gray-400 text-xs">({session.reviews})</span>
                      </div>
                    </div>

                    {/* Session Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{session.date}</span>
                        <span className="text-gray-300">•</span>
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="truncate">{session.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>{session.category}</span>
                        <span className="text-gray-300">•</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {session.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {session.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                          +{session.expertise.length - 3}
                        </span>
                      )}
                    </div>
                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-900">{session.price}</div>
                      <div className="flex gap-2">
{session.status === "Upcoming" || session.status === "Confirmed" || session.status === "confirmed" ? (
                          <button
                            onClick={() => handleJoinMeeting(session)}
                            disabled={!isSessionActive(session)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                                isSessionActive(session) 
                                ? "bg-gray-900 text-white hover:bg-gray-800" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <Video className="w-4 h-4" />
                            Join
                          </button>
                        ) : (
                          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Review
                          </button>
                        )}
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredSessions.length > sessionsPerPage && (
            <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === number
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Support Card */}
          <div className="bg-gray-900 rounded-xl p-6 text-white mt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Need Help?</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Our support team is here to help you with session-related queries
                </p>
                <button className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  Contact Support
                </button>
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

export default MySessions;