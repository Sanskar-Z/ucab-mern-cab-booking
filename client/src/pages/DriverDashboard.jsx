import { Link } from "react-router-dom";

export default function DriverDashboard() {
  // Later: GET /users/current-user → driver info
  const driver = { name: "Alex" };

  // Later: GET /rides/driver/active → activeRide
  // Set to null to test "waiting" state
  const activeRide = {
    _id: "ride123",
    status: "ASSIGNED", // ASSIGNED, ACCEPTED, STARTED
    riderName: "John Doe",
    riderRating: "4.8",
    riderDistance: "0.5 miles away",
    pickupLocation: "123 Maple St, Downtown",
    dropLocation: "456 Oak Ave, Airport",
  };

  // Placeholder stats (later from backend or computed)
  const stats = {
    earnings: "₹2,450",
    trips: 12,
    rating: "4.9",
  };

  function handleAccept() {
    // Later: POST /rides/:rideId/accept
    alert("Accepting ride... (API coming soon)");
  }

  function handleReject() {
    // Later: POST /rides/:rideId/reject
    alert("Rejecting ride... (API coming soon)");
  }

  function handleStart() {
    // Later: POST /rides/:rideId/start
    alert("Starting ride... (API coming soon)");
  }

  function handleComplete() {
    // Later: POST /rides/:rideId/complete
    alert("Completing ride... (API coming soon)");
  }

  // Determine which buttons to show
  function renderActions() {
    if (!activeRide) return null;

    switch (activeRide.status) {
      case "ASSIGNED":
        return (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              Accept Ride
            </button>
            <button
              onClick={handleReject}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
            >
              Reject
            </button>
          </div>
        );
      case "ACCEPTED":
        return (
          <button
            onClick={handleStart}
            className="w-full bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            Start Ride
          </button>
        );
      case "STARTED":
        return (
          <button
            onClick={handleComplete}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            Complete Ride
          </button>
        );
      default:
        return null;
    }
  }

  // Status badge config
  function statusBadge() {
    if (!activeRide) return null;
    switch (activeRide.status) {
      case "ASSIGNED":
        return { text: "New Ride Request", bg: "bg-[#f5c400] text-slate-900" };
      case "ACCEPTED":
        return { text: "Accepted — Ready to Start", bg: "bg-blue-100 text-blue-700" };
      case "STARTED":
        return { text: "On Trip", bg: "bg-green-100 text-green-700" };
      default:
        return { text: activeRide.status, bg: "bg-slate-100 text-slate-600" };
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-[Inter]">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f5c400] text-3xl">
                local_taxi
              </span>
              <span className="text-2xl font-bold tracking-tight">UCab</span>
            </div>

            <div className="hidden md:flex space-x-8 h-full items-center">
              <Link
                className="px-1 pt-1 text-sm font-semibold text-slate-900 border-b-2 border-[#f5c400] h-full flex items-center"
                to="/driver/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="px-1 pt-1 text-sm font-medium text-slate-500 hover:text-[#f5c400] transition-colors"
                to="/driver/history"
              >
                History
              </Link>
              <button className="px-1 pt-1 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">
                Logout
              </button>
            </div>

            <div className="md:hidden">
              <button className="p-2 text-slate-600">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {driver.name}</h1>
          <p className="text-slate-500 mt-1">Ready to drive?</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Ride Section */}
          <section className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              {activeRide ? "Pending Request" : "Ride Status"}
            </h2>

            {activeRide ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6">
                  {/* Rider Info + Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">
                          person
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-none">
                          {activeRide.riderName}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {activeRide.riderRating} Rating •{" "}
                          {activeRide.riderDistance}
                        </p>
                      </div>
                    </div>
                    {statusBadge() && (
                      <span
                        className={`${statusBadge().bg} text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm`}
                      >
                        {statusBadge().text}
                      </span>
                    )}
                  </div>

                  {/* Pickup & Drop */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#f5c400] text-xl mt-0.5">
                        location_on
                      </span>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase">
                          Pickup
                        </p>
                        <p className="text-slate-700 font-medium">
                          {activeRide.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="ml-2.5 w-px h-6 bg-slate-200" />

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-slate-400 text-xl mt-0.5">
                        navigation
                      </span>
                      <div>
                        <p className="text-xs text-slate-400 font-medium uppercase">
                          Dropoff
                        </p>
                        <p className="text-slate-700 font-medium">
                          {activeRide.dropLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {renderActions()}

                  {/* Track link (if accepted or started) */}
                  {(activeRide.status === "ACCEPTED" ||
                    activeRide.status === "STARTED") && (
                    <Link
                      to={`/driver/ride/${activeRide._id}`}
                      className="block text-center mt-3 text-sm font-semibold text-[#f5c400] hover:underline"
                    >
                      View Ride Details →
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                <span className="material-symbols-outlined text-slate-300 text-7xl">
                  directions_car
                </span>
                <h3 className="text-lg font-bold text-slate-400 mt-4">
                  Waiting for ride requests...
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  New requests will appear here automatically
                </p>
              </div>
            )}
          </section>

          {/* Quick Stats */}
          <section className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Today's Performance
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Earnings */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Today's Earnings
                  </p>
                  <p className="text-2xl font-bold mt-1">{stats.earnings}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600">
                    payments
                  </span>
                </div>
              </div>

              {/* Trips */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">
                    Trips Today
                  </p>
                  <p className="text-2xl font-bold mt-1">{stats.trips}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600">
                    directions_car
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Rating</p>
                  <p className="text-2xl font-bold mt-1">
                    {stats.rating}{" "}
                    <span className="text-[#f5c400] text-xl">★</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600">
                    star
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="mt-2 bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium">
                  Weekly Goal
                </p>
                <p className="text-lg font-semibold mt-1">85% Complete</p>
                <div className="w-full bg-slate-700 h-2 mt-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#f5c400] h-full rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-slate-800 text-8xl opacity-20">
                insights
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        <p>© 2024 UCab Driver Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}