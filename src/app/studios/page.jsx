"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiMapPin,
  FiUsers,
  FiArrowRight,
  FiSliders,
  FiX,
} from "react-icons/fi";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://studio-space-backend-oti5-k75tibq1f.vercel.app/api";

const categories = [
  "All Categories",
  "Photography Studio",
  "Film Stage",
  "Podcast Room",
  "Music Studio",
  "Workshop",
];

export default function StudiosPage() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const response = await fetch('https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios');

        if (!response.ok) {
          throw new Error("Failed to fetch studios");
        }

        const result = await response.json();

        const studioList = Array.isArray(result)
          ? result
          : result.data || result.studios || [];

        setStudios(studioList);
      } catch (error) {
        console.error("Studio fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const matchesSearch =
        studio.title?.toLowerCase().includes(search.toLowerCase()) ||
        studio.location?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        studio.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [studios, search, category]);

  return (
    <main className="min-h-screen bg-base-100">

      {/* Hero Header */}
      <section className="bg-[#11111f] px-5 py-20 text-center text-white md:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-purple-400">
          Explore Creative Spaces
        </p>

        <h1 className="text-4xl font-extrabold md:text-6xl">
          Find Your Perfect Studio
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-400">
          Discover inspiring creative spaces for photography,
          filmmaking, podcasting and more.
        </p>
      </section>

      {/* Studios Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">

        {/* Search and Filter */}
        <div className="mb-10 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">

            {/* Search */}
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                size={20}
              />

              <input
                type="text"
                placeholder="Search studio name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-base-300 bg-base-200/50 py-3 pl-12 pr-4 text-base-content outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FiSliders
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                size={18}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-base-300 bg-base-200/50 py-3 pl-12 pr-4 text-base-content outline-none transition focus:border-purple-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-base-content/60">
              Showing{" "}
              <span className="font-bold text-purple-600">
                {filteredStudios.length}
              </span>{" "}
              studios
            </p>

            {(search || category !== "All Categories") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Categories");
                }}
                className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                <FiX size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-base-300"
              >
                <div className="h-56 bg-base-300" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-base-300" />
                  <div className="h-4 w-1/2 rounded bg-base-300" />
                  <div className="h-10 rounded bg-base-300" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStudios.length > 0 ? (

          /* Studio Cards */
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white">
                    {studio.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="mb-3 text-xl font-bold text-base-content">
                    {studio.title}
                  </h2>

                  <p className="mb-5 flex items-center gap-2 text-sm text-base-content/60">
                    <FiMapPin className="shrink-0 text-purple-600" />
                    {studio.location}
                  </p>

                  <div className="mb-5 flex items-center justify-between border-t border-base-300 pt-4">
                    <div>
                      <p className="text-xs text-base-content/50">
                        Hourly Rate
                      </p>

                      <p className="text-xl font-bold text-purple-600">
                        ৳{studio.hourlyRate}
                        <span className="text-sm font-normal text-base-content/50">
                          /hour
                        </span>
                      </p>
                    </div>

                    <p className="flex items-center gap-2 text-sm text-base-content/60">
                      <FiUsers className="text-purple-600" />
                      {studio.maxCapacity} Guests
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
                  >
                    View Details
                    <FiArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="rounded-2xl border border-dashed border-base-300 py-20 text-center">
            <FiSearch
              size={45}
              className="mx-auto mb-5 text-base-content/30"
            />

            <h3 className="text-xl font-bold text-base-content">
              No Studios Found
            </h3>

            <p className="mt-2 text-sm text-base-content/60">
              Try changing your search or category filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
              }}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
