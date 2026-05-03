import { useState } from "react";
import { Link } from "react-router-dom";
import userImg from "../../assets/user.png";
import ThemeToggle from "../../components/common/theme-toggle/theme-toggle";
import NavDrawer, {
  NavDrawerTrigger,
  DEFAULT_NAV_ITEMS,
} from "../nav-drawer/nav-drawer";

// ─── Component ────────────────────────────────────────────────────────────────

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-border bg-bg-header px-6 py-[18.1px]">
        <div className="flex items-center justify-between">
          {/* Hamburger — small screens only */}
          <div className="md:hidden">
            <NavDrawerTrigger onClick={() => setDrawerOpen(true)} />
          </div>

          {/* Placeholder so right section stays pushed right on desktop */}
          <div className="hidden md:block" />

          {/* Right section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/profile"
              className="h-10 w-10 overflow-hidden rounded-full border-2 border-border-active/20 hover:border-border-card"
              style={{ transition: "border-color 200ms ease" }}
            >
              <img
                src={userImg}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Drawer — outside <header> so it overlays the full page */}
      <NavDrawer
        navItems={DEFAULT_NAV_ITEMS}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default Header;
