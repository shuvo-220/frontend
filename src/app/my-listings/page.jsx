"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Protect Private Route
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  // Fetch My Studios
  const fetchMyStudios = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/my-listings`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch studios");
      }

      setStudios(result.data || []);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchMyStudios();
    }
  }, [isPending, session?.user]);

  // Delete Studio
  const handleDelete = async (studioId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this studio listing?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(studioId);

      const response = await fetch(
        `${API_URL}/studios/${studioId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete studio");
      }

      toast.success("Studio deleted successfully!");

      setStudios((prev) =>
        prev.filter((studio) => studio._id !== studioId)
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  // Format Price
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-BD");
  };

  // Authentication Loading
  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  // Page Loading
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Host Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              My Studio Listings
            </h1>

            <p className="text-base-content/60 mt-2">
              Manage all your creative studio listings.
            </p>
          </div>

          <button
            onClick={() => router.push("/add-studio")}
            className="btn btn-primary"
          >
            + Add New Studio
          </button>
        </div>

        {/* Statistics */}
        <div className="bg-base-100 rounded-2xl p-6 shadow-sm mb-8">
          <p className="text-sm text-base-content/60">
            Total Studio Listings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {studios.length}
          </h2>
        </div>

        {/* Empty State */}
        {studios.length === 0 ? (
          <div className="bg-base-100 rounded-2xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">🏢</div>

            <h2 className="text-2xl font-bold">
              No Studios Listed Yet
            </h2>

            <p className="text-base-content/60 mt-2">
              Start sharing your creative space with others.
            </p>

            <button
              onClick={() => router.push("/add-studio")}
              className="btn btn-primary mt-6"
            >
              Add Your First Studio
            </button>
          </div>
        ) : (

          /* Studio Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="card bg-base-100 shadow-sm overflow-hidden"
              >
                {/* Image */}
                <figure className="h-56">
                  <img
                    src={studio.imageUrl}
                    alt={studio.title}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="card-body">

                  {/* Category */}
                  <div className="flex justify-between items-center gap-2">
                    <span className="badge badge-primary badge-outline">
                      {studio.category}
                    </span>

                    <span className="text-xs text-base-content/50">
                      {new Date(studio.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="card-title mt-2">
                    {studio.title}
                  </h2>

                  {/* Location */}
                  <p className="text-sm text-base-content/60">
                    📍 {studio.location}
                  </p>

                  {/* Pricing */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-base-200 rounded-lg p-3">
                      <p className="text-xs text-base-content/60">
                        Hourly Rate
                      </p>

                      <p className="font-bold text-primary mt-1">
                        ৳{formatPrice(studio.hourlyRate)}
                      </p>
                    </div>

                    <div className="bg-base-200 rounded-lg p-3">
                      <p className="text-xs text-base-content/60">
                        Security Deposit
                      </p>

                      <p className="font-bold mt-1">
                        ৳{formatPrice(studio.securityDeposit)}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex justify-between text-sm mt-4">
                    <span className="text-base-content/60">
                      Maximum Capacity
                    </span>

                    <span className="font-semibold">
                      {studio.maxCapacity} People
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">
                      Amenities
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {studio.amenities?.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="badge badge-ghost"
                        >
                          {amenity}
                        </span>
                      ))}

                      {studio.amenities?.length > 3 && (
                        <span className="badge badge-ghost">
                          +{studio.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="card-actions grid grid-cols-2 mt-6">
                    <button
                      onClick={() =>
                        router.push(`/studios/edit/${studio._id}`)
                      }
                      className="btn btn-outline btn-primary"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(studio._id)}
                      disabled={deletingId === studio._id}
                      className="btn btn-error btn-outline"
                    >
                      {deletingId === studio._id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
