"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiMapPin,
  FiUsers,
  FiClock,
  FiShield,
  FiCheckCircle,
  FiArrowLeft,
  FiCalendar,
  FiStar,
  FiCamera,
} from "react-icons/fi";

export default function StudioDetailsPage() {
  const { id } = useParams();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchStudio = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios/${id}`);

        if (!response.ok) {
          throw new Error("Studio not found");
        }

        const result = await response.json();

        const studioData =
          result.data || result.studio || result;

        setStudio(studioData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl animate-pulse px-5 py-16">
        <div className="mb-8 h-6 w-32 rounded bg-base-300" />
        <div className="h-80 rounded-2xl bg-base-300 md:h-[450px]" />
        <div className="mt-8 h-8 w-1/2 rounded bg-base-300" />
        <div className="mt-4 h-5 w-1/3 rounded bg-base-300" />
        <div className="mt-8 h-40 rounded-2xl bg-base-300" />
      </main>
    );
  }

  if (error || !studio) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
        <FiCamera size={55} className="mb-5 text-base-content/30" />

        <h1 className="text-3xl font-bold">
          Studio Not Found
        </h1>

        <p className="mt-3 text-base-content/60">
          This studio may have been removed or does not exist.
        </p>

        <Link
          href="/studios"
          className="mt-7 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Explore Studios
        </Link>
      </main>
    );
  }

  const amenities = Array.isArray(studio.amenities)
    ? studio.amenities
    : [];

  return (
    <main className="min-h-screen bg-base-100">

      {/* Hero Image */}
      <section className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-base-content/60 transition hover:text-purple-600"
        >
          <FiArrowLeft />
          Back to Studios
        </Link>

        <div className="relative h-[300px] overflow-hidden rounded-2xl md:h-[480px]">
          <img
            src={studio.imageUrl}
            alt={studio.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-10 md:left-10">
            <span className="mb-3 inline-block rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold">
              {studio.category}
            </span>

            <h1 className="text-3xl font-extrabold md:text-5xl">
              {studio.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-gray-200 md:text-base">
              <FiMapPin />
              {studio.location}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 md:px-8">

        {/* Left Content */}
        <div className="space-y-10 md:col-span-2">

          {/* Studio Overview */}
          <div>
            <h2 className="text-2xl font-bold">
              About This Studio
            </h2>

            <p className="mt-4 leading-8 text-base-content/70">
              {studio.overview || "No studio overview available."}
            </p>
          </div>

          {/* Studio Information */}
          <div>
            <h2 className="mb-5 text-2xl font-bold">
              Studio Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-base-300 p-5">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                  <FiUsers size={22} />
                </div>
                <div>
                  <p className="text-sm text-base-content/50">
                    Maximum Capacity
                  </p>
                  <p className="font-bold">
                    {studio.maxCapacity} Guests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-base-300 p-5">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                  <FiClock size={22} />
                </div>
                <div>
                  <p className="text-sm text-base-content/50">
                    Booking Type
                  </p>
                  <p className="font-bold">
                    Hourly Booking
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-base-300 p-5">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                  <FiShield size={22} />
                </div>
                <div>
                  <p className="text-sm text-base-content/50">
                    Security Deposit
                  </p>
                  <p className="font-bold">
                    ৳{studio.securityDeposit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-base-300 p-5">
                <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
                  <FiCamera size={22} />
                </div>
                <div>
                  <p className="text-sm text-base-content/50">
                    Studio Category
                  </p>
                  <p className="font-bold">
                    {studio.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="mb-5 text-2xl font-bold">
              Studio Amenities
            </h2>

            {amenities.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {amenities.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-3 text-base-content/70"
                  >
                    <FiCheckCircle className="shrink-0 text-purple-600" />
                    {amenity}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base-content/50">
                No amenities listed.
              </p>
            )}
          </div>

          {/* Host Information */}
          <div className="rounded-2xl border border-base-300 p-6">
            <h2 className="mb-5 text-2xl font-bold">
              Hosted By
            </h2>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700">
                {studio.hostName?.charAt(0)?.toUpperCase() || "H"}
              </div>

              <div>
                <p className="font-bold">
                  {studio.hostName || "Studio Host"}
                </p>
                <p className="text-sm text-base-content/50">
                  Studio Host
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="mb-3 text-2xl font-bold">
              Reviews & Ratings
            </h2>

            <div className="flex items-center gap-2 text-base-content/60">
              <FiStar className="text-yellow-500" />
              <p className="text-sm">
                Reviews will be available soon.
              </p>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside>
          <div className="sticky top-28 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg">
            <p className="text-sm text-base-content/50">
              Starting from
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-extrabold text-purple-600">
                ৳{studio.hourlyRate}
              </span>

              <span className="pb-1 text-sm text-base-content/50">
                / hour
              </span>
            </div>

            <div className="my-6 space-y-4 border-y border-base-300 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Hourly Rate
                </span>
                <span className="font-semibold">
                  ৳{studio.hourlyRate}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Security Deposit
                </span>
                <span className="font-semibold">
                  ৳{studio.securityDeposit}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/60">
                  Capacity
                </span>
                <span className="font-semibold">
                  {studio.maxCapacity} Guests
                </span>
              </div>
            </div>

            <Link
              href={`/studios/${id}/book`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-4 font-bold text-white transition hover:bg-purple-700"
            >
              <FiCalendar />
              Book This Studio
            </Link>

            <p className="mt-4 text-center text-xs text-base-content/50">
              Secure your creative space with StudioSpace.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
