import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { carsData, Car } from "@/data/cars";
import { BarChart3, Car as CarIcon, Download, Edit, Eye, MessageSquare, Plus, Save, Star, Trash2, Users, X } from "lucide-react";

const AdminPage = () => {
  const { user, users, reviews, deleteReview } = useAuth();
  const [tab, setTab] = useState<"dashboard" | "cars" | "users" | "reviews" | "messages">("dashboard");
  const [editCar, setEditCar] = useState<Partial<Car> | null>(null);
  const [customCars, setCustomCars] = useState<Car[]>(() => {
    try { const d = localStorage.getItem("customCars"); return d ? JSON.parse(d) : []; } catch { return []; }
  });
  const [deletedCarIds, setDeletedCarIds] = useState<string[]>(() => {
    try { const d = localStorage.getItem("deletedCarIds"); return d ? JSON.parse(d) : []; } catch { return []; }
  });

  if (!user?.isAdmin) return <Navigate to="/login" />;

  const allCars = [...carsData.filter(c => !deletedCarIds.includes(c.id)), ...customCars];
  const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: BarChart3 },
    { id: "cars" as const, label: "Cars", icon: CarIcon },
    { id: "users" as const, label: "Users", icon: Users },
    { id: "reviews" as const, label: "Reviews", icon: Star },
    { id: "messages" as const, label: "Messages", icon: MessageSquare },
  ];

  const saveCustomCars = (cars: Car[]) => {
    setCustomCars(cars);
    localStorage.setItem("customCars", JSON.stringify(cars));
  };

  const saveDeletedIds = (ids: string[]) => {
    setDeletedCarIds(ids);
    localStorage.setItem("deletedCarIds", JSON.stringify(ids));
  };

  const handleDeleteCar = (carId: string) => {
    if (customCars.find(c => c.id === carId)) {
      saveCustomCars(customCars.filter(c => c.id !== carId));
    } else {
      saveDeletedIds([...deletedCarIds, carId]);
    }
  };

  const handleSaveCar = () => {
    if (!editCar?.name || !editCar?.brand || !editCar?.price) return;
    const car: Car = {
      id: editCar.id || `custom-${Date.now()}`,
      name: editCar.name || "",
      brand: editCar.brand || "",
      price: editCar.price || 0,
      image: editCar.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      images: editCar.images || [editCar.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800"],
      description: editCar.description || "",
      fuel: editCar.fuel || "Petrol",
      transmission: editCar.transmission || "Automatic",
      seats: editCar.seats || 5,
      mileage: editCar.mileage || "15 km/l",
      rating: editCar.rating || 4.5,
      reviews: editCar.reviews || 0,
      available: editCar.available ?? true,
      features: editCar.features || [],
      year: editCar.year || new Date().getFullYear(),
      ac: editCar.ac ?? true,
      gps: editCar.gps ?? true,
      bluetooth: editCar.bluetooth ?? true,
      insurance: editCar.insurance ?? true,
      category: editCar.category || "Sedan",
    };

    if (editCar.id) {
      // Editing existing custom car
      saveCustomCars(customCars.map(c => c.id === car.id ? car : c));
    } else {
      // Adding new
      saveCustomCars([...customCars, car]);
    }
    setEditCar(null);
  };

  const exportCSV = () => {
    const headers = ["Name", "Brand", "Price", "Fuel", "Transmission", "Seats", "Available"];
    const rows = allCars.map(c => [c.name, c.brand, c.price, c.fuel, c.transmission, c.seats, c.available]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cars-data.csv";
    a.click();
  };

  const inputClass = "bg-secondary border-0 rounded-xl px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary outline-none w-full";

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-3xl">Admin <span className="gold-text">Dashboard</span></h1>
          <button onClick={exportCSV} className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

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
              { label: "Total Cars", value: allCars.length, icon: CarIcon, color: "text-primary" },
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
              <p className="text-sm text-muted-foreground">{allCars.length} cars</p>
              <button onClick={() => setEditCar({ available: true, ac: true, gps: true, bluetooth: true, insurance: true, seats: 5, fuel: "Petrol", transmission: "Automatic", category: "Sedan", features: [] })} className="gold-gradient text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" /> Add Car
              </button>
            </div>

            {/* Edit/Add Modal */}
            {editCar && (
              <div className="glass-card p-6 mb-6 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">{editCar.id ? "Edit Car" : "Add New Car"}</h3>
                  <button onClick={() => setEditCar(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input value={editCar.name || ""} onChange={e => setEditCar({ ...editCar, name: e.target.value })} placeholder="Car Name *" className={inputClass} />
                  <input value={editCar.brand || ""} onChange={e => setEditCar({ ...editCar, brand: e.target.value })} placeholder="Brand *" className={inputClass} />
                  <input type="number" value={editCar.price || ""} onChange={e => setEditCar({ ...editCar, price: Number(e.target.value) })} placeholder="Price/day *" className={inputClass} />
                  <input value={editCar.image || ""} onChange={e => setEditCar({ ...editCar, image: e.target.value, images: [e.target.value] })} placeholder="Image URL" className={inputClass} />
                  <select value={editCar.fuel || "Petrol"} onChange={e => setEditCar({ ...editCar, fuel: e.target.value as Car["fuel"] })} className={inputClass}>
                    <option value="Petrol">Petrol</option><option value="Diesel">Diesel</option><option value="Electric">Electric</option><option value="Hybrid">Hybrid</option>
                  </select>
                  <select value={editCar.transmission || "Automatic"} onChange={e => setEditCar({ ...editCar, transmission: e.target.value as Car["transmission"] })} className={inputClass}>
                    <option value="Automatic">Automatic</option><option value="Manual">Manual</option>
                  </select>
                  <input type="number" value={editCar.seats || 5} onChange={e => setEditCar({ ...editCar, seats: Number(e.target.value) })} placeholder="Seats" className={inputClass} />
                  <select value={editCar.category || "Sedan"} onChange={e => setEditCar({ ...editCar, category: e.target.value as Car["category"] })} className={inputClass}>
                    <option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Sports">Sports</option><option value="Luxury">Luxury</option><option value="Compact">Compact</option>
                  </select>
                  <input type="number" value={editCar.year || new Date().getFullYear()} onChange={e => setEditCar({ ...editCar, year: Number(e.target.value) })} placeholder="Year" className={inputClass} />
                </div>
                <textarea value={editCar.description || ""} onChange={e => setEditCar({ ...editCar, description: e.target.value })} placeholder="Description" className={`${inputClass} h-20 resize-none mb-4`} />
                <input value={(editCar.features || []).join(", ")} onChange={e => setEditCar({ ...editCar, features: e.target.value.split(",").map(f => f.trim()).filter(Boolean) })} placeholder="Features (comma-separated)" className={`${inputClass} mb-4`} />
                <div className="flex flex-wrap gap-4 mb-4">
                  {(["available", "ac", "gps", "bluetooth", "insurance"] as const).map(key => (
                    <label key={key} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="checkbox" checked={!!editCar[key]} onChange={e => setEditCar({ ...editCar, [key]: e.target.checked })} className="accent-primary" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  ))}
                </div>
                <button onClick={handleSaveCar} className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" /> Save Car
                </button>
              </div>
            )}

            <div className="space-y-3">
              {allCars.map(car => (
                <div key={car.id} className="glass-card p-4 flex items-center gap-4">
                  <img src={car.image} alt={car.name} className="w-20 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{car.name}</p>
                    <p className="text-xs text-muted-foreground">{car.brand} · ${car.price}/day · {car.fuel}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${car.available ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                  {customCars.find(c => c.id === car.id) && (
                    <button onClick={() => setEditCar(car)} className="text-muted-foreground hover:text-accent transition-colors"><Edit className="w-4 h-4" /></button>
                  )}
                  <button onClick={() => handleDeleteCar(car.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
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
              const car = allCars.find(c => c.id === r.carId);
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
