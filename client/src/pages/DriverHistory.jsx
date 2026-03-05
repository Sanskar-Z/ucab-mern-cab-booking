import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import API from "../services/api";
import DriverHeader from "../components/DriverHeader";
import DriverFooter from "../components/DriverFooter";

export default function DriverHistory() {
  const [filter, setFilter] = useState("ALL");
  const [allRides, setAllRides] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/rides/driver/history");
      setAllRides(res.data.data || []);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredRides =
    filter === "ALL"
      ? allRides
      : allRides.filter((r) => r.status.toUpperCase() === filter);

  const filters = ["ALL", "COMPLETED", "CANCELLED"];

  const todayEarnings = `₹ ${allRides
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + (r.fare || 0), 0)}`;

  const todayTrips = allRides.filter((r) => r.status === "completed").length;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-[Inter]">
      <DriverHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
              Ride History
            </h1>
            <p className="text-slate-500 text-base">
              View all your past trips and earnings
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

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          {/* Total Earned */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow border border-slate-100 flex-1">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-2xl">
                payments
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                Total Earned
              </p>
              <p className="text-lg font-extrabold text-slate-900">{todayEarnings}</p>
            </div>
          </div>

          {/* Completed */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow border border-slate-100 flex-1">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-2xl">
                directions_car
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                Completed
              </p>
              <p className="text-lg font-extrabold text-slate-900">{todayTrips}</p>
            </div>
          </div>

          {/* Cancelled */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow border border-slate-100 flex-1">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-2xl">
                cancel
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                Cancelled
              </p>
              <p className="text-lg font-extrabold text-slate-900">
                {allRides.filter((r) => r.status.toLowerCase() === "cancelled").length}
              </p>
            </div>
          </div>
        </div>

        {/* Ride List */}
        {filteredRides.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredRides.map((ride) => (
              <NavLink
                key={ride._id}
                to={`/driver/ride/${ride._id}`}
                className="group flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl bg-white p-5 shadow-sm border border-transparent hover:border-[#f5c400]/40 transition-all"
              >
                {/* Ride Info */}
                <div className="flex flex-col flex-1 gap-4">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      {new Date(ride.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          person
                        </span>
                      </div>
                      <p className="text-sm font-bold">{ride?.userDetails?.name}</p>
                    </div>

                    <div className="space-y-2">
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
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mt-1">
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

                {/* Fare & Arrow */}
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 md:min-w-[90px]">
                  <p className="text-2xl font-black leading-tight tracking-tight">
                    ₹{ride.fare}
                  </p>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#f5c400] transition-colors hidden md:block">
                    chevron_right
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-12 shadow-sm text-center">
            <span className="material-symbols-outlined text-slate-300 text-6xl">
              history
            </span>
            <p className="text-slate-400 mt-3 font-medium">No rides found.</p>
          </div>
        )}
      </main>

      <DriverFooter />
    </div>
  );
}