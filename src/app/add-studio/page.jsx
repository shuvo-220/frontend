"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const categories = [
  "Photography Studio",
  "Film Stage",
  "Podcast Room",
  "Music Studio",
  "Workshop",
];

const availableAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Sound System",
  "Projector",
  "Kitchen",
  "Restroom",
  "Soundproof Room",
  "Photography Equipment",
];

const initialForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  amenities: [],
  overview: "",
};

export default function AddStudioPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Protect Private Route
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "imageUrl") {
      setImageError(false);
    }
  };

  // Select Amenities
  const handleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Submit Studio
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first!");
      router.replace("/login");
      return;
    }

    if (form.amenities.length === 0) {
      toast.error("Please select at least one amenity.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/add-listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          hourlyRate: Number(form.hourlyRate),
          securityDeposit: Number(form.securityDeposit),
          maxCapacity: Number(form.maxCapacity),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add studio.");
      }

      toast.success("Studio listed successfully!");

      setForm(initialForm);

      setTimeout(() => {
        router.push("/my-listings");
      }, 700);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Auth Loading / Unauthorized State
  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Become a Host
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Add Your Studio
          </h1>

          <p className="text-base-content/60 mt-3">
            Share your creative space and start earning by hosting creators.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-base-100 rounded-2xl shadow-sm p-5 md:p-8 space-y-8"
        >

          {/* Studio Information */}
          <section className="space-y-5">
            <h2 className="text-xl font-bold border-b border-base-300 pb-3">
              Studio Information
            </h2>

            <div>
              <label className="label font-semibold">
                Studio Name *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Creative Photography Studio"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">
                Studio Category *
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-semibold">
                Studio Overview *
              </label>

              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                placeholder="Describe your studio, its features and what makes it special..."
                className="textarea textarea-bordered w-full min-h-32"
                required
              />
            </div>
          </section>

          {/* Location & Image */}
          <section className="space-y-5">
            <h2 className="text-xl font-bold border-b border-base-300 pb-3">
              Location & Images
            </h2>

            <div>
              <label className="label font-semibold">
                Studio Location *
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Dhanmondi, Dhaka"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">
                Studio Image URL *
              </label>

              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/studio-image.jpg"
                className="input input-bordered w-full"
                required
              />

              {form.imageUrl && !imageError && (
                <div className="mt-4">
                  <img
                    src={form.imageUrl}
                    alt="Studio Preview"
                    className="w-full h-60 object-cover rounded-xl"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

              {imageError && (
                <p className="text-error text-sm mt-2">
                  Unable to load image. Please check the image URL.
                </p>
              )}
            </div>
          </section>

          {/* Pricing & Capacity */}
          <section className="space-y-5">
            <h2 className="text-xl font-bold border-b border-base-300 pb-3">
              Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="label font-semibold">
                  Hourly Rate (৳) *
                </label>

                <input
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  placeholder="1000"
                  min="0"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-semibold">
                  Security Deposit (৳) *
                </label>

                <input
                  type="number"
                  name="securityDeposit"
                  value={form.securityDeposit}
                  onChange={handleChange}
                  placeholder="2000"
                  min="0"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-semibold">
                  Maximum Capacity *
                </label>

                <input
                  type="number"
                  name="maxCapacity"
                  value={form.maxCapacity}
                  onChange={handleChange}
                  placeholder="10"
                  min="1"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold border-b border-base-300 pb-3">
              Studio Amenities
            </h2>

            <p className="text-sm text-base-content/60">
              Select the facilities available in your studio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 p-3 rounded-lg border border-base-300 cursor-pointer hover:bg-base-200"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => handleAmenity(amenity)}
                    className="checkbox checkbox-primary"
                  />

                  <span className="text-sm font-medium">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-4 border-t border-base-300">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Publishing Studio...
                </>
              ) : (
                "Publish Studio"
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
