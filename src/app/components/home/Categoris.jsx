

import Link from "next/link";
import {
  FiCamera,
  FiFilm,
  FiMic,
  FiMusic,
  FiTool,
  FiArrowUpRight,
} from "react-icons/fi";

const categories = [
  {
    name: "Photography Studio",
    description: "Capture your best moments in professional spaces.",
    icon: FiCamera,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Film Stage",
    description: "Find the perfect stage for your next production.",
    icon: FiFilm,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Podcast Room",
    description: "Create quality podcasts in soundproof rooms.",
    icon: FiMic,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Music Studio",
    description: "Record and produce music in creative spaces.",
    icon: FiMusic,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Workshop",
    description: "Discover spaces for meetings and workshops.",
    icon: FiTool,
    color: "bg-green-100 text-green-600",
  },
];

export default function Categories() {
  return (
    <section className="bg-base-200/50 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-[3px] text-purple-600">
            Find Your Space
          </p>

          <h2 className="text-3xl font-extrabold text-base-content md:text-5xl">
            Explore By Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/60">
            Whatever your creative vision is, we have the perfect
            space to bring it to life.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-lg font-bold text-base-content">
                  {category.name}
                </h3>

                <p className="mb-5 text-sm leading-6 text-base-content/60">
                  {category.description}
                </p>

                <span className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                  Explore Studios
                  <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
