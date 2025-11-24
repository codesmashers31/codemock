import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  MessageSquare,
  Users,
  GraduationCap,
  Calendar,
  X,
  Menu,
  LogOut,
  User,
  Settings,
  BookOpen,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !(searchRef.current as any).contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (menuRef.current && !(menuRef.current as any).contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (profileMenuRef.current && !(profileMenuRef.current as any).contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen && !isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen && !isSearchOpen) {
      setIsMenuOpen(false);
    }
    if (!isSearchOpen) {
      setTimeout(() => {
        const input = document.getElementById("search-input");
        if (input) input.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const navItems = [
    { name: "Find HRs", href: "/dashboard", icon: <Users size={16} /> },
    { name: "Find Mentors", href: "/find-mentors", icon: <GraduationCap size={16} /> },
    { name: "My Sessions", href: "/my-sessions", icon: <Calendar size={16} /> },
  ];

  const profileMenuItems = [
    { name: "Profile", href: "/profile", icon: <User size={16} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={16} /> },
    { name: "Resume", href: "/resume", icon: <BookOpen size={16} /> },
    { name: "Help & Support", href: "/help", icon: <HelpCircle size={16} /> },
  ];

  return (
    <nav
      ref={menuRef}
      className={`bg-white/95 border-b border-gray-100 shadow-lg sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side logo + nav items */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-3">
              <img src="/media/logo/logonew.png" alt="Logo" className="w-20 p-3" />
            </div>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 rounded-md hover:bg-blue-50"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search */}
            <div ref={searchRef} className={`relative transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              <button
                onClick={toggleSearch}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200 z-10 ${isSearchOpen ? 'bg-blue-50 text-blue-700' : ''}`}
              >
                <Search size={18} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </form>
              </div>
            </div>

            {/* Notifications and messages */}
            <button className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200 relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200">
              <MessageSquare size={18} />
            </button>

            <div className="h-5 w-px bg-gray-200 mx-1"></div>

            {/* If user logged in show profile, else Sign in / Join Now */}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-r from-blue-100/50 to-indigo-100 border border-blue-200">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronRight
                    size={16}
                    className={`text-gray-500 transition-transform ${isProfileMenuOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                    {/* Profile header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 border border-blue-200">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                            alt="profile"
                            className="w-9 h-9 rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-700 truncate">{user.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    {/* Menu items */}
                    <div className="divide-y divide-gray-100 py-2">
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-5 py-3 hover:bg-blue-50 transition rounded-xl text-gray-700 hover:text-blue-700 font-medium text-sm group"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <span className="mr-4 text-blue-500 group-hover:text-blue-700">{item.icon}</span>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    {/* Logout button - clean separation */}
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={logout}
                        className="flex items-center w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-2 font-semibold text-sm transition"
                      >
                        <LogOut size={18} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium rounded-md transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="default"
                    size="sm"
                    className="font-medium rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 px-4"
                  >
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-700 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-3 transition-all duration-300">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-blue-700 rounded-full"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          <div className="pt-3 pb-2 border-t border-gray-100">
            <div className="flex space-x-2 px-3 py-2">
              <button className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200 relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors duration-200">
                <MessageSquare size={18} />
              </button>
            </div>

            {user && (
              <div className="px-3 py-3 border-t border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 border border-blue-200">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                      alt="profile"
                      className="w-9 h-9 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {profileMenuItems.slice(0, 4).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mb-1 text-blue-500">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2 mt-3">
              {user ? (
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="w-full font-medium rounded-md transition-all duration-300 hover:bg-red-50 text-red-600 py-3"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/signin" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full font-medium rounded-md transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 py-3"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full font-medium rounded-md bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md py-3"
                    >
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
