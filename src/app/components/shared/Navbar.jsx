"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { theme, toggleTheme, mounted } = useTheme();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const userName = user?.name?.trim() || "User";
  const userImage = user?.image;

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed");
      }

      setProfileOpen(false);
      setMenuOpen(false);

      toast.success("Logged out successfully!", {
        duration: 3000,
      });

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (link) => {
    if (link.href === "/") {
      return pathname === "/";
    }

    if (link.href.startsWith("/#")) {
      return false;
    }

    return (
      pathname === link.href ||
      pathname.startsWith(`${link.href}/`)
    );
  };

  const UserAvatar = ({ size = "h-10 w-10" }) => {
    const [imageError, setImageError] = useState(false);

    const firstLetter = userName.charAt(0).toUpperCase() || "U";

    return (
      <div
        className={`${size} shrink-0 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg`}
      >
        {userImage && !imageError ? (
          <img
            src={userImage}
            alt={userName}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          firstLetter
        )}
      </div>
    );
  };

  const ThemeButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg text-yellow-500" />
      )}
    </button>
  );

  const ProfileLinks = ({ onNavigate }) => (
    <>
      <li>
        <Link href="/add-studio" onClick={onNavigate}>
          Add New Studio
        </Link>
      </li>

      <li>
        <Link href="/my-listings" onClick={onNavigate}>
          My Studio Listings
        </Link>
      </li>

      <li>
        <Link href="/my-bookings" onClick={onNavigate}>
          My Bookings
        </Link>
      </li>

      <div className="divider my-1" />

      <li>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-error"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar mx-auto max-w-7xl px-4 md:px-6">

        {/* Logo */}
        <div className="navbar-start flex gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="StudioSpace Logo"
              width={40}
              height={40}
              priority
              className="h-8 w-8 object-contain"
            />
          </Link>

          <Link href="/" className="font-extrabold text-lg">
            Studio
            <span className="text-purple-900">Space</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-medium ${
                    isActive(link)
                      ? "text-primary font-bold"
                      : "text-base-content"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end gap-2">

          {/* Desktop Theme Toggle */}
          {mounted && (
            <div className="hidden lg:block">
              <ThemeButton onClick={toggleTheme} />
            </div>
          )}

          {!isPending && (
            <>
              {!user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost">
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="btn btn-primary text-white"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full hover:bg-base-200 p-1"
                  >
                    <UserAvatar />

                    <span className="font-medium max-w-28 truncate">
                      {userName}
                    </span>

                    <svg
                      className={`w-4 h-4 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </button>

                  {profileOpen && (
                    <ul className="menu absolute right-0 mt-3 w-56 rounded-box bg-base-100 p-3 shadow-xl border border-base-200">
                      <li className="menu-title">
                        <span>{userName}</span>
                      </li>

                      <ProfileLinks
                        onNavigate={() => setProfileOpen(false)}
                      />
                    </ul>
                  )}
                </div>
              )}
            </>
          )}

          {/* Mobile Menu */}
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
              <ul className="menu dropdown-content mt-3 w-64 rounded-box bg-base-100 p-3 shadow-xl border border-base-200">

                {/* Mobile Theme Toggle */}
                {mounted && (
                  <li>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3"
                    >
                      {theme === "light" ? (
                        <FaMoon />
                      ) : (
                        <FaSun className="text-yellow-500" />
                      )}

                      {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </button>
                  </li>
                )}

                {user && (
                  <>
                    <li className="menu-title">
                      <div className="flex items-center gap-3 py-2">
                        <UserAvatar size="h-10 w-10" />

                        <div className="min-w-0">
                          <p className="font-bold truncate">
                            {userName}
                          </p>

                          <p className="text-xs font-normal truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    <div className="divider my-1" />
                  </>
                )}

                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={isActive(link) ? "active" : ""}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                <div className="divider my-1" />

                {!isPending && (
                  <>
                    {!user ? (
                      <>
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
                      </>
                    ) : (
                      <ProfileLinks
                        onNavigate={() => setMenuOpen(false)}
                      />
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
