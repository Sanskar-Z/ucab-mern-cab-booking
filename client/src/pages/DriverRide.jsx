import { Link, useParams } from "react-router-dom";
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
      <div className="min-h-screen flex items-center justify-center">
        Loading Ride...
      </div>
    );
  }

  function getStatusBadge() {

    switch (ride.status) {

      case "accepted":
        return {
          text: "Accepted",
          dotColor: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
        };

      case "ongoing":
        return {
          text: "On Trip",
          dotColor: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
        };

      case "completed":
        return {
          text: "Completed",
          dotColor: "bg-slate-400",
          textColor: "text-slate-600",
          bgColor: "bg-slate-100",
        };

      default:
        return {
          text: ride.status,
          dotColor: "bg-slate-400",
          textColor: "text-slate-600",
          bgColor: "bg-slate-100",
        };

    }

  }

  const badge = getStatusBadge();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-[Inter]">

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f5c400] text-3xl">
              local_taxi
            </span>
            <span className="text-2xl font-bold tracking-tight">UCab</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              className="text-slate-500 hover:text-[#f5c400] transition-colors"
              to="/driver/dashboard"
            >
              Dashboard
            </Link>

            <Link
              className="text-slate-500 hover:text-[#f5c400] transition-colors"
              to="/driver/history"
            >
              History
            </Link>

            <button className="text-slate-500 hover:text-red-500 transition-colors">
              Logout
            </button>
          </div>

        </nav>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">Ride Details</h1>
          <p className="text-slate-500 mt-1">
            Ride ID: <span className="font-mono text-sm">{rideId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Ride Card */}
          <section className="lg:col-span-5 xl:col-span-4">

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              <div className="p-6 border-b border-slate-50">

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 ${badge.bgColor} ${badge.textColor} rounded-full text-xs font-semibold uppercase tracking-wider`}
                >

                  <span
                    className={`w-2 h-2 ${badge.dotColor} rounded-full ${ride.status === "ongoing" ? "animate-pulse" : ""}`}
                  />

                  {badge.text}

                </div>

              </div>

              {/* Rider */}
              <div className="p-6 flex items-center gap-4 border-b border-slate-50">

                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    person
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold leading-none">
                    {ride?.user?.name}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Phone: {ride?.user?.phone}
                  </p>
                </div>

              </div>

              {/* Pickup */}
              <div className="p-6 space-y-4">

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#f5c400]">
                    location_on
                  </span>

                  <div>
                    <p className="text-xs text-slate-400 uppercase">Pickup</p>
                    <p className="font-medium">
                      {ride?.pickupLocation?.address}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400">
                    navigation
                  </span>

                  <div>
                    <p className="text-xs text-slate-400 uppercase">Drop</p>
                    <p className="font-medium">
                      {ride?.dropLocation?.address}
                    </p>
                  </div>

                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 border-y border-slate-100 bg-slate-50/50">

                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Distance
                  </p>
                  <p className="font-bold mt-1">{(ride.distance).toFixed(2)}</p>
                </div>

                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Fare
                  </p>
                  <p className="font-bold text-[#f5c400] mt-1">
                    ₹{Math.round(ride.fare)}
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Status
                  </p>
                  <p className="font-bold mt-1 capitalize">
                    {ride.status}
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="p-6">

                {ride.status === "accepted" && (
                  <button
                    onClick={handleStart}
                    className="w-full bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-4 rounded-xl"
                  >
                    Start Ride
                  </button>
                )}

                {ride.status === "ongoing" && (
                  <button
                    onClick={handleComplete}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl"
                  >
                    Complete Ride
                  </button>
                )}

                {ride.status === "completed" && (
                  <div className="text-center py-4">
                    <p className="text-green-600 font-bold">
                      Ride Completed
                    </p>

                    <Link
                      to="/driver/dashboard"
                      className="inline-block mt-4 text-sm font-semibold text-[#f5c400]"
                    >
                      ← Back to Dashboard
                    </Link>

                  </div>
                )}

              </div>

            </div>

          </section>

        </div>

      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        © 2026 UCab Driver Portal
      </footer>

    </div>
  );
}