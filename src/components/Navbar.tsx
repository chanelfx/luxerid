import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeftRight, Car, Heart, Home, LogIn, LogOut, Menu, Phone, Settings, User, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const loc = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/cars", label: "Cars", icon: Car },
    { to: "/compare", label: "Compare", icon: ArrowLeftRight },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (path: string) => loc.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="gold-text">LuxeRide</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.isAdmin && <Link to="/admin" className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1"><Settings className="w-4 h-4" /> Admin</Link>}
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"><User className="w-4 h-4" /> {user.name}</Link>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-primary transition-colors"><Heart className="w-4 h-4" /></Link>
                <button onClick={logout} className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"><LogOut className="w-4 h-4" /></button>
              </>
            ) : (
              <Link to="/login" className="gold-gradient text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1">
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border animate-slide-up">
            <div className="container py-4 flex flex-col gap-3">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(l.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                  <l.icon className="w-4 h-4" /> {l.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary"><User className="w-4 h-4" /> Profile</Link>
                  <Link to="/favorites" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary"><Heart className="w-4 h-4" /> Favorites</Link>
                  {user.isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-accent"><Settings className="w-4 h-4" /> Admin</Link>}
                  <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive"><LogOut className="w-4 h-4" /> Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="gold-gradient text-primary-foreground px-3 py-2.5 rounded-lg text-sm font-semibold text-center"><LogIn className="w-4 h-4 inline mr-1" /> Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-b-0 border-x-0 rounded-none">
        <div className="flex items-center justify-around py-2">
          {[...links, { to: user ? "/profile" : "/login", label: user ? "Profile" : "Login", icon: user ? User : LogIn }].map(l => (
            <Link key={l.to} to={l.to} className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}>
              <l.icon className="w-5 h-5" />
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
