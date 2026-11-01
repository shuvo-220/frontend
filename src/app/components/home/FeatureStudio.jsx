
import Link from "next/link";
import { FiMapPin, FiUsers, FiArrowRight } from "react-icons/fi";

async function getFeaturedStudios() {
  try {
    const res = await fetch( "https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return [];
    }

    const result = await res.json();

    console.log("Featured Studios API Response:", result);

    if (!result.success || !Array.isArray(result.data)) {
      console.error("Invalid API response:", result);
      return [];
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

        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-[3px] text-purple-600">
            Explore Our Spaces
          </p>

          <h2 className="text-3xl font-extrabold text-base-content md:text-5xl">
            Featured Creative Studios
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/60">
            Discover inspiring spaces designed for photography,
            filmmaking, podcasting and creative projects.
          </p>
        </div>

        {studios.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
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
                  <h3 className="mb-2 text-xl font-bold text-base-content">
                    {studio.title}
                  </h3>

                  <p className="mb-4 flex items-center gap-2 text-sm text-base-content/60">
                    <FiMapPin className="shrink-0 text-purple-600" size={16} />
                    {studio.location}
                  </p>

                  <div className="mb-5 flex items-center justify-between border-t border-base-300 pt-4">
                    <div>
                      <p className="text-xs text-base-content/50">
                        Starting from
                      </p>

                      <p className="text-xl font-bold text-purple-600">
                        ৳{studio.hourlyRate}
                        <span className="text-sm font-normal text-base-content/50">
                          /hour
                        </span>
                      </p>
                    </div>

                    <p className="flex items-center gap-2 text-sm text-base-content/60">
                      <FiUsers className="text-purple-600" size={16} />
                      {studio.maxCapacity} Guests
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
                  >
                    View Details
                    <FiArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-base-content/60">
            No studios available right now.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-purple-600 px-8 py-3 font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white"
          >
            Explore All Studios
            <FiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
