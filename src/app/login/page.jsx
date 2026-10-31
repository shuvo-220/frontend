"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
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

  // Email and Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: form.email.trim(),
        password: form.password,
        callbackURL: "http://localhost:3000/",
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/",
      });

      if (error) {
        throw new Error(error.message || "Google login failed");
      }
    } catch (error) {
      toast.error(error.message || "Google authentication failed");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Welcome Back!
          </h1>

          <p className="text-base-content/60 mt-2">
            Login to your StudioSpace account.
          </p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="btn btn-outline w-full mb-6"
        >
          <FaGoogle />

          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>

        <div className="divider">OR LOGIN WITH EMAIL</div>

        {/* Email Login */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="label">
              <span className="label-text font-medium">
                Email Address
              </span>
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
                Password
              </span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-base-content/70">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </main>
  );
}

