import { useState } from "react";
import { Link } from "react-router-dom";

export default function BookRide() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [estimate, setEstimate] = useState(null);

  // Placeholder: later this will call backend or calculate
  function handleGetEstimate() {
    if (!pickup.trim() || !drop.trim()) {
      alert("Please enter both pickup and drop locations");
      return;
    }
    // Fake estimate for now
    setEstimate({
      distance: "8.4 km",
      duration: "18 mins",
      fare: "₹250",
    });
  }

  // Placeholder: later this will call POST /rides
  function handleBookNow() {
    if (!estimate) {
      alert("Please get fare estimate first");
      return;
    }
    alert("Booking ride... (API integration coming soon)");
  }

  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen font-[Inter]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f5c400] text-3xl font-bold">
                local_taxi
              </span>
              <span className="text-2xl font-black tracking-tight">UCab</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                className="text-sm font-semibold text-slate-600 hover:text-[#f5c400] transition-colors"
                to="/user/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-semibold text-[#f5c400]"
                to="/user/book"
              >
                Book Ride
              </Link>
              <Link
                className="text-sm font-semibold text-slate-600 hover:text-[#f5c400] transition-colors"
                to="/user/history"
              >
                History
              </Link>
              <button className="text-sm font-semibold text-slate-600 hover:text-red-500 transition-colors">
                Logout
              </button>
            </nav>

            <div className="md:hidden">
              <button className="p-2 text-slate-600">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">Book a Ride</h1>
          <p className="text-slate-500 mt-1">
            Quick, safe, and professional drivers at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left — Booking Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="space-y-4">
                {/* Pickup */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Pickup Location
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f5c400]">
                      location_on
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#f5c400]/20 focus:border-[#f5c400] outline-none transition-all"
                      placeholder="Enter pickup address"
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                </div>

                {/* Drop */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Drop Location
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f5c400]">
                      navigation
                    </span>
                    <input
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-[#f5c400]/20 focus:border-[#f5c400] outline-none transition-all"
                      placeholder="Enter destination"
                      type="text"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                    />
                  </div>
                </div>

                {/* Get Estimate Button */}
                <button
                  onClick={handleGetEstimate}
                  className="w-full py-3 px-4 text-slate-900 font-bold text-sm bg-[#f5c400]/10 hover:bg-[#f5c400]/20 rounded-lg transition-colors border border-[#f5c400]/20"
                >
                  Get Fare Estimate
                </button>

                {/* Fare Estimate + Book Now */}
                {estimate && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-center flex-1">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Distance
                        </p>
                        <p className="text-lg font-bold">{estimate.distance}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div className="text-center flex-1">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Duration
                        </p>
                        <p className="text-lg font-bold">{estimate.duration}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div className="text-center flex-1">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Est. Fare
                        </p>
                        <p className="text-lg font-bold text-[#f5c400]">
                          {estimate.fare}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleBookNow}
                      className="w-full py-4 px-6 bg-[#f5c400] text-slate-900 font-black rounded-lg shadow-lg shadow-[#f5c400]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      BOOK NOW
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-[#f5c400]/5 rounded-xl p-4 border border-[#f5c400]/10 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#f5c400]">
                info
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fares are estimated and may vary based on traffic, tolls, and
                peak hours. Your driver will confirm the final route.
              </p>
            </div>
          </div>

          {/* Right — Map Placeholder */}
          <div className="lg:col-span-7 h-[400px] lg:h-[600px] w-full relative">
            <div className="absolute inset-0 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
              {/* Dotted background pattern */}
              <div className="w-full h-full bg-[radial-gradient(circle_at_20px_20px,#e2e8f0_1px,transparent_0)] [background-size:40px_40px]" />

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-6xl mb-4 group-hover:scale-110 transition-transform">
                  map
                </span>
                <p className="font-medium text-lg">Interactive Map View</p>
                <p className="text-sm opacity-70">
                  Leaflet map will be added here
                </p>
              </div>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:text-[#f5c400] transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:text-[#f5c400] transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-[#f5c400] transition-colors">
                  <span className="material-symbols-outlined">
                    my_location
                  </span>
                </button>
              </div>

              {/* Nearby cabs indicator */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs font-bold text-slate-700">
                    12 Cabs nearby
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f5c400] text-xl">
              local_taxi
            </span>
            <span className="font-bold text-slate-900">UCab</span>
            <span className="ml-2">© 2024 UCab Premium Taxi Service.</span>
          </div>
          <div className="flex gap-6">
            <a className="hover:text-[#f5c400]" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-[#f5c400]" href="#">
              Terms of Service
            </a>
            <a className="hover:text-[#f5c400]" href="#">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}