import { useAuth } from "@/contexts/AuthContext";
import { carsData } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { Navigate } from "react-router-dom";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  const favCars = carsData.filter(c => user.favorites.includes(c.id));

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <h1 className="font-display font-bold text-3xl mb-2 flex items-center gap-3">
          <Heart className="w-7 h-7 text-primary fill-primary" /> My <span className="gold-text">Favorites</span>
        </h1>
        <p className="text-muted-foreground mb-8">{favCars.length} saved cars</p>
        {favCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favCars.map(c => <CarCard key={c.id} car={c} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">No favorites yet. Browse cars and add some!</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
