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

    if (activeRide.status === "accepted") {
      return (
        <button
          onClick={handleStart}
          className="w-full bg-[#f5c400] hover:bg-[#e0b200] transition text-slate-900 font-semibold py-3 rounded-lg"
        >
          Start Ride
        </button>
      );
    }

    if (activeRide.status === "ongoing") {
      return (
        <button
          onClick={handleComplete}
          className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-lg"
        >
          Complete Ride
        </button>
      );
    }
  }

  function statusBadge(status) {
    const styles = {
      accepted: "bg-blue-100 text-blue-700",
      ongoing: "bg-green-100 text-green-700",
      requested: "bg-yellow-100 text-yellow-800",
    };

    const labels = {
      accepted: "Accepted",
      ongoing: "On Trip",
      requested: "New Request",
    };

    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status] || "bg-slate-100 text-slate-600"
          }`}
      >
        {labels[status] || status}
      </span>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-[Inter]">
      <DriverHeader />

      <main className="max-w-6xl mx-auto px-4 py-10 w-full flex-1">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your rides and requests
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Active Ride
          </h2>

          {activeRide ? (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400">
                      person
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {activeRide?.user?.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {activeRide?.distance} km away
                    </p>
                  </div>
                </div>

                {statusBadge(activeRide.status)}
              </div>

              <div className="space-y-4 mb-6">

                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-yellow-500">
                    location_on
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Pickup</p>
                    <p className="font-medium">
                      {activeRide?.pickupLocation?.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-slate-400">
                    flag
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Drop</p>
                    <p className="font-medium">
                      {activeRide?.dropLocation?.address}
                    </p>
                  </div>
                </div>

              </div>

              {renderActions()}

              {(activeRide.status === "accepted" ||
                activeRide.status === "ongoing") && (
                  <NavLink
                    to={`/driver/ride/${activeRide._id}`}
                    className="block text-center mt-3 text-sm font-medium text-[#f5c400]"
                  >
                    View ride details →
                  </NavLink>
                )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">
                directions_car
              </span>
              <p className="text-slate-400 mt-3">
                No active ride right now
              </p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Ride Requests
          </h2>

          {requestedRides.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {requestedRides.map((ride) => (
                <div
                  key={ride._id}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">
                      {ride?.userDetails?.name}
                    </h3>
                    {statusBadge("requested")}
                  </div>

                  <div className="space-y-3 text-sm mb-5">

                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-yellow-500 text-[20px]">
                        location_on
                      </span>
                      <p>{ride?.pickupLocation?.address}</p>
                    </div>

                    <div className="flex gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">
                        flag
                      </span>
                      <p>{ride?.dropLocation?.address}</p>
                    </div>

                  </div>

                  <button
                    onClick={() => handleAccept(ride._id)}
                    className="w-full bg-[#f5c400] hover:bg-[#e0b200] transition text-slate-900 font-semibold py-2.5 rounded-lg"
                  >
                    Accept Ride
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">
                history
              </span>
              <p className="text-slate-400 mt-3">
                No ride requests available
              </p>
            </div>
          )}
        </section>

      </main>

      <DriverFooter />
    </div>
  );
}