
import { useState } from "react";
import { supabase, isSupabaseReady } from "../lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Mail, Lock } from "lucide-react";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    
    if (!isSupabaseReady()) {
      setFormError("Authentication is not available. Please connect this project to Supabase.");
      return;
    }
    
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (error) {
      setFormError(error.message);
      return;
    }
    if (data?.user) {
      setFormSuccess("Check your email for a confirmation link!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fitness-accent/20 to-fitness-primary/20">
      <div className="w-full max-w-md px-8 py-12">
        <form 
          onSubmit={handleSignUp} 
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500">Join us to start your fitness journey</p>
          </div>
          
          {!isSupabaseReady() && (
            <Alert className="mb-6 border-amber-500 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
              <AlertDescription className="text-amber-700">
                This project is not connected to Supabase. Authentication will not work until you connect it.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  placeholder="you@email.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  placeholder="Create a secure password"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
            type="submit"
            disabled={loading || !isSupabaseReady()}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
          
          {formSuccess && (
            <p className="text-green-600 text-sm text-center">{formSuccess}</p>
          )}
          {formError && (
            <p className="text-red-600 text-sm text-center">{formError}</p>
          )}
          
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-fitness-primary hover:text-fitness-primary/90 font-medium">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
