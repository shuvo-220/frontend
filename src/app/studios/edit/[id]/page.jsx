"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const categories = [
  "Photography Studio",
  "Film Stage",
  "Podcast Room",
  "Music Studio",
  "Workshop",
];

const initialForm = {
  title: "",
  category: "Photography Studio",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  amenities: "",
  overview: "",
};

export default function EditStudioPage() {
  const router = useRouter();
  const params = useParams();
  const studioId = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (isPending || !session?.user || !studioId) return;

    const fetchStudio = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios/${studioId}`,
          { credentials: "include" }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Studio not found");
        }

        const studio = result.data;

        setForm({
          title: studio.title || "",
          category: studio.category || "Photography Studio",
          hourlyRate: studio.hourlyRate ?? "",
          securityDeposit: studio.securityDeposit ?? "",
          maxCapacity: studio.maxCapacity ?? "",
          location: studio.location || "",
          imageUrl: studio.imageUrl || "",
          amenities: (studio.amenities || []).join(", "),
          overview: studio.overview || "",
        });
      } catch (error) {
        toast.error(error.message || "Failed to load studio");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [isPending, session, studioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const updatedData = {
        title: form.title.trim(),
        category: form.category,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        maxCapacity: Number(form.maxCapacity),
        location: form.location.trim(),
        imageUrl: form.imageUrl.trim(),
        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        overview: form.overview.trim(),
      };

      const response = await fetch(`https://studio-space-backend-oti5-k75tibq1f.vercel.app/api/studios/edit/${studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Update failed");
      }

      toast.success("Studio updated successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Studio</h1>
          <p className="mt-2 text-base-content/60">
            Update your studio information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-base-100 p-6 shadow-lg md:p-8"
        >
          <div>
            <label className="mb-2 block font-medium">Studio Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Enter studio title"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium">Hourly Rate</label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                min="0"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Security Deposit
              </label>
              <input
                type="number"
                name="securityDeposit"
                value={form.securityDeposit}
                onChange={handleChange}
                min="0"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Max Capacity</label>
              <input
                type="number"
                name="maxCapacity"
                value={form.maxCapacity}
                onChange={handleChange}
                min="1"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Amenities (comma separated)
            </label>
            <input
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="LED Lighting, Tripod, Air Conditioning"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Overview</label>
            <textarea
              name="overview"
              value={form.overview}
              onChange={handleChange}
              required
              rows={5}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row">
            <button
              type="submit"
              disabled={updating}
              className="btn btn-primary flex-1"
            >
              {updating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Studio"
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
