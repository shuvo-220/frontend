
import Link from "next/link";
import {
  FiSearch,
  FiCalendar,
  FiCheckCircle,
  FiCamera,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Explore Studios",
    description:
      "Browse our collection of creative studios and find the perfect space for your project.",
    icon: FiSearch,
  },
  {
    number: "02",
    title: "Choose Your Slot",
    description:
      "Select your preferred date and time according to your creative schedule.",
    icon: FiCalendar,
  },
  {
    number: "03",
    title: "Confirm Booking",
    description:
      "Submit your booking request and get ready for your creative session.",
    icon: FiCheckCircle,
  },
  {
    number: "04",
    title: "Create & Enjoy",
    description:
      "Visit your booked studio and bring your creative ideas to life.",
    icon: FiCamera,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-base-100 px-5 py-20 md:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 font-semibold uppercase tracking-[3px] text-purple-600">
            Simple Process
          </p>

          <h2 className="text-3xl font-extrabold text-base-content md:text-5xl">
            How StudioSpace Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/60">
            Booking your perfect creative space is simple.
            Just follow these four easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative text-center"
              >
                {/* Icon */}
                <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition duration-300 hover:-translate-y-2 hover:bg-purple-600 hover:text-white">
                  <Icon size={34} />

                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-4 border-base-100 bg-purple-600 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-base-content">
                  {step.title}
                </h3>

                <p className="mx-auto max-w-xs text-sm leading-7 text-base-content/60">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-12 text-center text-white md:px-12">
          <h3 className="text-2xl font-extrabold md:text-3xl">
            Ready to Start Creating?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-purple-100">
            Discover amazing creative spaces and book your
            perfect studio today.
          </p>

          <Link
            href="/studios"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-purple-700 transition hover:bg-purple-100"
          >
            Explore Studios
            <FiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
