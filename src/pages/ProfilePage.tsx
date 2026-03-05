import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Clock, Heart, LogOut, Mail, MessageSquare, Phone, User } from "lucide-react";

const ProfilePage = () => {
  const { user, logout, reviews } = useAuth();
  if (!user) return <Navigate to="/login" />;

  const userReviews = reviews.filter(r => r.userId === user.id);

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="glass-card p-8 text-center mb-8">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
            {user.name[0]}
          </div>
          <h1 className="font-display font-bold text-2xl">{user.name}</h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-primary" /> {user.favorites.length} Favorites</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-accent" /> {userReviews.length} Reviews</span>
          </div>
        </div>

        {/* Info */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-display font-semibold mb-4">Account Info</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3"><User className="w-4 h-4 text-primary" /> <span className="text-sm">{user.name}</span></div>
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> <span className="text-sm">{user.email}</span></div>
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> <span className="text-sm">{user.phone}</span></div>
          </div>
        </div>

        {/* Rental History */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Rental History</h3>
          {user.rentalHistory.length > 0 ? (
            user.rentalHistory.map((r, i) => <div key={i} className="text-sm text-muted-foreground">{r.carId} - {r.date}</div>)
          ) : (
            <p className="text-sm text-muted-foreground">No rental history yet.</p>
          )}
        </div>

        <button onClick={logout} className="w-full flex items-center justify-center gap-2 border border-destructive/30 text-destructive px-6 py-3 rounded-xl font-semibold hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
