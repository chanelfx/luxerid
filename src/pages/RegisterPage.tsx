import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserPlus } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (register(name, email, phone, password)) nav("/");
    else setError("Email already exists");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="glass-card p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl mb-2">Create <span className="gold-text">Account</span></h1>
          <p className="text-sm text-muted-foreground">Join us and start renting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-destructive/10 text-destructive text-sm px-4 py-2 rounded-lg">{error}</div>}
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
          <button type="submit" className="gold-gradient text-primary-foreground w-full py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> Create Account
          </button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
