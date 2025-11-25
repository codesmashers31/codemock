import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const mockStatus = [
  "Actively booking mocks",
  "Preparing for mock sessions",
  "Scheduled for a mock",
  "Received mock feedback",
  "Just exploring mock interviews",
  "Not interested in mocks"
];

const InfoPanel = () => (
  <div className="space-y-6">
    {/* Mock Journey Card - Modern Design */}
    <Card className="rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group/card">
      <CardHeader className="pb-3 px-6 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="text-xs font-bold uppercase tracking-wide text-emerald-600">
            Your Journey
          </span>
        </div>
        <CardTitle className="text-lg font-bold text-slate-900 mt-0.5 mb-1">
          Where are you in your mock interview journey?
        </CardTitle>
        <p className="text-sm text-slate-500 mt-2">
          Select your current stage to get personalized guidance
        </p>
      </CardHeader>
      <CardContent className="space-y-3 px-6 pb-6">
        {mockStatus.map((status, index) => (
          <button
            key={index}
            className="w-full py-3 px-4 text-sm font-semibold border border-slate-200 hover:border-emerald-300 rounded-xl bg-white hover:bg-emerald-50/50 text-slate-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group/button flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-slate-300 rounded-full group-hover/button:bg-emerald-400 transition-colors duration-200"></div>
            <span className="text-left flex-1">{status}</span>
            <svg className="w-4 h-4 text-slate-400 group-hover/button:text-emerald-500 group-hover/button:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </CardContent>
    </Card>

    {/* Safety & Privacy Card */}
    <Card className="rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group/card bg-linear-to-br from-blue-50/50 to-indigo-50/30">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="font-bold text-base text-slate-900 mb-2">
          Always practice safe sharing
        </div>
        <div className="text-sm text-slate-600 mb-4 leading-relaxed">
          Never disclose private info in a mock. Real feedback, real growth—safe experience every session.
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group/link">
          Learn more
          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </CardContent>
    </Card>

    {/* Pro-tip / Guide Card */}
    <Card className="rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group/card bg-linear-to-br from-amber-50/50 to-orange-50/30">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="font-bold text-base text-slate-900 mb-2">
          Maximize Your Mock Sessions
        </div>
        <div className="text-sm text-slate-600 mb-4 leading-relaxed">
          Structure your questions, request detailed feedback, and reflect on each session for best results.
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold hover:text-amber-700 transition-colors group/link">
          Know more
          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </CardContent>
    </Card>

    {/* Additional Resource Card */}
    <Card className="rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 group/card">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-bold text-base text-slate-900 mb-2">
              Interview Preparation Resources
            </div>
            <div className="text-sm text-slate-600 mb-3">
              Access our library of common interview questions, technical challenges, and behavioral guides.
            </div>
            <div className="flex gap-3">
              <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                View Questions
              </a>
              <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                Study Guides
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default InfoPanel;