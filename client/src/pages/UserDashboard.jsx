import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useLogout from "../services/useLogout";
import UserHeader from "../components/UserHeader";


export default function UserDashboard() {
  // Later these will come from API calls:
  // GET /users/current-user → user
  // GET /rides/user/active → activeRide
  // GET /rides/user/history → recentRides

  const { user, setUser } = useContext(AuthContext);


  // Set to null to test "no active ride" state
  const activeRide = {
    _id: "abc123",
    status: "ON_THE_WAY",
    pickupLocation: "123 Maple Ave, Downtown",
    dropLocation: "Central Station, Terminal 2",
    driverName: "John Doe",
    driverVehicle: "Toyota Camry • ABC-1234",
  };

  const recentRides = [
    {
      _id: "r1",
      date: "OCT 24, 2023 • 06:45 PM",
      pickup: "789 Pine St",
      drop: "Skyline Mall, North Wing",
      fare: "₹250",
      status: "COMPLETED",
    },
    {
      _id: "r2",
      date: "OCT 22, 2023 • 08:15 AM",
      pickup: "Central Station",
      drop: "Home (123 Maple Ave)",
      fare: "₹180",
      status: "COMPLETED",
    },
    {
      _id: "r3",
      date: "OCT 20, 2023 • 11:30 PM",
      pickup: "The Grand Theater",
      drop: "Home (123 Maple Ave)",
      fare: "₹0",
      status: "CANCELLED",
    },
  ];

  // Helper for status badge colors
  function statusBadge(status) {
    switch (status) {
      case "COMPLETED":
        return "bg-[#f5c400]/10 text-[#f5c400]";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      case "ON_THE_WAY":
        return "bg-green-500/10 text-green-600";
      default:
        return "bg-slate-100 text-slate-500";
    }
  }

  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen font-[Inter]">
      {/* Navbar */}
      <UserHeader />

      {/* Main Content */}
      <main className="flex flex-1 justify-center py-8">
        <div className="flex flex-col max-w-[1024px] flex-1 px-4 md:px-10 gap-8">
          {/* Greeting & Book Ride CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-black leading-tight tracking-tight">
                Welcome back, {user.name}
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

          {/* Active Ride Section */}
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
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-600 text-sm font-bold uppercase tracking-wider">
                        {activeRide.status.replace(/_/g, " ")}
                      </span>
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
                            {activeRide.pickupLocation}
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
                            {activeRide.dropLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Info + Track Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">
                          {activeRide.driverName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activeRide.driverVehicle}
                        </p>
                      </div>
                    </div>
                    <NavLink
                      to={`/user/ride/${activeRide._id}`}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined !text-lg">
                        map
                      </span>
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

          {/* Recent Rides Section */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentRides.map((ride) => (
                  <div
                    key={ride._id}
                    className="flex flex-col gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-[#f5c400]/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-slate-400">
                          {ride.date}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-semibold truncate">
                            {ride.pickup}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {ride.drop}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`${statusBadge(ride.status)} px-3 py-1 rounded-full text-[10px] font-black uppercase`}
                      >
                        {ride.status}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400">
                          payments
                        </span>
                        <span className="font-bold">{ride.fare}</span>
                      </div>
                      <NavLink
                        to={`/user/ride/${ride._id}`}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 text-center">
                <p className="text-slate-400 font-medium">
                  No rides yet. Book your first ride!
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 px-6 md:px-10 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          © 2024 UCab Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}