import { Link } from "react-router-dom";

const nav = [
  { key: "dashboard", label: "Dashboard", icon: "grid_view", href: "/dashboard" },
  { key: "rituals", label: "Rituals", icon: "auto_fix_high", href: "/quiz" },
  { key: "chronicle", label: "Chronicle", icon: "menu_book", href: "/results" },
  { key: "settings", label: "Settings", icon: "settings", href: "/landing" }
];

export default function ArchiveSidebar({ active = "rituals", showAvatar = false }) {
  return (
    <aside className="bg-[#131313] flex flex-col h-screen fixed left-0 top-0 border-r border-[#444748]/15 w-64 z-50">
      <div className="px-8 py-10">
        <span className="font-['Newsreader'] text-lg italic text-[#e9c176]">PHILOSIFT</span>
        <p className="font-['Inter'] font-light uppercase tracking-widest text-[10px] text-[#444748] mt-1">Level IX Initiate</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {nav.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              to={item.href}
              className={isActive
                ? "flex items-center gap-4 px-4 py-3 bg-[#353534] text-[#e9c176] font-bold border-r-2 border-[#e9c176] transition-all"
                : "flex items-center gap-4 px-4 py-3 text-[#444748] opacity-60 hover:bg-[#1a1a1a] hover:text-[#e9c176] transition-all group"}
            >
              <span className="material-symbols-outlined" style={isActive && item.key === "rituals" ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
              <span className="font-['Inter'] font-light uppercase tracking-widest text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={showAvatar ? "p-6 mt-auto border-t border-[#444748]/15" : "p-6"}>
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
  );
}
