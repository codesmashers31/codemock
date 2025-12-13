import React, { useState, useMemo } from "react";

// Dummy session data
const initialSessions = [
  {
    id: 1,
    expert: "Rahul Mehta",
    user: "Pooja Sri",
    date: "2025-12-15",
    time: "10:00 AM - 11:00 AM",
    duration: "1 hour",
    mode: "Online",
    status: "Pending",
    amount: 1500,
  },
  {
    id: 2,
    expert: "Anjali Sharma",
    user: "Ravi Kumar",
    date: "2025-12-13",
    time: "2:00 PM - 2:30 PM",
    duration: "30 mins",
    mode: "Offline",
    status: "Completed",
    amount: 800,
  },
  {
    id: 3,
    expert: "Rahul Mehta",
    user: "Amit Joshi",
    date: "2025-12-14",
    time: "11:00 AM - 12:00 PM",
    duration: "1 hour",
    mode: "Online",
    status: "Booked",
    amount: 1200,
  },
  {
    id: 4,
    expert: "Priya Verma",
    user: "Karan Singh",
    date: "2025-12-16",
    time: "3:00 PM - 4:00 PM",
    duration: "1 hour",
    mode: "Online",
    status: "Cancelled",
    amount: 1000,
  },
  {
    id: 5,
    expert: "Vikram Patel",
    user: "Sonia Reddy",
    date: "2025-12-12",
    time: "9:00 AM - 10:00 AM",
    duration: "1 hour",
    mode: "Offline",
    status: "Completed",
    amount: 2000,
  },
];

export default function SessionManagement() {
  const [sessions, setSessions] = useState(initialSessions);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchExpert, setSearchExpert] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const pageSize = 5;

  // Filtered sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesStatus =
        filterStatus === "All" || s.status === filterStatus;
      const matchesExpert = s.expert
        .toLowerCase()
        .includes(searchExpert.toLowerCase());
      const matchesUser = s.user.toLowerCase().includes(searchUser.toLowerCase());
      return matchesStatus && matchesExpert && matchesUser;
    });
  }, [sessions, filterStatus, searchExpert, searchUser]);

  // Sort by date & time
  const sortedSessions = useMemo(() => {
    return [...filteredSessions].sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time.split(" - ")[0]);
      const dateB = new Date(b.date + " " + b.time.split(" - ")[0]);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
  }, [filteredSessions, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedSessions.length / pageSize);
  const paginatedSessions = sortedSessions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Booked': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Mode color mapping
  const getModeColor = (mode) => {
    return mode === 'Online' 
      ? 'bg-purple-50 text-purple-700 border-purple-200' 
      : 'bg-indigo-50 text-indigo-700 border-indigo-200';
  };

  // Calculate summary stats
  const stats = useMemo(() => ({
    totalSessions: sessions.length,
    totalRevenue: sessions.reduce((sum, s) => sum + s.amount, 0),
    completedSessions: sessions.filter(s => s.status === 'Completed').length,
    pendingSessions: sessions.filter(s => s.status === 'Pending').length,
  }), [sessions]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Session Management</h1>
          <p className="text-gray-600 mt-1 text-sm">Manage and monitor all consultation sessions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sessions</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalSessions}</p>
              </div>
              <div className="p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg border border-green-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  ₹{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.completedSessions}</p>
              </div>
              <div className="p-3 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg border border-amber-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.pendingSessions}</p>
              </div>
              <div className="p-3 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sessions</h2>
              <p className="text-sm text-gray-600 mt-1">Filter and manage consultation sessions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Expert</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchExpert}
                  onChange={(e) => setSearchExpert(e.target.value)}
                  placeholder="Expert name..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search User</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="User name..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Session Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Session List</h3>
                <p className="text-sm text-gray-600 mt-1">Click on Date & Time to sort</p>
              </div>
              <span className="text-sm text-gray-500">
                {filteredSessions.length} sessions found
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Expert</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th
                    className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 transition-colors"
                    onClick={() => setSortAsc(!sortAsc)}
                  >
                    <div className="flex items-center gap-1">
                      Date & Time
                      <span className="text-gray-400">
                        {sortAsc ? "▲" : "▼"}
                      </span>
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedSessions.map((session) => (
                  <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-6">
                      <div className="flex items-center gap-3">
                
                        <div>
                          <p className="font-medium text-gray-900">{session.expert}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-gray-900">{session.user}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 w-96">
                      <div className="flex flex-col  whitespace-nowrap">
                        <p className=" text-gray-900">{session.date}</p>
                        <p className="text-sm text-gray-500">{session.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                        {session.duration}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getModeColor(session.mode)}`}>
                        {session.mode}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(session.status)}`}>
                        
                        {session.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        ₹{session.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3  whitespace-nowrap">
                        {session.status !== "Completed" && (
                        <button className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                          Reschedule
                        </button>
                        )}

                        {session.status !== "Completed" && session.status !== "Cancelled" && (
                          <button className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors">
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {paginatedSessions.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center">
                      <div className="max-w-md mx-auto">
                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No sessions found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> -{" "}
                <span className="font-medium">{Math.min(currentPage * pageSize, filteredSessions.length)}</span> of{" "}
                <span className="font-medium">{filteredSessions.length}</span> sessions
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    currentPage === 1 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}