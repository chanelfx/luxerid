import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { carsData } from "@/data/cars";
import { useAuth } from "@/contexts/AuthContext";
import CarCard from "@/components/CarCard";
import StarRating from "@/components/StarRating";
import { Bluetooth, ChevronLeft, ChevronRight, Fuel, Heart, MapPin, MessageCircle, Phone, Settings2, Shield, Snowflake, Star, Users } from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const car = carsData.find(c => c.id === id);
  const { user, toggleFavorite, addReview, getCarReviews } = useAuth();
  const [imgIdx, setImgIdx] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!car) return <div className="min-h-screen pt-24 text-center text-muted-foreground">Car not found</div>;

  const reviews = getCarReviews(car.id);
  const isFav = user?.favorites.includes(car.id);
  const similar = carsData.filter(c => c.category === car.category && c.id !== car.id).slice(0, 3);
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in renting the ${car.name} ($${car.price}/day)`);

  const handleReview = () => {
    if (!comment.trim()) return;
    addReview(car.id, rating, comment);
    setComment("");
    setRating(5);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        {/* Gallery */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img src={car.images[imgIdx]} alt={car.name} className="w-full h-64 md:h-[500px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          {car.images.length > 1 && (
            <>
              <button onClick={() => setImgIdx(i => (i - 1 + car.images.length) % car.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center text-foreground"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => setImgIdx(i => (i + 1) % car.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center text-foreground"><ChevronRight className="w-5 h-5" /></button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {car.images.map((_, i) => <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full ${i === imgIdx ? "bg-primary w-6" : "bg-foreground/30"} transition-all`} />)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display font-bold text-3xl">{car.name}</h1>
                  <p className="text-muted-foreground">{car.brand} · {car.year}</p>
                </div>
                <div className="text-right">
                  <div className="gold-text font-display font-bold text-3xl">${car.price}</div>
                  <span className="text-xs text-muted-foreground">per day</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{car.rating}</span>
                <span className="text-muted-foreground text-sm">({car.reviews + reviews.length} reviews)</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${car.available ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>
                  {car.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{car.description}</p>

            {/* Specs */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Settings2, label: "Transmission", value: car.transmission },
                  { icon: Fuel, label: "Fuel", value: car.fuel },
                  { icon: Users, label: "Seats", value: car.seats },
                  { icon: Snowflake, label: "A/C", value: car.ac ? "Yes" : "No" },
                  { icon: MapPin, label: "GPS", value: car.gps ? "Yes" : "No" },
                  { icon: Bluetooth, label: "Bluetooth", value: car.bluetooth ? "Yes" : "No" },
                  { icon: Shield, label: "Insurance", value: car.insurance ? "Included" : "No" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><s.icon className="w-4 h-4 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-medium">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map(f => <span key={f} className="bg-secondary text-sm px-3 py-1.5 rounded-lg text-muted-foreground">{f}</span>)}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Reviews</h3>
              {user && (
                <div className="mb-6 space-y-3 border-b border-border pb-6">
                  <StarRating rating={rating} onRate={setRating} interactive />
                  <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your review..." className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full h-24 resize-none focus:ring-2 focus:ring-primary outline-none text-foreground" />
                  <button onClick={handleReview} className="gold-gradient text-primary-foreground px-6 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">Submit Review</button>
                </div>
              )}
              {reviews.length > 0 ? reviews.map(r => (
                <div key={r.id} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">{r.userName[0]}</div>
                    <div>
                      <p className="text-sm font-medium">{r.userName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto"><StarRating rating={r.rating} /></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              )) : <p className="text-sm text-muted-foreground">No reviews yet.</p>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass-card p-6 space-y-3 sticky top-20">
              <a href={`https://wa.me/250792737675?text=${whatsappMsg}`} target="_blank" rel="noopener" className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-foreground px-6 py-3 rounded-xl font-semibold transition-colors">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a href="tel:+250792737675" className="w-full flex items-center justify-center gap-2 sky-gradient text-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                <Phone className="w-5 h-5" /> Call Admin
              </a>
              {user && (
                <button onClick={() => toggleFavorite(car.id)} className={`w-full flex items-center justify-center gap-2 border rounded-xl px-6 py-3 font-semibold transition-all ${isFav ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                  <Heart className={`w-5 h-5 ${isFav ? "fill-primary" : ""}`} /> {isFav ? "Saved" : "Add to Favorites"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl mb-6">Similar <span className="gold-text">Cars</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map(c => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
