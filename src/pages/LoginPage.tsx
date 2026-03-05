import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) nav("/");
    else setError("Invalid email or password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="glass-card p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl mb-2">Welcome <span className="gold-text">Back</span></h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-destructive/10 text-destructive text-sm px-4 py-2 rounded-lg">{error}</div>}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground" />
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="bg-secondary border-0 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-primary outline-none text-foreground pr-10" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
          <button type="submit" className="gold-gradient text-primary-foreground w-full py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-6">
          Don't have an account? <Link to="/register" className="text-accent hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
