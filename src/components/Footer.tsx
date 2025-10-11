const Footer = () => (
  <footer className="w-full border-t border-border bg-card/80 text-sm text-muted-foreground">
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 gap-3">
      <div className="flex items-center gap-2 font-semibold text-primary">
        <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
          {/* Simple interview/platform icon */}
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M8 16h8M8 12h8M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        mock-Hire
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 my-2 md:my-0">
        <a href="#" className="hover:text-primary smooth-transition">About</a>
        <a href="#" className="hover:text-primary smooth-transition">Contact</a>
        <a href="#" className="hover:text-primary smooth-transition">Terms of Service</a>
        <a href="#" className="hover:text-primary smooth-transition">Privacy Policy</a>
      </div>
      <div className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} mock-Hire. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
