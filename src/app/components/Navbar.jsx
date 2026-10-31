
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar mx-auto max-w-7xl px-4 md:px-6">

        {/* Logo */}
        <div className="navbar-start flex gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="StudioSpace Logo"
              width={15}
              height={15}
              priority
              className="h-auto w-5 md:w-5"
            />
          </Link>

          <span className="font-extrabold text-lg">
            Studio
            <span className="text-purple-900">Space</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-medium ${
                      active
                        ? "text-primary font-bold"
                        : "text-base-content"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-end gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="btn btn-ghost"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="btn btn-primary text-white"
            >
              Register
            </Link>
          </div>

          {/* Mobile & Tablet Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn btn-ghost btn-circle"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {menuOpen && (
              <ul className="menu dropdown-content mt-3 w-56 rounded-box bg-base-100 p-3 shadow-lg">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <div className="divider my-1" />

                <li>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
