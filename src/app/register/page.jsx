"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiArrowRight,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!/[A-Z]/.test(form.password)) {
      return toast.error(
        "Password must contain at least one uppercase letter"
      );
    }

    if (!/[a-z]/.test(form.password)) {
      return toast.error(
        "Password must contain at least one lowercase letter"
      );
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
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 
  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
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
    <main className="flex min-h-[85vh] items-center justify-center bg-base-200 px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-base-100 shadow-xl lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-purple-950 via-purple-800 to-indigo-900 p-10 text-white lg:flex">
          <div>
            <h2 className="text-3xl font-extrabold">
              Studio<span className="text-purple-300">Space</span>
            </h2>

            <p className="mt-3 text-purple-200">
              Find Your Creative Space
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Create.
              <br />
              Collaborate.
              <br />
              Inspire.
            </h1>

            <p className="mt-5 max-w-sm text-purple-200">
              Join a community of creators and discover the perfect
              space to bring your creative ideas to life.
            </p>
          </div>

          <p className="text-sm text-purple-300">
            © 2026 StudioSpace. All rights reserved.
          </p>
        </div>

        {/* Register Form */}
        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">

            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Create Account
              </h1>

              <p className="mt-2 text-base-content/60">
                Get started with StudioSpace today.
              </p>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={googleLoading || loading}
              className="btn btn-outline flex w-full items-center gap-3"
            >
              <FcGoogle size={21} />

              {googleLoading
                ? "Connecting to Google..."
                : "Continue with Google"}
            </button>

            {/* Divider */}
            <div className="divider my-6">OR REGISTER WITH EMAIL</div>

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="input input-bordered w-full pl-10"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full pl-10"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Profile Photo URL
                  <span className="ml-1 font-normal text-base-content/50">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />

                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full pl-10"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />

                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    className="input input-bordered w-full pl-10"
                    value={form.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                </div>

                <p className="mt-2 text-xs text-base-content/50">
                  Must contain uppercase, lowercase and at least 6 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="btn w-full border-none bg-purple-600 text-white hover:bg-purple-700"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-purple-600 hover:underline"
              >
                Login
              </Link>
            </p>

            <p className="mt-6 text-center text-xs text-base-content/50">
              By creating an account, you agree to our Terms of Service
              and Privacy Policy.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
