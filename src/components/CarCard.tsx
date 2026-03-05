import { Link } from "react-router-dom";
import { Car } from "@/data/cars";
import { useAuth } from "@/contexts/AuthContext";
import { Fuel, Heart, Settings2, Star, Users } from "lucide-react";

const CarCard = ({ car }: { car: Car }) => {
  const { user, toggleFavorite } = useAuth();
  const isFav = user?.favorites.includes(car.id);

  return (
    <div className="glass-card-hover group overflow-hidden">
      <div className="relative overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {!car.available && (
          <div className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground text-xs px-2.5 py-1 rounded-full font-medium">Unavailable</div>
        )}
        {user && (
          <button onClick={(e) => { e.preventDefault(); toggleFavorite(car.id); }} className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${isFav ? "bg-primary/20 text-primary" : "bg-background/30 text-foreground/60 hover:text-primary"}`}>
            <Heart className={`w-4 h-4 ${isFav ? "fill-primary" : ""}`} />
          </button>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="gold-text font-display font-bold text-xl">${car.price}</span>
          <span className="text-muted-foreground text-xs">/day</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-semibold text-foreground">{car.name}</h3>
          <p className="text-xs text-muted-foreground">{car.brand} · {car.year}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Settings2 className="w-3.5 h-3.5" />{car.transmission}</span>
          <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" />{car.fuel}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{car.seats}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{car.rating}</span>
            <span className="text-xs text-muted-foreground">({car.reviews})</span>
          </div>
          <Link to={`/cars/${car.id}`} className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
