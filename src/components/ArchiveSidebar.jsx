import { Link } from "react-router-dom";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/react";

const nav = [
  { key: "dashboard", label: "Dashboard", icon: "grid_view", href: "/dashboard" },
  { key: "interrupt", label: "Interrupt", icon: "emergency", href: "/interrupt" },
  { key: "history", label: "History", icon: "menu_book", href: "/history" },
  { key: "alarms", label: "Alarms", icon: "alarm", href: "/alarms" },
  { key: "settings", label: "Settings", icon: "settings", href: "/landing" }
];

export default function ArchiveSidebar({ active = "dashboard", showAvatar = false }) {
  const { user } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function renderNavLinks(onNavigate) {
    return nav.map((item) => {
      const isActive = item.key === active;
      return (
        <Link
          key={item.key}
          to={item.href}
          onClick={onNavigate}
          className={isActive
            ? "flex items-center gap-4 px-4 py-3 bg-[#353534] text-[#e9c176] font-bold border-r-2 border-[#e9c176] transition-all"
            : "flex items-center gap-4 px-4 py-3 text-[#444748] opacity-80 hover:bg-[#1a1a1a] hover:text-[#e9c176] transition-all group"}
        >
          <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
          <span className="font-['Inter'] font-light uppercase tracking-widest text-[10px]">{item.label}</span>
        </Link>
      );
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-[65] flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/30 bg-[#141414]/90 text-on-surface shadow-lg backdrop-blur-md lg:hidden"
        aria-label="Open Navigation"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button type="button" onClick={() => setIsMobileOpen(false)} className="absolute inset-0 bg-black/65" aria-label="Close Navigation" />
          <aside className="absolute left-0 top-0 h-full w-[84vw] max-w-xs border-r border-[#444748]/20 bg-[#131313]">
            <div className="flex items-center justify-between px-6 py-6">
              <div>
                <span className="font-['Newsreader'] text-lg italic text-[#e9c176]">PHILOSIFT</span>
                <p className="mt-1 font-['Inter'] text-[10px] uppercase tracking-widest text-[#444748]">Archive Navigation</p>
              </div>
              <button type="button" onClick={() => setIsMobileOpen(false)} className="rounded-full border border-outline-variant/30 px-2 py-1 text-xs text-on-surface-variant">
                Close
              </button>
            </div>

            <nav className="px-3 space-y-2">{renderNavLinks(() => setIsMobileOpen(false))}</nav>

            <div className="mt-6 border-t border-[#444748]/15 px-6 py-5">
              <p className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#e9c176]">Account</p>
              <p className="mt-2 truncate text-xs text-on-surface-variant">{user?.primaryEmailAddress?.emailAddress || "Signed in user"}</p>
              <div className="mt-3"><UserButton /></div>
            </div>
          </aside>
        </div>
      ) : null}

      <aside className="hidden lg:flex bg-[#131313] flex-col h-screen fixed left-0 top-0 border-r border-[#444748]/15 w-64 z-50">
        <div className="px-8 py-10">
          <span className="font-['Newsreader'] text-lg italic text-[#e9c176]">PHILOSIFT</span>
          <p className="font-['Inter'] font-light uppercase tracking-widest text-[10px] text-[#444748] mt-1">Level IX Initiate</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">{renderNavLinks()}</nav>
        <div className={showAvatar ? "p-6 mt-auto border-t border-[#444748]/15" : "p-6"}>
          <div className="flex items-center gap-3 mb-4">
            <div className="min-w-0">
              <div className="font-['Inter'] font-light uppercase tracking-widest text-[10px] text-[#e9c176]">Account</div>
              <div className="truncate font-['Inter'] text-xs text-on-surface-variant">{user?.primaryEmailAddress?.emailAddress || "Signed in user"}</div>
            </div>
            <UserButton />
          </div>

          {showAvatar ? (
            <div className="flex items-center gap-3 mb-6">
              <img
                alt="Curator Profile"
                className="w-10 h-10 object-cover grayscale border border-[#444748]/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv0KKhU30JjwSkE6hvbI5GySG_6YZ1K5WCiOF7MheS1ZsXGFkeRfcbe3zzjoK-1yCSeCPlQGgoV7gqJprx4EOMO9oLog2tRxkFUoX_QYgM8UI5vz4rzlKbbHzx1lH14cll8dcMOc-KmfxXamnPyXk9QMRBkwgx7vYvZHISr9FBMsnEh7kYTbPS3xAat155Ec9EHWtaG5fKaBJWCC56rykER8AsnEITgtRKHG5WtdqAXdLUkqapQ3NXiav4fIH9qQeEe-krmcWfTuo"
              />
              <div>
                <div className="font-['Inter'] font-light uppercase tracking-widest text-[10px] text-[#e9c176]">Level IX Initiate</div>
                <div className="font-['Newsreader'] text-sm italic text-on-surface">M. Thorne</div>
              </div>
            </div>
          ) : null}
          <button className="w-full py-4 bg-primary text-on-primary font-['Inter'] font-bold uppercase tracking-widest text-[10px] transition-transform active:scale-95">
            Begin Ritual
          </button>
        </div>
      </aside>
    </>
  );
}
