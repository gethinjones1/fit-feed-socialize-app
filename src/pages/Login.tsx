
import { useState } from "react";
import { supabase, isSupabaseReady } from "../lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!isSupabaseReady()) {
      setFormError("Authentication is not available. Please connect this project to Supabase.");
      return;
    }
    
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    navigate("/"); // Go to home page after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-purple to-light-purple">
      <form 
        onSubmit={handleLogin} 
        className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md glass"
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-primary">Log In</h2>
        
        {!isSupabaseReady() && (
          <Alert className="mb-6 border-amber-500 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
            <AlertDescription className="text-amber-700">
              This project is not connected to Supabase. Authentication will not work until you connect it.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="you@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Your secure password"
            />
          </div>
        </div>
        
        <Button 
          className="w-full mt-6"
          type="submit"
          disabled={loading || !isSupabaseReady()}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
        
        {formError && (
          <p className="text-red-600 text-sm mt-4">{formError}</p>
        )}
        
        <p className="text-center text-sm mt-6 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
