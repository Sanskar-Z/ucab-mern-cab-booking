import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function DriverRide() {
  const { rideId } = useParams();
  const [ride, setRide] = useState(null);

  const fetchRide = async () => {
    try {
      const res = await API.get(`/rides/${rideId}`);
      setRide(res.data.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRide();
    const interval = setInterval(fetchRide, 5000);
    return () => clearInterval(interval);
  }, [rideId]);

  async function handleStart() {
    try {
      await API.post(`/rides/${rideId}/start`);
      fetchRide();
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  async function handleComplete() {
    try {
      await API.post(`/rides/${rideId}/complete`);
      fetchRide();
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300">
            directions_car
          </span>
          <p className="text-slate-500 mt-3 font-medium">
            Loading ride details...
          </p>
        </div>
      </div>
    );
  }

  function getStatusBadge() {
    switch (ride.status) {
      case "accepted":
        return {
          text: "Accepted",
          color: "bg-blue-100 text-blue-700",
        };

      case "ongoing":
        return {
          text: "On Trip",
          color: "bg-green-100 text-green-700",
        };

      case "completed":
        return {
          text: "Completed",
          color: "bg-slate-200 text-slate-700",
        };

      default:
        return {
          text: ride.status,
          color: "bg-slate-100 text-slate-600",
        };
    }
  }

  const badge = getStatusBadge();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-[Inter] flex flex-col">

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f5c400] text-3xl">
              local_taxi
            </span>
            <span className="text-2xl font-bold">UCab</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <NavLink
              to="/driver/dashboard"
              className="text-slate-500 hover:text-[#f5c400] transition"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/driver/history"
              className="text-slate-500 hover:text-[#f5c400] transition"
            >
              History
            </NavLink>

            <button className="text-slate-500 hover:text-red-500 transition">
              Logout
            </button>
          </div>

        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Ride Details</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Ride ID: <span className="font-mono">{rideId}</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-700">Ride Status</h2>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${badge.color}`}
            >
              {badge.text}
            </span>
          </div>

          <div className="p-6 flex items-center gap-4 border-b border-slate-100">

            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400 text-3xl">
                person
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {ride?.user?.name}
              </h3>

              <p className="text-sm text-slate-500">
                {ride?.user?.phone}
              </p>
            </div>

          </div>

          <div className="p-6 space-y-5 border-b border-slate-100">

            <div className="flex gap-3">
              <span className="material-symbols-outlined text-yellow-500">
                location_on
              </span>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Pickup
                </p>

                <p className="font-medium">
                  {ride?.pickupLocation?.address}
                </p>
              </div>

            </div>

            <div className="flex gap-3">
              <span className="material-symbols-outlined text-slate-400">
                flag
              </span>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Drop
                </p>

                <p className="font-medium">
                  {ride?.dropLocation?.address}
                </p>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-3 bg-slate-50 text-center border-b border-slate-100">

            <div className="p-5 border-r border-slate-100">
              <p className="text-xs uppercase text-slate-400">
                Distance
              </p>

              <p className="font-bold mt-1">
                {ride.distance.toFixed(2)} km
              </p>
            </div>

            <div className="p-5 border-r border-slate-100">
              <p className="text-xs uppercase text-slate-400">
                Fare
              </p>

              <p className="font-bold text-[#f5c400] mt-1">
                ₹{Math.round(ride.fare)}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs uppercase text-slate-400">
                Status
              </p>

              <p className="font-bold capitalize mt-1">
                {ride.status}
              </p>
            </div>

          </div>

          <div className="p-6">

            {ride.status === "accepted" && (
              <button
                onClick={handleStart}
                className="w-full bg-[#f5c400] hover:bg-[#e0b200] transition font-semibold py-3 rounded-lg"
              >
                Start Ride
              </button>
            )}

            {ride.status === "ongoing" && (
              <button
                onClick={handleComplete}
                className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg"
              >
                Complete Ride
              </button>
            )}

            {ride.status === "completed" && (
              <div className="text-center">

                <p className="text-green-600 font-semibold">
                  Ride Completed
                </p>

                <NavLink
                  to="/driver/dashboard"
                  className="inline-block mt-4 text-sm font-medium text-[#f5c400]"
                >
                  ← Back to Dashboard
                </NavLink>

              </div>
            )}

          </div>

        </div>

      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        © 2026 UCab Driver Portal
      </footer>

    </div>
  );
}