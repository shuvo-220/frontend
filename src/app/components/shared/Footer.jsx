'use client'
import Link from "next/link";
import Image from "next/image";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiMail,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const categories = [
  "Photography Studio",
  "Film Stage",
  "Podcast Room",
  "Music Studio",
  "Workshop",
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0c18] text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="StudioSpace Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />

              <span className="text-2xl font-extrabold text-white">
                Studio<span className="text-purple-500">Space</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Your creative journey starts here. Discover and book
              inspiring studios for photography, filmmaking,
              podcasting and more.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-lg bg-white/10 p-3 transition hover:bg-purple-600 hover:text-white"
              >
                <FiFacebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg bg-white/10 p-3 transition hover:bg-purple-600 hover:text-white"
              >
                <FiInstagram size={18} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="rounded-lg bg-white/10 p-3 transition hover:bg-purple-600 hover:text-white"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg bg-white/10 p-3 transition hover:bg-purple-600 hover:text-white"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-purple-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Popular Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm transition hover:text-purple-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Stay Connected
            </h3>

            <p className="mb-5 text-sm leading-7 text-gray-400">
              Stay updated with the latest creative spaces and
              StudioSpace news.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex overflow-hidden rounded-xl border border-white/20"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-purple-600 px-4 text-white transition hover:bg-purple-700"
              >
                <FiArrowRight size={20} />
              </button>
            </form>

            <div className="mt-6 space-y-4 text-sm text-gray-400">
              <p className="flex items-center gap-3">
                <FiMail className="text-purple-400" />
                support@studiospace.com
              </p>

              <p className="flex items-center gap-3">
                <FiPhone className="text-purple-400" />
                +880 123 456 789
              </p>

              <p className="flex items-center gap-3">
                <FiMapPin className="text-purple-400" />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link
              href="/terms"
              className="transition hover:text-purple-400"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-purple-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
