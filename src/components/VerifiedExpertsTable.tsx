import React, { useState } from "react";

const VerifiedExpertsTable = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showSessions, setShowSessions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample verified expert
  const verifiedExperts = [
    {
      _id: "2",
      personalInformation: {
        userName: "Priya Sharma",
        mobile: "9876543211",
        gender: "Female",
        dob: "1990-03-22",
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
      },
      education: [
        { degree: "B.Com", institution: "Christ University", field: "Finance", start: 2008, end: 2011 },
      ],
      professionalDetails: {
        title: "Investment Advisor",
        company: "XYZ Investments",
        totalExperience: 6,
        industry: "Finance",
      },
      skillsAndExpertise: {
        mode: "Online",
        domains: ["Investments", "Portfolio Management"],
        tools: ["Excel", "Bloomberg"],
        languages: ["English", "Hindi"],
      },
      verification: {
        aadharFile: "",
        companyIdFile: "",
        linkedin: "https://linkedin.com/in/priyasharma",
      },
    },
  ];

  const sessionsData = [
    {
      expertId: "2",
      user: "Pooja Sri",
      date: "2025-12-15",
      time: "10:00 AM - 11:00 AM",
      duration: "1 hour",
      mode: "Online",
      status: "Completed",
      amount: 1500,
    },
    {
      expertId: "2",
      user: "Ravi Kumar",
      date: "2025-12-13",
      time: "2:00 PM - 2:30 PM",
      duration: "30 mins",
      mode: "Offline",
      status: "Completed",
      amount: 800,
    },
  ];

  const filteredExperts = verifiedExperts.filter(exp =>
    exp.personalInformation.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Main Table Section */}
      <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Verified Experts</h2>
            <p className="text-gray-500 text-sm mt-1">Manage verified expert profiles</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-auto min-w-[300px]">
            <input
              type="text"
              placeholder="Search by expert name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 shadow-sm transition-all duration-200 bg-gray-50"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-600 tracking-wider border-b border-gray-100">
                    Expert
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-600 tracking-wider border-b border-gray-100">
                    Category
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-600 tracking-wider border-b border-gray-100">
                    Location
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-600 tracking-wider border-b border-gray-100">
                    Sessions
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-600 tracking-wider border-b border-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredExperts.map((exp, index) => (
                  <tr
                    key={exp._id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition-colors duration-150`}
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-700">{exp.personalInformation.userName}</div>
                          <div className="text-sm text-gray-500">{exp.professionalDetails.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        {exp.professionalDetails.industry}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {exp.personalInformation.city}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {sessionsData.length}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedExpert(exp)}
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-200"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => setShowSessions(exp)}
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-all duration-200 border border-blue-200"
                        >
                          Sessions
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExperts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 px-6 text-center">
                      <div className="inline-flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                          No results
                        </div>
                        <h3 className="text-gray-500 font-medium">No experts found</h3>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2"></span>
              {filteredExperts.length} verified expert{filteredExperts.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div>
            Showing {filteredExperts.length} of {verifiedExperts.length} expert{filteredExperts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Profile Modal - Fixed Version */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            {/* Backdrop */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-30"
              onClick={() => setSelectedExpert(null)}
            ></div>

            {/* Modal Container - Fixed z-index */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative z-50">
              {/* Header */}
              <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedExpert.personalInformation.userName}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Verified Expert Details
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedExpert(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-blue-300 pl-3">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Personal Information</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Gender</span>
                        <span className="text-sm text-gray-700">{selectedExpert.personalInformation.gender}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                        <span className="text-sm text-gray-700">{new Date(selectedExpert.personalInformation.dob).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Mobile</span>
                        <span className="text-sm text-gray-700">{selectedExpert.personalInformation.mobile}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-600">Location</span>
                        <span className="text-sm text-gray-700">{selectedExpert.personalInformation.city}, {selectedExpert.personalInformation.state}, {selectedExpert.personalInformation.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-green-300 pl-3">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Professional Details</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Title</span>
                        <span className="text-sm text-gray-700">{selectedExpert.professionalDetails.title}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Company</span>
                        <span className="text-sm text-gray-700">{selectedExpert.professionalDetails.company}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Experience</span>
                        <span className="text-sm text-gray-700">{selectedExpert.professionalDetails.totalExperience} years</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-600">Industry</span>
                        <span className="text-sm text-gray-700">{selectedExpert.professionalDetails.industry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-purple-300 pl-3">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Education</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedExpert.education.map((edu, idx) => (
                        <div key={idx} className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-700">{edu.degree}</p>
                              <p className="text-sm text-gray-500 mt-1">{edu.field} • {edu.institution}</p>
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                              {edu.start}-{edu.end}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills & Expertise */}
                  <div className="space-y-4">
                    <div className="border-l-3 border-amber-300 pl-3">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Skills & Expertise</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Mode</span>
                        <span className="text-sm text-gray-700">{selectedExpert.skillsAndExpertise.mode}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 mb-2 block">Domains</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedExpert.skillsAndExpertise.domains.map((domain, idx) => (
                            <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100">
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 mb-2 block">Tools</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedExpert.skillsAndExpertise.tools.map((tool, idx) => (
                            <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 mb-2 block">Languages</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedExpert.skillsAndExpertise.languages.map((lang, idx) => (
                            <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification - Full Width */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="border-l-3 border-red-300 pl-3">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">Verification Documents</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Aadhar Card</span>
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500">Document not uploaded</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Company ID</span>
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500">Document not uploaded</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">LinkedIn Profile</span>
                          <a
                            href={selectedExpert.verification.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors duration-200"
                          >
                            View Profile
                          </a>
                        </div>
                        <p className="text-sm text-gray-500">Professional network verification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Sessions Modal */}
      {showSessions && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-30"
              onClick={() => setShowSessions(null)}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative z-50">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {showSessions.personalInformation.userName} - Sessions
                </h3>
                <button
                  onClick={() => setShowSessions(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-5">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">User</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Time</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Duration</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Mode</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sessionsData.filter(s => s.expertId === showSessions._id).map((s, idx) => (
                        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="py-2 px-4 text-gray-700">{s.user}</td>
                          <td className="py-2 px-4 text-gray-700">{s.date}</td>
                          <td className="py-2 px-4 text-gray-700">{s.time}</td>
                          <td className="py-2 px-4 text-gray-700">{s.duration}</td>
                          <td className="py-2 px-4">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${s.mode === 'Online' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                              {s.mode}
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${s.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-gray-700">₹{s.amount}</td>
                        </tr>
                      ))}
                      {sessionsData.filter(s => s.expertId === showSessions._id).length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">No sessions assigned yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifiedExpertsTable;