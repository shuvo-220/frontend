
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  // Fetch My Bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/my-bookings', {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch bookings");
      }

      setBookings(result.data || []);
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Cancel Booking
  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      setCancelingId(bookingId);

      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Booking cancellation failed");
      }

      toast.success("Booking cancelled successfully!");

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setCancelingId(null);
    }
  };

  // Date Format
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Your Reservations
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            My Bookings
          </h1>

          <p className="text-base-content/60 mt-2">
            Manage and track all your studio reservations.
          </p>
        </div>

        {/* Booking Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
            <p className="text-base-content/60 text-sm">Total Bookings</p>
            <h2 className="text-3xl font-bold mt-2">{bookings.length}</h2>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
            <p className="text-base-content/60 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-warning mt-2">
              {bookings.filter((b) => b.status === "Pending").length}
            </h2>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
            <p className="text-base-content/60 text-sm">Confirmed</p>
            <h2 className="text-3xl font-bold text-success mt-2">
              {bookings.filter((b) => b.status === "Confirmed").length}
            </h2>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-base-100 rounded-2xl p-10 text-center shadow-sm">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-xl font-bold">
              No Bookings Yet
            </h2>

            <p className="text-base-content/60 mt-2">
              You haven't booked any studios yet.
            </p>

            <a
              href="/studios"
              className="btn btn-primary mt-6"
            >
              Explore Studios
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-base-100 rounded-2xl p-5 md:p-7 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  {/* Studio Information */}
                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.studioTitle || "Studio Booking"}
                    </h2>

                    <p className="text-sm text-base-content/60 mt-2">
                      Host: {booking.hostName || "N/A"}
                    </p>

                    <p className="text-sm text-base-content/60 mt-1">
                      Booking ID: {booking._id}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`badge badge-lg ${
                        booking.status === "Confirmed"
                          ? "badge-success"
                          : booking.status === "Cancelled"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="divider my-4"></div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                  <div>
                    <p className="text-sm text-base-content/50">
                      Start Date
                    </p>
                    <p className="font-semibold mt-1">
                      {formatDate(booking.startAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">
                      End Date
                    </p>
                    <p className="font-semibold mt-1">
                      {formatDate(booking.endAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">
                      Duration
                    </p>
                    <p className="font-semibold mt-1">
                      {booking.totalHours ?? 0} Hours
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-base-content/50">
                      Total Cost
                    </p>
                    <p className="font-bold text-primary text-lg mt-1">
                      ৳{Number(booking.totalCost || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Cancel Button */}
                {booking.status === "Pending" && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelingId === booking._id}
                      className="btn btn-error btn-outline"
                    >
                      {cancelingId === booking._id ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Booking"
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
