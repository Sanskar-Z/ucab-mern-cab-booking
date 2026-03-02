import { Link, useParams } from "react-router-dom";

export default function DriverRide() {
  const { rideId } = useParams();

  // Later: polling GET /rides/:rideId every 5 seconds
  const ride = {
    _id: rideId,
    status: "ACCEPTED", // ACCEPTED, STARTED, COMPLETED
    riderName: "John Doe",
    riderRating: "4.8",
    pickupLocation: "123 Maple St, Downtown",
    dropLocation: "456 Oak Ave, Airport",
    distance: "8.4 km",
    duration: "18 mins",
    fare: "₹250",
  };

  function handleStart() {
    // Later: POST /rides/:rideId/start
    alert("Starting ride... (API coming soon)");
  }

  function handleComplete() {
    // Later: POST /rides/:rideId/complete
    alert("Completing ride... (API coming soon)");
  }

  // Status badge config
  function getStatusBadge() {
    switch (ride.status) {
      case "ACCEPTED":
        return {
          text: "Accepted",
          dotColor: "bg-blue-500",
          textColor: "text-blue-700",
          bgColor: "bg-blue-50",
        };
      case "STARTED":
        return {
          text: "On Trip",
          dotColor: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
        };
      case "COMPLETED":
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

          <div className="md:hidden">
            <button className="p-2 text-slate-600">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">Ride Details</h1>
          <p className="text-slate-500 mt-1">
            Ride ID: <span className="font-mono text-sm">{rideId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left — Ride Details Card */}
          <section className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Status Badge */}
              <div className="p-6 border-b border-slate-50">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 ${badge.bgColor} ${badge.textColor} rounded-full text-xs font-semibold uppercase tracking-wider`}
                >
                  <span
                    className={`w-2 h-2 ${badge.dotColor} rounded-full ${
                      ride.status === "STARTED" ? "animate-pulse" : ""
                    }`}
                  />
                  {badge.text}
                </div>
              </div>

              {/* Rider Info */}
              <div className="p-6 flex items-center gap-4 border-b border-slate-50">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    person
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-none">
                    {ride.riderName}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="material-symbols-outlined text-[#f5c400] text-sm">
                      star
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      {ride.riderRating} Rating
                    </span>
                  </div>
                </div>
                <button className="ml-auto w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-[#f5c400] hover:text-white transition-all">
                  <span className="material-symbols-outlined">phone</span>
                </button>
              </div>

              {/* Pickup & Drop */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#f5c400] text-xl mt-0.5">
                    location_on
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">
                      Pickup
                    </p>
                    <p className="text-slate-700 font-medium">
                      {ride.pickupLocation}
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
                      {ride.dropLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ride Stats */}
              <div className="grid grid-cols-3 border-y border-slate-100 bg-slate-50/50">
                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Distance
                  </p>
                  <p className="font-bold mt-1">{ride.distance}</p>
                </div>
                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Duration
                  </p>
                  <p className="font-bold mt-1">{ride.duration}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Fare
                  </p>
                  <p className="font-bold text-[#f5c400] mt-1">{ride.fare}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6">
                {ride.status === "ACCEPTED" && (
                  <button
                    onClick={handleStart}
                    className="w-full bg-[#f5c400] hover:bg-[#e6b800] text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#f5c400]/20 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">
                      play_arrow
                    </span>
                    Start Ride
                  </button>
                )}

                {ride.status === "STARTED" && (
                  <button
                    onClick={handleComplete}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Complete Ride
                  </button>
                )}

                {ride.status === "COMPLETED" && (
                  <div className="text-center py-4">
                    <span className="material-symbols-outlined text-green-500 text-5xl">
                      check_circle
                    </span>
                    <p className="text-green-600 font-bold mt-2">
                      Ride Completed!
                    </p>
                    <Link
                      to="/driver/dashboard"
                      className="inline-block mt-4 text-sm font-semibold text-[#f5c400] hover:underline"
                    >
                      ← Back to Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right — Map Placeholder */}
          <section className="lg:col-span-7 xl:col-span-8 min-h-[400px] lg:min-h-[700px]">
            <div className="w-full h-full bg-slate-200 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group border border-slate-200 shadow-inner">
              {/* Dotted pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

              <div className="relative z-10 text-center space-y-3">
                <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-lg text-slate-400 group-hover:text-[#f5c400] transition-colors duration-500">
                  <span className="material-symbols-outlined text-5xl">
                    map
                  </span>
                </div>
                <div>
                  <h2 className="text-slate-600 font-bold text-lg">
                    Live Navigation
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Leaflet map will be added here
                  </p>
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:text-[#f5c400]">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:text-[#f5c400]">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-[#f5c400] mt-2">
                  <span className="material-symbols-outlined">
                    my_location
                  </span>
                </button>
              </div>

              {/* Status overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${badge.dotColor} ${
                      ride.status === "STARTED" ? "animate-pulse" : ""
                    }`}
                  />
                  <p className="text-xs font-bold text-slate-700">
                    {ride.status === "ACCEPTED"
                      ? "Navigating to pickup..."
                      : ride.status === "STARTED"
                        ? "Trip in progress..."
                        : "Trip ended"}
                  </p>
                </div>
              </div>
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