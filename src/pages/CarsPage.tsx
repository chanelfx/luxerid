import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { carsData, brands, fuelTypes, transmissionTypes } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";

const CarsPage = () => {
  const [params] = useSearchParams();
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [fuel, setFuel] = useState(params.get("fuel") || "");
  const [transmission, setTransmission] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [seats, setSeats] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = carsData.filter(c => {
    if (brand && c.brand !== brand) return false;
    if (fuel && c.fuel !== fuel) return false;
    if (transmission && c.transmission !== transmission) return false;
    if (c.price > maxPrice) return false;
    if (seats && c.seats !== Number(seats)) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.brand.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const clearFilters = () => { setBrand(""); setFuel(""); setTransmission(""); setMaxPrice(500); setSeats(""); setSearch(""); };

  const selectClass = "bg-secondary border-0 rounded-xl px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none w-full";

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">Our <span className="gold-text">Fleet</span></h1>
          <p className="text-muted-foreground">Find the perfect car for your journey</p>
        </div>

        {/* Search & Filter Toggle */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cars..." className="bg-secondary border-0 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none w-full" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="glass-card p-6 mb-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
              <button onClick={clearFilters} className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"><X className="w-3 h-3" /> Clear All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <select value={brand} onChange={e => setBrand(e.target.value)} className={selectClass}>
                <option value="">All Brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={fuel} onChange={e => setFuel(e.target.value)} className={selectClass}>
                <option value="">All Fuel</option>
                {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={transmission} onChange={e => setTransmission(e.target.value)} className={selectClass}>
                <option value="">All Trans.</option>
                {transmissionTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={seats} onChange={e => setSeats(e.target.value)} className={selectClass}>
                <option value="">All Seats</option>
                {[2, 5, 7].map(s => <option key={s} value={s}>{s} Seats</option>)}
              </select>
              <div>
                <input type="range" min={30} max={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
                <p className="text-xs text-muted-foreground text-center">Max: ${maxPrice}/day</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} cars found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(car => <CarCard key={car.id} car={car} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No cars match your filters.</p>
            <button onClick={clearFilters} className="text-accent mt-2 text-sm">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
