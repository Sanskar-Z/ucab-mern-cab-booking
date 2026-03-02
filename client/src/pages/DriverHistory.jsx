import { useState } from "react";
import { Link } from "react-router-dom";

export default function DriverHistory() {
  const [filter, setFilter] = useState("ALL"); // ALL, COMPLETED, CANCELLED

  // Later: GET /rides/driver/history
  const allRides = [
    {
      _id: "dr1",
      date: "Oct 25, 2023, 09:15 AM",
      riderName: "Sarah Johnson",
      pickup: "Central Mall, East Gate",
      drop: "International Airport, Terminal 1",
      fare: "₹520",
      distance: "12.3 km",
      status: "COMPLETED",
    },
    {
      _id: "dr2",
      date: "Oct 25, 2023, 07:30 AM",
      riderName: "Amit Patel",
      pickup: "Green Park Society, B-Wing",
      drop: "Tech Park, Tower 3",
      fare: "₹180",
      distance: "4.5 km",
      status: "COMPLETED",
    },
    {
      _id: "dr3",
      date: "Oct 24, 2023, 10:45 PM",
      riderName: "Priya Sharma",
      pickup: "Skyline Restaurant, Rooftop",
      drop: "Lakeview Apartments, Block C",
      fare: "₹0",
      distance: "6.2 km",
      status: "CANCELLED",
    },
    {
      _id: "dr4",
      date: "Oct 24, 2023, 06:00 PM",
      riderName: "Rahul Verma",
      pickup: "City Hospital, Main Entrance",
      drop: "Railway Station, Platform 5",
      fare: "₹350",
      distance: "8.1 km",
      status: "COMPLETED",
    },
    {
      _id: "dr5",
      date: "Oct 24, 2023, 02:20 PM",
      riderName: "Neha Kulkarni",
      pickup: "University Campus, Gate 2",
      drop: "Phoenix Mall, Parking B",
      fare: "₹220",
      distance: "5.8 km",
      status: "COMPLETED",
    },
    {
      _id: "dr6",
      date: "Oct 23, 2023, 11:10 PM",
      riderName: "Vikram Singh",
      pickup: "Club Royale, VIP Entrance",
      drop: "Sunrise Towers, Flat 402",
      fare: "₹0",
      distance: "3.4 km",
      status: "CANCELLED",
    },
    {
      _id: "dr7",
      date: "Oct 23, 2023, 08:45 AM",
      riderName: "Ananya Desai",
      pickup: "Metro Station, Exit B",
      drop: "Corporate Hub, Floor 12",
      fare: "₹290",
      distance: "7.0 km",
      status: "COMPLETED",
    },
  ];

  const filteredRides =
    filter === "ALL"
      ? allRides
      : allRides.filter((r) => r.status === filter);

  const filters = ["ALL", "COMPLETED", "CANCELLED"];

  // Today's summary (placeholder)
  const todayEarnings = "₹700";
  const todayTrips = allRides.filter((r) => r.status === "COMPLETED").length;

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
              className="text-slate-900 font-semibold border-b-2 border-[#f5c400] pb-1"
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
        {/* Title + Filter */}
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
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-green-600 text-xl">
                payments
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">
                Total Earned
              </p>
              <p className="text-lg font-black">{todayEarnings}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-blue-600 text-xl">
                directions_car
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">
                Completed
              </p>
              <p className="text-lg font-black">{todayTrips}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-red-500 text-xl">
                cancel
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">
                Cancelled
              </p>
              <p className="text-lg font-black">
                {allRides.filter((r) => r.status === "CANCELLED").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-orange-600 text-xl">
                star
              </span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">
                Rating
              </p>
              <p className="text-lg font-black">
                4.9 <span className="text-[#f5c400]">★</span>
              </p>
            </div>
          </div>
        </div>

        {/* Ride Cards */}
        {filteredRides.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredRides.map((ride) => (
              <Link
                key={ride._id}
                to={`/driver/ride/${ride._id}`}
                className="group flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl bg-white p-5 shadow-sm border border-transparent hover:border-[#f5c400]/40 transition-all"
              >
                {/* Ride Info */}
                <div className="flex flex-col flex-1 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        {ride.date}
                      </p>
                      <span className="text-slate-300">•</span>
                      <p className="text-slate-500 text-xs font-medium">
                        {ride.distance}
                      </p>
                    </div>

                    {/* Rider */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          person
                        </span>
                      </div>
                      <p className="text-sm font-bold">{ride.riderName}</p>
                    </div>

                    {/* Locations */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#f5c400] text-xl">
                          location_on
                        </span>
                        <p className="text-slate-800 text-sm font-medium">
                          {ride.pickup}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400 text-xl">
                          navigation
                        </span>
                        <p className="text-slate-800 text-sm font-medium">
                          {ride.drop}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ride.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ride.status.charAt(0) + ride.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Fare */}
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                  <p className="text-2xl font-black leading-tight tracking-tight">
                    {ride.fare}
                  </p>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-[#f5c400] transition-colors hidden md:block">
                    chevron_right
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white p-12 shadow-sm text-center">
            <span className="material-symbols-outlined text-slate-300 text-6xl">
              history
            </span>
            <p className="text-slate-400 mt-3 font-medium">
              No {filter.toLowerCase()} rides found.
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredRides.length > 0 && (
          <div className="flex justify-center mt-6">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5c400]/10 hover:bg-[#f5c400]/20 text-[#f5c400] font-bold transition-all">
              Load More Rides
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm px-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f5c400] font-bold">
              local_taxi
            </span>
            <span className="font-bold text-slate-900">UCab</span>
            <span>© 2024 All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a className="hover:text-[#f5c400] transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-[#f5c400] transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-[#f5c400] transition-colors" href="#">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}