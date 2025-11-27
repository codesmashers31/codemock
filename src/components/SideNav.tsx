import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type NavItem = {
  id: string;
  label: string;
  to: string;
  icon?: ReactNode;
};

type SideNavProps = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  active?: string;
};

export default function SideNav({ isOpen = false, onClose, className = "", active }: SideNavProps) {
  const items: NavItem[] = [
    { id: "dashboard", label: "Dashboard", to: "/dashboard", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-8H3v8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
    { id: "sessions", label: "Sessions", to: "/dashboard/sessions", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/></svg>) },
    { id: "availability", label: "Availability", to: "/dashboard/availability", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M16 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>) },
    { id: "expertise", label: "Skills & Expertise", to: "/dashboard/skills", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.91L12 2z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round"/></svg>) },
    { id: "profile", label: "Profile", to: "/dashboard/profile", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M6 20c1.5-3 4.5-5 6-5s4.5 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen p-4 ${className}`}>
        <div className="mb-6 px-2">
          <h1 className="text-lg font-semibold">Expert Panel</h1>
          <p className="text-xs text-gray-500">Manage your profile & sessions</p>
        </div>

        <nav className="space-y-1 px-2">
          {items.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive || active === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              end
            >
              <span className="text-gray-400">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 px-2">
          <h6 className="text-xs text-gray-500 uppercase font-semibold mb-2">Quick actions</h6>
          <button className="w-full text-left px-3 py-2 rounded-md text-sm text-blue-700 bg-blue-50 border border-blue-100">New session</button>
        </div>
      </aside>

      {/* Mobile slide-over */}
      <div className={`fixed inset-0 z-40 transition-opacity lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />

        <div className={`absolute inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-4 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Menu</h2>
              <p className="text-xs text-gray-500">Navigate</p>
            </div>
            <button type="button" onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <span className="sr-only">Close menu</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {items.map(item => (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`
                }
                end
              >
                <span className="text-gray-400">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
