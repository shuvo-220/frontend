import Link from "next/link";
import { connection } from "next/server";
import { FiMapPin, FiUsers, FiArrowRight } from "react-icons/fi";

async function getFeaturedStudios() {
  await connection();

  try {
    const res = await fetch("https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch studios: ${res.status}`);
    }

    const result = await res.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error("Invalid API response");
    }

    return result.data.slice(0, 6);
  } catch (error) {
    console.error("Studio fetching error:", error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="bg-base-100 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-primary">
            Explore Our Collection
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Featured Studios
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
            Discover creative spaces designed to bring your ideas to life.
            Find the perfect studio for your next project.
          </p>
        </div>

        {/* Studios Grid */}
        {studios.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Studio Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-content">
                    {studio.category}
                  </span>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="mb-3 text-xl font-bold">
                    {studio.title}
                  </h3>

                  <div className="mb-3 flex items-center gap-2 text-sm text-base-content/70">
                    <FiMapPin />
                    <span>{studio.location}</span>
                  </div>

                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">
                      ৳{studio.hourlyRate}
                      <span className="text-sm font-normal text-base-content/60">
                        /hour
                      </span>
                    </p>

                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <FiUsers />
                      <span>{studio.maxCapacity} Guests</span>
                    </div>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-content transition hover:opacity-90"
                  >
                    View Details
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-base-content/70">
              No studios available right now.
            </p>
          </div>
        )}

        {/* View All Studios */}
        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-content"
          >
            Explore All Studios
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
