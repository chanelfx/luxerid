import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 pb-20 md:pb-0">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center"><Car className="w-5 h-5 text-primary-foreground" /></div>
            <span className="gold-text">LuxeRide</span>
          </Link>
          <p className="text-sm text-muted-foreground">Premium car rental service. Luxury and affordable cars for every occasion.</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Icon className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
          <div className="space-y-2">
            {[{ to: "/", l: "Home" }, { to: "/cars", l: "Cars" }, { to: "/contact", l: "Contact" }].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l.l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-foreground">Contact</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +1 (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@luxeride.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Luxury Ave, NY</p>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4 text-foreground">Hours</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Mon - Fri: 8AM - 8PM</p>
            <p>Saturday: 9AM - 6PM</p>
            <p>Sunday: 10AM - 4PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 LuxeRide. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
