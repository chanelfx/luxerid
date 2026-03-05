import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { carsData } from "@/data/cars";
import { useAuth } from "@/contexts/AuthContext";
import CarCard from "@/components/CarCard";
import StarRating from "@/components/StarRating";
import heroCar1 from "@/assets/hero-car-1.jpg";
import heroCar2 from "@/assets/hero-car-2.jpg";
import heroCar3 from "@/assets/hero-car-3.jpg";
import { Award, Car, ChevronLeft, ChevronRight, Clock, DollarSign, Fuel, Headphones, Search, Settings2, Users } from "lucide-react";

const heroImages = [heroCar1, heroCar2, heroCar3];

const Index = () => {
  const [heroIdx, setHeroIdx] = useState(0);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchFuel, setSearchFuel] = useState("");
  const { reviews } = useAuth();

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = carsData.filter(c => c.available).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((img, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIdx ? "opacity-100" : "opacity-0"}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-4 animate-slide-up">
            Find Your <span className="gold-text">Perfect Ride</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Luxury and affordable cars available for rent.
          </p>
          <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/cars" className="gold-gradient text-primary-foreground px-8 py-3 rounded-xl font-display font-semibold hover:opacity-90 transition-opacity">
              Browse Cars
            </Link>
            <Link to="/contact" className="border border-foreground/20 text-foreground px-8 py-3 rounded-xl font-display font-semibold hover:bg-foreground/5 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Hero dots */}
          <div className="flex gap-2 mt-12">
            {heroImages.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroIdx ? "bg-primary w-8" : "bg-foreground/30"}`} />
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button onClick={() => setHeroIdx(i => (i - 1 + heroImages.length) % heroImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setHeroIdx(i => (i + 1) % heroImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Quick Search */}
      <section className="container -mt-20 relative z-20">
        <div className="glass-card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select value={searchBrand} onChange={e => setSearchBrand(e.target.value)} className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none">
              <option value="">All Brands</option>
              {[...new Set(carsData.map(c => c.brand))].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={searchFuel} onChange={e => setSearchFuel(e.target.value)} className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none">
              <option value="">All Fuel Types</option>
              {["Petrol", "Diesel", "Electric", "Hybrid"].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none">
              <option value="">All Transmissions</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            <Link to={`/cars?brand=${searchBrand}&fuel=${searchFuel}`} className="gold-gradient text-primary-foreground rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Search className="w-4 h-4" /> Search Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Featured <span className="gold-text">Cars</span></h2>
          <div className="section-divider mb-4" />
          <p className="text-muted-foreground">Handpicked vehicles for an exceptional driving experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(car => <CarCard key={car.id} car={car} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/cars" className="border border-primary/30 text-primary px-8 py-3 rounded-xl font-display font-semibold hover:bg-primary/10 transition-colors">
            View All Cars →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card/50 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Why Choose <span className="gold-text">Us</span></h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: "Affordable Prices", desc: "Competitive rates without compromising quality" },
              { icon: Award, title: "Well Maintained", desc: "Every car is thoroughly inspected and serviced" },
              { icon: Clock, title: "Easy Booking", desc: "Simple process - choose, contact, and drive" },
              { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock assistance for all your needs" },
            ].map((item, i) => (
              <div key={i} className="glass-card-hover p-6 text-center group">
                <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">How It <span className="gold-text">Works</span></h2>
          <div className="section-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", icon: Search, title: "Choose a Car", desc: "Browse our fleet and find your perfect vehicle" },
            { step: "02", icon: Car, title: "Contact Admin", desc: "Reach out via WhatsApp or phone call" },
            { step: "03", icon: DollarSign, title: "Agree on Deal", desc: "Discuss terms, pricing, and rental duration" },
            { step: "04", icon: Car, title: "Pick Up Car", desc: "Get the keys and hit the road!" },
          ].map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="text-6xl font-display font-bold text-primary/10 mb-2">{item.step}</div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-card/50 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Customer <span className="gold-text">Reviews</span></h2>
            <div className="section-divider" />
          </div>
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map(r => (
                <div key={r.id} className="glass-card p-6">
                  <StarRating rating={r.rating} />
                  <p className="text-sm text-muted-foreground mt-3 mb-4">"{r.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">{r.userName[0]}</div>
                    <div>
                      <p className="text-sm font-medium">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50+", label: "Premium Cars" },
            { value: "1000+", label: "Happy Customers" },
            { value: "24/7", label: "Support" },
            { value: "4.8", label: "Average Rating" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl gold-text">{s.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 gold-gradient opacity-5" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Ready to Drive Your <span className="gold-text">Dream Car</span>?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Browse our collection and find the perfect car for your next adventure.</p>
            <Link to="/cars" className="gold-gradient text-primary-foreground px-10 py-3.5 rounded-xl font-display font-semibold hover:opacity-90 transition-opacity inline-block">
              View Available Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
