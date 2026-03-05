import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isAdmin: boolean;
  favorites: string[];
  rentalHistory: { carId: string; date: string; status: string }[];
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  reviews: Review[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  toggleFavorite: (carId: string) => void;
  addReview: (carId: string, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  getCarReviews: (carId: string) => Review[];
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

const ADMIN: User = { id: "admin", name: "Admin", email: "admin@carrental.com", phone: "+250792737675", isAdmin: true, favorites: [], rentalHistory: [] };

const getStored = <T,>(key: string, fallback: T): T => {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; } catch { return fallback; }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getStored("currentUser", null));
  const [users, setUsers] = useState<User[]>(() => getStored("users", []));
  const [reviews, setReviews] = useState<Review[]>(() => getStored("reviews", []));
  const [passwords] = useState<Record<string, string>>(() => getStored("passwords", { "admin@carrental.com": "admin123" }));

  useEffect(() => { localStorage.setItem("users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { if (user) localStorage.setItem("currentUser", JSON.stringify(user)); else localStorage.removeItem("currentUser"); }, [user]);

  const login = (email: string, password: string) => {
    if (email === "admin@carrental.com" && password === "admin123") { setUser(ADMIN); return true; }
    const stored = passwords[email];
    if (stored === password) {
      const u = users.find(u => u.email === email);
      if (u) { setUser(u); return true; }
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    if (users.find(u => u.email === email) || email === "admin@carrental.com") return false;
    const newUser: User = { id: Date.now().toString(), name, email, phone, isAdmin: false, favorites: [], rentalHistory: [] };
    setUsers(prev => [...prev, newUser]);
    const p = { ...passwords, [email]: password };
    localStorage.setItem("passwords", JSON.stringify(p));
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const toggleFavorite = (carId: string) => {
    if (!user) return;
    const updated = { ...user, favorites: user.favorites.includes(carId) ? user.favorites.filter(f => f !== carId) : [...user.favorites, carId] };
    setUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const addReview = (carId: string, rating: number, comment: string) => {
    if (!user) return;
    const review: Review = { id: Date.now().toString(), carId, userId: user.id, userName: user.name, rating, comment, date: new Date().toISOString() };
    setReviews(prev => [...prev, review]);
  };

  const deleteReview = (reviewId: string) => setReviews(prev => prev.filter(r => r.id !== reviewId));
  const getCarReviews = (carId: string) => reviews.filter(r => r.carId === carId);

  return (
    <AuthContext.Provider value={{ user, users, reviews, login, register, logout, toggleFavorite, addReview, deleteReview, getCarReviews }}>
      {children}
    </AuthContext.Provider>
  );
};
