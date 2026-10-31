"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiArrowLeft,
    FiCheckCircle,
} from "react-icons/fi";
import { toast } from "sonner";

export default function BookingPage() {
    const { id } = useParams();
    const router = useRouter();

    const [studio, setStudio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    )
        .toISOString()
        .split("T")[0];

    useEffect(() => {
        if (!id) return;

        const fetchStudio = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/studios/${id}`);
                if (!response.ok) throw new Error("Studio not found");

                const result = await response.json();
                setStudio(result.data || result.studio || result);
            } catch (error) {
                toast.error(error.message || "Could not load studio");
            } finally {
                setLoading(false);
            }
        };

        fetchStudio();
    }, [id]);

    const bookingDetails = useMemo(() => {
        if (!date || !startTime || !endTime) {
            return { hours: 0, rentalCost: 0, total: 0 };
        }

        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        const hours = (end - start) / (1000 * 60 * 60);

        if (hours <= 0) {
            return { hours: 0, rentalCost: 0, total: 0 };
        }

        const rentalCost = hours * Number(studio?.hourlyRate || 0);
        const deposit = Number(studio?.securityDeposit || 0);

        return {
            hours,
            rentalCost,
            total: rentalCost + deposit,
        };
    }, [date, startTime, endTime, studio]);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!date || !startTime || !endTime) {
            toast.error("Please select date and time");
            return;
        }

        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        if (start <= new Date()) {
            toast.error("Please select a future booking time");
            return;
        }

        if (end <= start) {
            toast.error("End time must be after start time");
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch('http://localhost:5000/api/bookings', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studioId: id,
                    startAt: start.toISOString(),
                    endAt: end.toISOString(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || result.error || "Booking failed"
                );
            }

            toast.success("Booking request submitted successfully!");

            router.push("/my-bookings");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-purple-600" />
            </main>
        );
    }

    if (!studio) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                <h1 className="text-3xl font-bold">Studio Not Found</h1>
                <Link
                    href="/studios"
                    className="mt-5 rounded-xl bg-purple-600 px-6 py-3 text-white"
                >
                    Explore Studios
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-base-200/40 px-5 py-12">
            <div className="mx-auto max-w-6xl">

                <Link
                    href={`/studios/${id}`}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-base-content/60 hover:text-purple-600"
                >
                    <FiArrowLeft />
                    Back to Studio Details
                </Link>

                <div className="mb-10">
                    <p className="font-semibold uppercase tracking-widest text-purple-600">
                        Reserve Your Space
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
                        Book Your Studio
                    </h1>

                    <p className="mt-3 text-base-content/60">
                        Choose your preferred date and time to reserve this creative space.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-5">

                    {/* Booking Form */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm lg:col-span-3 md:p-8">
                        <h2 className="mb-7 text-2xl font-bold">
                            Booking Information
                        </h2>

                        <form onSubmit={handleBooking} className="space-y-6">

                            <div>
                                <label className="mb-2 flex items-center gap-2 font-semibold">
                                    <FiCalendar className="text-purple-600" />
                                    Booking Date
                                </label>

                                <input
                                    type="date"
                                    min={localToday}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 outline-none focus:border-purple-600"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiClock className="text-purple-600" />
                                        Start Time
                                    </label>

                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 outline-none focus:border-purple-600"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 font-semibold">
                                        <FiClock className="text-purple-600" />
                                        End Time
                                    </label>

                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 outline-none focus:border-purple-600"
                                    />
                                </div>
                            </div>

                            {bookingDetails.hours > 0 && (
                                <div className="rounded-xl bg-purple-50 p-4 text-purple-900">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Booking Duration</span>
                                        <span className="font-bold">
                                            {bookingDetails.hours} hours
                                        </span>
                                    </div>
                                </div>
                            )}

                            {bookingDetails.hours === 0 &&
                                date &&
                                startTime &&
                                endTime && (
                                    <p className="text-sm text-red-500">
                                        End time must be later than start time.
                                    </p>
                                )}

                            <button
                                type="button"
                                onClick={handleBooking}
                                disabled={
                                    submitting ||
                                    !date ||
                                    !startTime ||
                                    !endTime ||
                                    bookingDetails.hours <= 0
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-4 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FiCheckCircle />
                                        Confirm Booking
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-base-content/50">
                                Your booking will be submitted for processing.
                            </p>
                        </form>
                    </div>

                    {/* Studio Summary */}
                    <div className="h-fit overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm lg:col-span-2">
                        <img
                            src={studio.imageUrl}
                            alt={studio.title}
                            className="h-52 w-full object-cover"
                        />

                        <div className="p-6">
                            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                {studio.category}
                            </span>

                            <h2 className="mt-4 text-xl font-bold">
                                {studio.title}
                            </h2>

                            <p className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                                <FiMapPin className="text-purple-600" />
                                {studio.location}
                            </p>

                            <div className="my-6 space-y-4 border-y border-base-300 py-5">

                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/60">
                                        Hourly Rate
                                    </span>
                                    <span className="font-semibold">
                                        ৳{studio.hourlyRate}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/60">
                                        Duration
                                    </span>
                                    <span className="font-semibold">
                                        {bookingDetails.hours} hours
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/60">
                                        Rental Cost
                                    </span>
                                    <span className="font-semibold">
                                        ৳{bookingDetails.rentalCost}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-base-content/60">
                                        Security Deposit
                                    </span>
                                    <span className="font-semibold">
                                        ৳{studio.securityDeposit}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="font-bold">Estimated Total</span>
                                <span className="text-2xl font-extrabold text-purple-600">
                                    ৳{bookingDetails.total}
                                </span>
                            </div>

                            <p className="mt-4 text-xs leading-5 text-base-content/50">
                                This is an estimated amount. The server calculates the
                                final booking cost when you submit your request.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
