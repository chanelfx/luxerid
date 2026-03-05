import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { carsData, Car } from "@/data/cars";
import { BarChart3, Car as CarIcon, Edit, Eye, MessageSquare, Plus, Star, Trash2, Users, X } from "lucide-react";

const AdminPage = () => {
  const { user, users, reviews, deleteReview } = useAuth();
  const [tab, setTab] = useState<"dashboard" | "cars" | "users" | "reviews" | "messages">("dashboard");
  const [editCar, setEditCar] = useState<Car | null>(null);

  if (!user?.isAdmin) return <Navigate to="/login" />;

  const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "cars" as const, label: "Cars", icon: CarIcon },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "reviews" as const, label: "Reviews", icon: Star },
    { id: "messages" as const, label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <h1 className="font-display font-bold text-3xl mb-6">Admin <span className="gold-text">Dashboard</span></h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === "dashboard" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Cars", value: carsData.length, icon: CarIcon, color: "text-primary" },
              { label: "Total Users", value: users.length, icon: Users, color: "text-accent" },
              { label: "Total Reviews", value: reviews.length, icon: Star, color: "text-primary" },
              { label: "Messages", value: messages.length, icon: MessageSquare, color: "text-accent" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-6">
                <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
                <div className="font-display font-bold text-2xl">{s.value}</div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Cars */}
        {tab === "cars" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">{carsData.length} cars</p>
            </div>
            <div className="space-y-3">
              {carsData.map(car => (
                <div key={car.id} className="glass-card p-4 flex items-center gap-4">
                  <img src={car.image} alt={car.name} className="w-20 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{car.name}</p>
                    <p className="text-xs text-muted-foreground">{car.brand} · ${car.price}/day · {car.fuel}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${car.available ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                  <button className="text-muted-foreground hover:text-accent transition-colors"><Eye className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div className="space-y-3">
            {users.length > 0 ? users.map(u => (
              <div key={u.id} className="glass-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">{u.name[0]}</div>
                <div className="flex-1">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email} · {u.phone}</p>
                </div>
                <p className="text-xs text-muted-foreground">{u.favorites.length} favorites</p>
              </div>
            )) : <p className="text-muted-foreground">No users registered yet.</p>}
          </div>
        )}

        {/* Reviews */}
        {tab === "reviews" && (
          <div className="space-y-3">
            {reviews.length > 0 ? reviews.map(r => {
              const car = carsData.find(c => c.id === r.carId);
              return (
                <div key={r.id} className="glass-card p-4 flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{r.userName}</p>
                      <span className="text-xs text-muted-foreground">on {car?.name || "Unknown Car"}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                  <button onClick={() => deleteReview(r.id)} className="text-destructive/60 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              );
            }) : <p className="text-muted-foreground">No reviews yet.</p>}
          </div>
        )}

        {/* Messages */}
        {tab === "messages" && (
          <div className="space-y-3">
            {messages.length > 0 ? messages.map((m: any, i: number) => (
              <div key={i} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{m.name}</p>
                  <span className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{m.email}</p>
                <p className="text-sm text-foreground/80">{m.message}</p>
              </div>
            )) : <p className="text-muted-foreground">No messages yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
