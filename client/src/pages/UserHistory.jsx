import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserHistory() {
  const [filter, setFilter] = useState("ALL"); // ALL, COMPLETED, CANCELLED

  // Later this will come from GET /rides/user/history
  const allRides = [
    {
      _id: "r1",
      date: "Oct 24, 2023, 10:30 AM",
      pickup: "Downtown Terminal, Grand Ave",
      drop: "International Airport, Terminal 3",
      fare: "₹450",
      status: "COMPLETED",
    },
    {
      _id: "r2",
      date: "Oct 22, 2023, 08:15 PM",
      pickup: "5th Avenue Mall, North Entrance",
      drop: "St. Mary's Hospital, West Wing",
      fare: "₹200",
      status: "CANCELLED",
    },
    {
      _id: "r3",
      date: "Oct 20, 2023, 11:45 AM",
      pickup: "Central Park South, Gate 4",
      drop: "Riverside Office Park, Bldg B",
      fare: "₹550",
      status: "COMPLETED",
    },
    {
      _id: "r4",
      date: "Oct 18, 2023, 07:20 AM",
      pickup: "Residence Heights, Apt 4C",
      drop: "Railway Station, Platform 2",
      fare: "₹320",
      status: "COMPLETED",
    },
    {
      _id: "r5",
      date: "Oct 15, 2023, 09:10 PM",
      pickup: "Sky Lounge & Bar, Roof Level",
      drop: "The Westin, Main Lobby",
      fare: "₹0",
      status: "CANCELLED",
    },
    {
      _id: "r6",
      date: "Oct 12, 2023, 02:45 PM",
      pickup: "Tech Hub Coworking Space",
      drop: "City Library, Plaza Square",
      fare: "₹280",
      status: "COMPLETED",
    },
  ];

  const filteredRides =
    filter === "ALL"
      ? allRides
      : allRides.filter((r) => r.status === filter);

  const filters = ["ALL", "COMPLETED", "CANCELLED"];

  return (
    <div className="bg-[#f8f8f5] min-h-screen font-[Inter] text-slate-900">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-20 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#f5c400] text-3xl font-bold">
            local_taxi
          </span>
          <h2 className="text-2xl font-black leading-tight tracking-tight">
            UCab
          </h2>
        </div>

        <nav className="hidden md:flex flex-1 justify-end gap-8 items-center px-8">
          <Link
            className="text-slate-600 hover:text-[#f5c400] transition-colors text-sm font-medium"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-slate-600 hover:text-[#f5c400] transition-colors text-sm font-medium"
            to="/user/book"
          >
            Book Ride
          </Link>
          <Link
            className="text-[#f5c400] border-b-2 border-[#f5c400] pb-1 text-sm font-bold"
            to="/user/history"
          >
            History
          </Link>
          <button className="text-slate-600 hover:text-red-500 transition-colors text-sm font-medium">
            Logout
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 text-slate-700 md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="size-10 rounded-full bg-[#f5c400]/20 flex items-center justify-center ring-2 ring-[#f5c400]/20">
            <span className="material-symbols-outlined text-[#f5c400]">
              person
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center py-8 px-4 lg:px-20">
        <div className="flex flex-col max-w-[1024px] flex-1 gap-6">
          {/* Title + Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                Ride History
              </h1>
              <p className="text-slate-500 text-base">
                View all your past rides and trip details
              </p>
            </div>

            {/* Filter Tabs */}
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

          {/* Ride Cards */}
          {filteredRides.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredRides.map((ride) => (
                <Link
                  key={ride._id}
                  to={`/user/ride/${ride._id}`}
                  className="group flex flex-col md:flex-row items-stretch justify-between gap-4 rounded-xl bg-white p-5 shadow-sm border border-transparent hover:border-[#f5c400]/40 transition-all"
                >
                  <div className="flex flex-col flex-1 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        {ride.date}
                      </p>
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

                    <div className="flex items-center gap-2">
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
            <div className="flex justify-center mt-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5c400]/10 hover:bg-[#f5c400]/20 text-[#f5c400] font-bold transition-all">
                Load More Rides
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 lg:px-20 mt-auto">
        <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
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