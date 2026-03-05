import { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import { NavLink } from "react-router-dom";
import API from "../services/api";
import UserFooter from "../components/UserFooter";

export default function UserHistory() {
    const [filter, setFilter] = useState("ALL");
    const [allRides, setAllRides] = useState([]);
    const [payments, setPayments] = useState({});

    const fetchRides = async () => {
        try {
            const res = await API.get("/rides/user/history");
            const rides = res.data.data || [];

            rides.sort((a, b) => {
                const aUnpaid = a.status === "completed" && !a.paid;
                const bUnpaid = b.status === "completed" && !b.paid;
                if (aUnpaid && !bUnpaid) return -1;
                if (!aUnpaid && bUnpaid) return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setAllRides(rides);

            const paymentData = {};
            for (const ride of rides) {
                try {
                    const paymentRes = await API.get(`/payments/ride/${ride._id}`);
                    paymentData[ride._id] = paymentRes.data.data;
                } catch {
                    paymentData[ride._id] = null;
                }
            }
            setPayments(paymentData);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    async function handlePayment(rideId) {
        try {
            const create = await API.post("/payments/create", { rideId, paymentMethod: "upi" });
            const paymentId = create.data.data._id;
            await API.post(`/payments/complete/${paymentId}`);
            alert("Payment Successful");
            fetchRides(); // refresh after payment
        } catch (error) {
            alert(error?.response?.data?.message || "Payment failed");
        }
    }

    const filteredRides =
        filter === "ALL" ? allRides : allRides.filter((r) => r.status === filter);

    const filters = ["ALL", "completed", "cancelled"];

    return (
        <div className="bg-[#f8f8f5] min-h-screen font-[Inter] text-slate-900">
            <UserHeader />

            <main className="flex flex-1 justify-center py-8 px-4 lg:px-20">
                <div className="flex flex-col max-w-[1024px] flex-1 gap-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                                Ride History
                            </h1>
                            <p className="text-slate-500 text-base">
                                View all your past rides and trip details
                            </p>
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                        ? "bg-white text-slate-900 shadow-sm font-bold"
                                        : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filteredRides.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredRides.map((ride) => {
                                const isUnpaid = ride.status === "completed" && !payments[ride._id];
                                return (
                                    <div
                                        key={ride._id}
                                        className={`group flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl p-5 shadow-sm border transition-all ${isUnpaid
                                            ? "border-red-400 hover:border-red-500 bg-red-50"
                                            : "bg-white border-transparent hover:border-[#f5c400]/40"
                                            }`}
                                    >
                                        <div className="flex flex-col flex-1 gap-4">
                                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
                                                {new Date(ride.createdAt).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-[#f5c400] text-xl">
                                                        location_on
                                                    </span>
                                                    <p className="text-slate-800 text-sm font-medium">
                                                        {ride.pickupLocation?.address}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">
                                                        navigation
                                                    </span>
                                                    <p className="text-slate-800 text-sm font-medium">
                                                        {ride.dropLocation?.address}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${ride.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                                            <p className="text-2xl font-black leading-tight tracking-tight">
                                                ₹ {Math.round(ride.fare)}
                                            </p>

                                            <span className="material-symbols-outlined text-slate-300 group-hover:text-[#f5c400] transition-colors hidden md:block">
                                                chevron_right
                                            </span>

                                            {payments[ride._id]?.status === "completed" && (
                                                <span className="text-green-600 text-sm font-semibold mt-2">
                                                    Paid ✔
                                                </span>
                                            )}

                                            {isUnpaid && (
                                                <>
                                                    <span className="text-red-500 text-sm font-semibold mt-2">
                                                        Payment Pending
                                                    </span>
                                                    <button
                                                        onClick={() => handlePayment(ride._id)}
                                                        className="mt-2 px-4 py-2 bg-[#f5c400] text-slate-900 rounded-lg font-bold"
                                                    >
                                                        Pay Now
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-xl bg-white p-12 shadow-sm text-center">
                            <span className="material-symbols-outlined text-slate-300 text-6xl">
                                history
                            </span>
                            <p className="text-slate-400 mt-3 font-medium">
                                No {filter.toLowerCase()} rides found.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <div className="absolute bottom-0 w-full">
                <UserFooter />
            </div>
        </div>
    );
}