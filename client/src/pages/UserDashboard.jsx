import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import UserHeader from "../components/UserHeader";
import API from "../services/api";
import UserFooter from "../components/UserFooter";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [activeRide, setActiveRide] = useState(null);
  const [recentRides, setRecentRides] = useState([]);

  const fetchActiveRide = async () => {
    try {
      const res = await API.get("/rides/user/active");
      setActiveRide(res.data.data);
    } catch (error) {
      console.log("error in active ride:", error.response?.data?.message || error.message);
      setActiveRide(null);
    }
  };

  const fetchRecentRides = async () => {
    try {
      const res = await API.get("/rides/user/history");
      setRecentRides(res.data.data || []);
    } catch {
      setRecentRides([]);
    }
  };

  useEffect(() => {
    fetchActiveRide();
    fetchRecentRides();

    const interval = setInterval(() => {
      fetchActiveRide();
      fetchRecentRides();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function getStatusStyle(status) {
    const Status = status?.toUpperCase();
    switch (Status) {
      case "REQUESTED":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";
      case "ONGOING":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-[#f5c400]/15 text-[#b89000]";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  }

  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen flex flex-col font-[Inter]">
      {/* Navbar */}
      <UserHeader />

      {/* Main */}
      <main className="flex-1 flex justify-center py-8">
        <div className="flex flex-col max-w-[1024px] flex-1 px-4 md:px-10 gap-8">
          {/* Greeting */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-black leading-tight tracking-tight">
                Welcome back, {user?.name}
              </h1>
              <p className="text-slate-500 text-lg">
                Your ride is just a tap away.
              </p>
            </div>

            <NavLink
              to="/user/book"
              className="flex items-center justify-center gap-2 bg-[#f5c400] hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">local_taxi</span>
              <span>Book a Ride</span>
            </NavLink>
          </div>

          {/* Active Ride */}
          {activeRide ? (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-[#f5c400] rounded-full" />
                Active Ride
              </h2>

              <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <div className="flex flex-col justify-between gap-6 flex-1">
                  <div className="flex flex-col gap-4">
                    {/* Status */}
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">Status:</span>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusStyle(activeRide.status)}`}
                      >
                        {activeRide.status}
                      </div>
                    </div>

                    {/* Pickup & Drop */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#f5c400] mt-1">
                          location_on
                        </span>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase">
                            Pickup
                          </p>
                          <p className="font-semibold">
                            {activeRide.pickupLocation?.address ||
                              `${activeRide.pickupLocation?.lat}, ${activeRide.pickupLocation?.lng}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-slate-400 mt-1">
                          navigation
                        </span>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase">
                            Drop
                          </p>
                          <p className="font-semibold">
                            {activeRide.dropLocation?.address ||
                              `${activeRide.dropLocation?.lat}, ${activeRide.dropLocation?.lng}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">
                          {activeRide?.driver?.name || "Driver Not Assigned"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activeRide?.driver?.vehicleDetails
                            ? `${activeRide.driver.vehicleDetails.vehicleType} • ${activeRide.driver.vehicleDetails.vehicleNumber}`
                            : "Vehicle Not Assigned"}
                        </p>
                      </div>
                    </div>

                    <NavLink
                      to={`/user/ride/${activeRide._id}`}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined !text-lg">map</span>
                      <span>Track Ride</span>
                    </NavLink>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="md:w-1/3 min-h-[180px] bg-slate-200 rounded-xl overflow-hidden relative border border-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-6xl">
                    map
                  </span>
                </div>
              </div>
            </section>
          ) : (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-slate-300 rounded-full" />
                Active Ride
              </h2>

              <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 text-center">
                <span className="material-symbols-outlined text-slate-300 text-6xl">
                  directions_car
                </span>
                <p className="text-slate-400 mt-3 font-medium">
                  No active ride. Book one now!
                </p>
              </div>
            </section>
          )}

          {/* Recent Rides */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-slate-300 rounded-full" />
                Recent Rides
              </h2>
              <NavLink
                className="text-sm font-bold text-[#f5c400] hover:underline"
                to="/user/history"
              >
                View All
              </NavLink>
            </div>

            {recentRides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {recentRides
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by latest
                  .slice(0, 1) // take only the last (most recent) ride
                  .map((ride) => (
                    <div
                      key={ride._id}
                      className="group flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl bg-white p-5 shadow-sm border border-transparent hover:border-[#f5c400]/40 transition-all"
                    >
                      <div className="flex flex-col flex-1 gap-2">
                        <p className="text-xs text-slate-400 uppercase tracking-wide">
                          {new Date(ride.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm font-semibold">{ride.pickupLocation?.address}</p>
                        <p className="text-sm font-semibold">{ride.dropLocation?.address}</p>
                      </div>
                      <div className="flex flex-col justify-center items-end gap-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(ride.status)}`}>
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                        <p className="text-lg font-black">₹{ride.fare}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-6 shadow-sm text-center border border-slate-100">
                <span className="material-symbols-outlined text-slate-300 text-6xl">
                  history
                </span>
                <p className="text-slate-400 mt-3 font-medium">No recent rides.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <UserFooter />
    </div>
  );
}