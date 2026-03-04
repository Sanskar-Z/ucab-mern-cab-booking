import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import DriverHeader from "../components/DriverHeader";
import DriverFooter from "../components/DriverFooter";

export default function DriverDashboard() {
  const { user } = useContext(AuthContext);

  const [activeRide, setActiveRide] = useState(null);
  const [requestedRides, setRequestedRides] = useState([]);

  const fetchRides = async () => {
    try {
      const active = await API.get("/rides/driver/active");
      setActiveRide(active.data.data);
    } catch {
      setActiveRide(null);
    }

    try {
      const res = await API.get("/rides/requested");
      setRequestedRides(res.data.data || []);
    } catch {
      setRequestedRides([]);
    }
  };

  useEffect(() => {
    fetchRides();
    const interval = setInterval(fetchRides, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleAccept(rideId) {
    try {
      await API.post(`/rides/${rideId}/accept`);
      fetchRides();
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  async function handleStart() {
    try {
      await API.post(`/rides/${activeRide._id}/start`);
      fetchRides();
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  async function handleComplete() {
    try {
      await API.post(`/rides/${activeRide._id}/complete`);
      fetchRides();
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }

  function renderActions() {
    if (!activeRide) return null;

    switch (activeRide.status) {
      case "accepted":
        return (
          <button
            onClick={handleStart}
            className="w-full bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-3.5 rounded-xl"
          >
            Start Ride
          </button>
        );
      case "ongoing":
        return (
          <button
            onClick={handleComplete}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl"
          >
            Complete Ride
          </button>
        );
      default:
        return null;
    }
  }

  function statusBadge(status) {
    switch (status) {
      case "accepted":
        return { text: "Accepted — Ready to Start", bg: "bg-blue-100 text-blue-700" };
      case "ongoing":
        return { text: "On Trip", bg: "bg-green-100 text-green-700" };
      case "requested":
        return { text: "New Ride Request", bg: "bg-[#f5c400] text-slate-900" };
      default:
        return { text: status, bg: "bg-slate-100 text-slate-600" };
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-[Inter]">
      <DriverHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-slate-500 mt-1">Ready to drive?</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            {/* ACTIVE RIDE */}
            {activeRide ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">
                          person
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{activeRide?.user?.name}</h3>
                        <p className="text-sm text-slate-500">{activeRide?.distance} km</p>
                      </div>
                    </div>
                    {statusBadge(activeRide.status) && (
                      <span
                        className={`${statusBadge(activeRide.status).bg} text-[10px] uppercase font-bold px-3 py-1 rounded-full`}
                      >
                        {statusBadge(activeRide.status).text}
                      </span>
                    )}
                  </div>

                  {/* Pickup */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="material-symbols-outlined text-[#f5c400]">
                      location_on
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Pickup</p>
                      <p className="font-medium">{activeRide?.pickupLocation?.address}</p>
                    </div>
                  </div>

                  {/* Drop */}
                  <div className="flex items-start gap-3 mb-6">
                    <span className="material-symbols-outlined text-slate-400">
                      navigation
                    </span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Drop</p>
                      <p className="font-medium">{activeRide?.dropLocation?.address}</p>
                    </div>
                  </div>

                  {renderActions()}

                  {(activeRide.status === "accepted" || activeRide.status === "ongoing") && (
                    <NavLink
                      to={`/driver/ride/${activeRide._id}`}
                      className="block text-center mt-3 text-sm font-semibold text-[#f5c400]"
                    >
                      View Ride Details →
                    </NavLink>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6 p-8 text-center">
                <span className="material-symbols-outlined text-slate-300 text-6xl">
                  directions_car
                </span>
                <p className="text-slate-400 mt-3 font-medium">No active ride currently.</p>
              </div>
            )}

            {/* REQUESTED RIDES */}
            {requestedRides.length > 0 ? (
              requestedRides.map((ride) => (
                <div
                  key={ride._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-400">
                            person
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{ride?.userDetails?.name}</h3>
                          <p className="text-sm text-slate-500">{ride?.distance} km</p>
                        </div>
                      </div>
                      <span className="bg-[#f5c400] text-slate-900 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                        New Ride Request
                      </span>
                    </div>

                    {/* Pickup */}
                    <div className="flex items-start gap-3 mb-4">
                      <span className="material-symbols-outlined text-[#f5c400]">location_on</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Pickup</p>
                        <p className="font-medium">{ride?.pickupLocation?.address}</p>
                      </div>
                    </div>

                    {/* Drop */}
                    <div className="flex items-start gap-3 mb-6">
                      <span className="material-symbols-outlined text-slate-400">navigation</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Drop</p>
                        <p className="font-medium">{ride?.dropLocation?.address}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAccept(ride._id)}
                      className="w-full bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-3.5 rounded-xl"
                    >
                      Accept Ride
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6 p-8 text-center">
                <span className="material-symbols-outlined text-slate-300 text-6xl">
                  history
                </span>
                <p className="text-slate-400 mt-3 font-medium">No new ride requests.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <DriverFooter />
    </div>
  );
}