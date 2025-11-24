import { SetStateAction, useEffect, useState } from "react";
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
  Award,
  Users,
  Settings
} from "lucide-react";
import Navigation from "./Navigation";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

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
  status: string;
  meetLink: string;
  rating: number;
  reviews: number;
  duration: string;
  expertise: string[];
  avatarColor: string;
};

const MySessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sessionsPerPage] = useState<number>(6);

  // Dummy data with more sessions for pagination
  useEffect(() => {
    const dummySessions = [
      {
        id: 1,
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
        avatarColor: "from-blue-500 to-cyan-500"
      },
      {
        id: 2,
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
        avatarColor: "from-purple-500 to-pink-500"
      },
      {
        id: 3,
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
        avatarColor: "from-orange-500 to-red-500"
      },
      {
        id: 4,
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
        avatarColor: "from-green-500 to-teal-500"
      },
      {
        id: 5,
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
        avatarColor: "from-red-500 to-pink-500"
      },
      {
        id: 6,
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
        avatarColor: "from-indigo-500 to-purple-500"
      },
      {
        id: 7,
        expert: "Alex Thompson",
        role: "Backend Engineer",
        company: "Uber",
        category: "IT",
        location: "Remote",
        date: "2025-10-20",
        time: "9:00 AM",
        price: "₹1599",
        status: "Upcoming",
        meetLink: "https://meet.google.com/pqr-6789",
        rating: 4.7,
        reviews: 112,
        duration: "60 minutes",
        expertise: ["Java", "Spring Boot", "Microservices"],
        avatarColor: "from-teal-500 to-blue-500"
      },
      {
        id: 8,
        expert: "Meera Patel",
        role: "UX Designer",
        company: "Adobe",
        category: "Design",
        location: "Mumbai, India",
        date: "2025-10-22",
        time: "2:30 PM",
        price: "₹1199",
        status: "Confirmed",
        meetLink: "https://meet.google.com/stu-1234",
        rating: 4.9,
        reviews: 78,
        duration: "45 minutes",
        expertise: ["Figma", "User Research", "Prototyping"],
        avatarColor: "from-pink-500 to-rose-500"
      }
    ];
    setSessions(dummySessions);
    setFilteredSessions(dummySessions);
  }, []);

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

  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30 pb-20 lg:pb-0">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Sessions</h1>
          <p className="text-gray-600 text-lg">Manage and join your booked mentoring sessions</p>
        </div>

        {/* Search and Filter Bar */}
       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
  <div className="flex flex-col lg:flex-row gap-4 items-center">
    {/* Enhanced Search */}
    <div className="flex-1 w-full lg:max-w-md relative">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-200 group-focus-within:text-blue-500" />
        <input
          type="text"
          placeholder="Search by expert, role, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white shadow-sm focus:shadow-md"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>

    {/* Enhanced Filters */}
    <div className="flex gap-3 w-full lg:w-auto">
      {/* Status Filter */}
      <div className="relative group flex-1 lg:flex-none">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full pl-10 pr-10 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none shadow-sm focus:shadow-md cursor-pointer font-medium"
        >
          <option value="all" className="py-3 text-gray-600">📊 All Status</option>
          <option value="Upcoming" className="py-3 text-blue-600">⏳ Upcoming</option>
          <option value="Confirmed" className="py-3 text-green-600">✅ Confirmed</option>
          <option value="Completed" className="py-3 text-gray-600">🎯 Completed</option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative group flex-1 lg:flex-none">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-linear-to-r from-green-500 to-blue-500 rounded-full"></div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full pl-10 pr-10 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none shadow-sm focus:shadow-md cursor-pointer font-medium"
        >
          <option value="all" className="py-3 text-gray-600">🌐 All Categories</option>
          <option value="IT" className="py-3 text-blue-600">💻 IT & Development</option>
          <option value="HR" className="py-3 text-purple-600">👥 HR & Recruitment</option>
          <option value="Product" className="py-3 text-orange-600">📊 Product Management</option>
          <option value="Data Science" className="py-3 text-green-600">🤖 Data Science</option>
          <option value="Career" className="py-3 text-yellow-600">🚀 Career Coaching</option>
          <option value="Design" className="py-3 text-pink-600">🎨 Design</option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Enhanced Results Count */}
    <div className="flex items-center gap-3 bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-2xl border border-blue-100 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-blue-700 whitespace-nowrap">
          {filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'} found
        </span>
      </div>
    </div>

    {/* Clear Filters Button */}
    {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
      <button
        onClick={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setCategoryFilter("all");
        }}
        className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap border border-gray-200 hover:border-gray-300 hover:shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Clear All
      </button>
    )}
  </div>

  {/* Active Filters Display */}
  {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-gray-500 font-medium">Active filters:</span>
        
        {searchTerm && (
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200">
            <span>🔍 "{searchTerm}"</span>
            <button 
              onClick={() => setSearchTerm("")}
              className="w-5 h-5 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-700 flex items-center justify-center text-xs transition-colors"
            >
              ×
            </button>
          </div>
        )}
        
        {statusFilter !== 'all' && (
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium border border-green-200">
            <span>
              {statusFilter === 'Upcoming' && '⏳ '}
              {statusFilter === 'Confirmed' && '✅ '}
              {statusFilter === 'Completed' && '🎯 '}
              {statusFilter}
            </span>
            <button 
              onClick={() => setStatusFilter("all")}
              className="w-5 h-5 rounded-full bg-green-200 hover:bg-green-300 text-green-700 flex items-center justify-center text-xs transition-colors"
            >
              ×
            </button>
          </div>
        )}
        
        {categoryFilter !== 'all' && (
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 text-sm rounded-full font-medium border border-purple-200">
            <span>
              {categoryFilter === 'IT' && '💻 '}
              {categoryFilter === 'HR' && '👥 '}
              {categoryFilter === 'Product' && '📊 '}
              {categoryFilter === 'Data Science' && '🤖 '}
              {categoryFilter === 'Career' && '🚀 '}
              {categoryFilter === 'Design' && '🎨 '}
              {categoryFilter}
            </span>
            <button 
              onClick={() => setCategoryFilter("all")}
              className="w-5 h-5 rounded-full bg-purple-200 hover:bg-purple-300 text-purple-700 flex items-center justify-center text-xs transition-colors"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>

        {/* Sessions Grid */}
        {currentSessions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
              >
                {/* Header with Gradient */}
                <div className={`bg-linear-to-r ${session.avatarColor} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/30">
                      {session.expert.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold truncate">{session.expert}</h2>
                      <p className="text-white/90 text-sm">{session.role}</p>
                      <p className="text-white/80 text-xs">{session.company}</p>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="p-6">
                  {/* Status and Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        session.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : session.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {session.status}
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
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{session.date}</span>
                      <span className="text-gray-400">•</span>
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>{session.duration}</span>
                      <span className="text-gray-400">•</span>
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{session.category} Interview</span>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-lg font-medium border border-gray-300/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-700">{session.price}</div>
                    <div className="flex gap-2">
                      {session.status !== "Completed" && (
                        <a
                            href={session.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm hover:bg-blue-700 transition-all duration-200 transform group-hover:scale-105 flex items-center gap-2"
                          >
                            <Video className="w-4 h-4" />
                            Join
                          </a>
                      )}
                      <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {session.status === "Completed" ? "Done" : "Mark Done"}
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
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all"
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
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
                    currentPage === number
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
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
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Advertisements Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Premium Ad */}
          {/* <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <Award className="w-12 h-12 text-white/90" />
              <div>
                <h3 className="font-bold text-lg mb-1">Go Premium</h3>
                <p className="text-purple-100 text-sm mb-3">
                  Get 20% off on your next 3 sessions with Premium membership
                </p>
                <button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div> */}

          {/* Referral Ad */}
          {/* <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-4">
              <Users className="w-12 h-12 text-white/90" />
              <div>
                <h3 className="font-bold text-lg mb-1">Refer & Earn</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Refer friends and get ₹500 credit for each successful session
                </p>
                <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Invite Friends
                </button>
              </div>
            </div>
          </div> */}
        </div>

        {/* Support Card */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white mt-6">
          <div className="flex items-center gap-4">
            <Settings className="w-12 h-12 text-gray-400" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-3">
                Our support team is here to help you with any questions about your sessions
              </p>
              <button className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm">
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