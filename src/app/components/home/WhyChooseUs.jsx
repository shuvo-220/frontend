
import Link from "next/link";
import {
  FiShield,
  FiClock,
  FiCreditCard,
  FiHeadphones,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "Quality Creative Spaces",
    description:
      "Discover inspiring studios equipped with facilities for your creative projects.",
  },
  {
    icon: FiClock,
    title: "Flexible Booking",
    description:
      "Choose your preferred date and time. Book a studio that fits your schedule.",
  },
  {
    icon: FiCreditCard,
    title: "Transparent Pricing",
    description:
      "View hourly rates and security deposits before submitting your booking.",
  },
  {
    icon: FiHeadphones,
    title: "Dedicated Support",
    description:
      "Get help when you need it throughout your studio booking journey.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-base-200/50 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold uppercase tracking-[3px] text-purple-600">
            Why StudioSpace
          </p>

          <h2 className="text-3xl font-extrabold text-base-content md:text-5xl">
            Everything You Need to Create
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/60">
            We make finding and booking creative spaces easier
            so you can focus on what matters most — your creativity.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-base-300 bg-base-100 p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition duration-300 group-hover:bg-purple-600 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <span className="mb-3 block text-sm font-bold tracking-widest text-purple-600">
                  0{index + 1}
                </span>

                <h3 className="mb-3 text-lg font-bold text-base-content">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-base-content/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Host CTA */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-[#11111f] px-7 py-10 text-center md:flex-row md:px-12 md:text-left">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
              Become a Host
            </p>

            <h3 className="text-2xl font-extrabold text-white md:text-3xl">
              Have a Creative Space?
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
              List your studio on StudioSpace and connect with
              creators looking for their perfect workspace.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-7 py-4 font-semibold text-white transition hover:bg-purple-700"
          >
            Host Your Space
            <FiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
