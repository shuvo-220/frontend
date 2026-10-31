"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Email and Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      return toast.error("Please fill in all required fields");
    }

    if (!/[A-Z]/.test(form.password)) {
      return toast.error("Password must contain an uppercase letter");
    }

    if (!/[a-z]/.test(form.password)) {
      return toast.error("Password must contain a lowercase letter");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        image: form.image.trim() || undefined,
        callbackURL: "http://localhost:3000/login",
      });

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      toast.success("Registration successful! Please login.");

      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/login",
      });

      if (error) {
        throw new Error(error.message || "Google registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Google authentication failed");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Create Account
          </h1>

          <p className="text-base-content/60 mt-2">
            Join StudioSpace and explore creative spaces.
          </p>
        </div>

        {/* Google Registration */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={googleLoading || loading}
          className="btn btn-outline w-full mb-6"
        >
          <FaGoogle />

          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        <div className="divider">OR REGISTER WITH EMAIL</div>

        {/* Email Registration */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name *</span>
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email *</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">
                Profile Photo URL (Optional)
              </span>
            </label>

            <input
              type="url"
              name="image"
              placeholder="https://example.com/photo.jpg"
              value={form.image}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password *</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <p className="text-xs text-base-content/50 mt-2">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-primary w-full"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-base-content/70">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

