
import Link from "next/link";
import { FaHome, FaSearch, FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-base-200 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">

        <div className="relative mb-6">
          <h1 className="text-[120px] font-black leading-none tracking-tighter text-primary md:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-base-100 p-4 shadow-xl">
              <FaCompass className="text-4xl text-primary md:text-5xl" />
            </div>
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold md:text-4xl">
          Oops! Lost Your Creative Space?
        </h2>

        <p className="mx-auto mb-8 max-w-lg text-base-content/60">
          The page you're looking for doesn't exist or may have been moved.
          Don't worry, your next creative destination is just a click away.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn btn-primary gap-2"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="btn btn-outline gap-2"
          >
            <FaSearch />
            Explore Studios
          </Link>
        </div>

        <p className="mt-10 text-sm text-base-content/40">
          StudioSpace — Find your space. Create your story.
        </p>

      </div>
    </main>
  );
}
