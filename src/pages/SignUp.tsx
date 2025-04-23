
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-purple to-light-gray">
      <form 
        onSubmit={handleSignUp} 
        className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md glass"
      >
        <h2 className="text-2xl font-semibold text-center mb-8 text-primary">Sign Up</h2>
        
        <div className="space-y-4">
          <div>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="you@email.com"
            />
          </div>
          
          <div>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              placeholder="At least 6 characters"
            />
          </div>
        </div>
        
        <Button 
          className="w-full mt-6"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </Button>
        
        {formSuccess && (
          <p className="text-green-700 text-sm mt-4">{formSuccess}</p>
        )}
        {formError && (
          <p className="text-red-600 text-sm mt-4">{formError}</p>
        )}
        
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
