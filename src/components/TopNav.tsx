import { useState } from "react";

export default function TopNav({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <header className="w-full bg-white border-b border-gray-200 p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="hidden sm:block">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search experts, sessions..."
            className="border border-gray-200 rounded-md px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none" aria-label="Notifications">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <img src="/avatar-placeholder.png" alt="avatar" className="w-8 h-8 rounded-full border border-gray-200" />
          <div className="hidden sm:block text-sm">
            <div className="font-medium">Dhanush</div>
            <div className="text-xs text-gray-500">Expert</div>
          </div>
        </div>
      </div>
    </header>
  );
}
