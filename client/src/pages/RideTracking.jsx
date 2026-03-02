import { Link, useParams } from "react-router-dom";

export default function RideTracking() {
  const { rideId } = useParams();

  // Later this will come from polling GET /rides/:rideId every 5 seconds
  const ride = {
    _id: rideId,
    status: "DRIVER_ON_THE_WAY", // REQUESTED, ASSIGNED, DRIVER_ON_THE_WAY, STARTED, COMPLETED, CANCELLED
    pickupLocation: "123 Tech Avenue, Innovation Park",
    dropLocation: "Central Grand Station, Main St.",
    driverName: "John Doe",
    driverVehicle: "Toyota Prius",
    driverPlate: "MH-12-AB-1234",
    driverRating: "4.9",
    arrival: "8 mins",
    distance: "3.2 km",
    fare: "₹250",
  };

  // Progress steps config
  const steps = [
    { key: "REQUESTED", label: "Requested" },
    { key: "ASSIGNED", label: "Driver Assigned" },
    { key: "DRIVER_ON_THE_WAY", label: "Driver On the Way" },
    { key: "STARTED", label: "Ride Started" },
    { key: "COMPLETED", label: "Completed" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === ride.status);

  // Can cancel only before ride starts
  const canCancel =
    ride.status !== "STARTED" &&
    ride.status !== "COMPLETED" &&
    ride.status !== "CANCELLED";

  function handleCancel() {
    // Later: POST /rides/:rideId/cancel
    alert("Cancel ride... (API integration coming soon)");
  }

  return (
    <div className="bg-slate-50 text-slate-900 font-[Inter] min-h-screen">
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
              className="text-slate-600 hover:text-[#f5c400] transition-colors"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-slate-600 hover:text-[#f5c400] transition-colors"
              to="/user/book"
            >
              Book Ride
            </Link>
            <Link
              className="text-slate-600 hover:text-[#f5c400] transition-colors"
              to="/user/history"
            >
              History
            </Link>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Ride Details */}
          <section className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Status Badge */}
              <div className="p-6 border-b border-slate-50">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {ride.status.replace(/_/g, " ")}
                </div>
              </div>

              {/* Pickup & Drop */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#f5c400] mt-1">
                    location_on
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">
                      Pickup Location
                    </p>
                    <p className="text-slate-700 font-medium">
                      {ride.pickupLocation}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-slate-400 mt-1">
                    navigation
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase">
                      Drop Location
                    </p>
                    <p className="text-slate-700 font-medium">
                      {ride.dropLocation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6">
                <hr className="border-slate-100" />
              </div>

              {/* Driver Info */}
              <div className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-500 text-3xl">
                    person
                  </span>
                </div>
                <div>
                  <h3 className="font-bold">{ride.driverName}</h3>
                  <p className="text-sm text-slate-500">
                    {ride.driverVehicle} •{" "}
                    <span className="font-mono">{ride.driverPlate}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[#f5c400] text-sm">
                      star
                    </span>
                    <span className="text-xs font-semibold">
                      {ride.driverRating}
                    </span>
                  </div>
                </div>
                <button className="ml-auto w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-[#f5c400] hover:text-white transition-all">
                  <span className="material-symbols-outlined">phone</span>
                </button>
              </div>

              {/* Ride Stats */}
              <div className="grid grid-cols-3 border-y border-slate-100 bg-slate-50/50">
                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Arrival
                  </p>
                  <p className="font-bold">{ride.arrival}</p>
                </div>
                <div className="p-4 text-center border-r border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Distance
                  </p>
                  <p className="font-bold">{ride.distance}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Fare
                  </p>
                  <p className="font-bold">{ride.fare}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="p-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">
                  Ride Progress
                </h4>
                <div className="space-y-6 relative">
                  {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isActive = index === currentStepIndex;
                    const isPending = index > currentStepIndex;
                    const isLast = index === steps.length - 1;

                    return (
                      <div
                        key={step.key}
                        className="flex items-start gap-4 relative z-10"
                      >
                        {/* Step circle */}
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white text-xs">
                              check
                            </span>
                          </div>
                        )}
                        {isActive && (
                          <div className="w-6 h-6 rounded-full bg-[#f5c400] flex items-center justify-center flex-shrink-0 ring-4 ring-yellow-100">
                            <span className="material-symbols-outlined text-white text-xs">
                              local_shipping
                            </span>
                          </div>
                        )}
                        {isPending && (
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex-shrink-0" />
                        )}

                        {/* Connecting line */}
                        {!isLast && (
                          <div
                            className={`absolute left-[11px] w-0.5 h-6 mt-6 ${
                              isCompleted ? "bg-green-500" : "bg-slate-200"
                            }`}
                            style={{ top: `${index * 48 + 20}px` }}
                          />
                        )}

                        {/* Label */}
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "font-bold text-slate-900"
                              : isCompleted
                                ? "text-slate-500"
                                : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cancel Button */}
              {canCancel && (
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={handleCancel}
                    className="w-full py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors shadow-sm active:scale-[0.98]"
                  >
                    Cancel Ride
                  </button>
                </div>
              )}
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
                    Live Map Tracking
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
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600 hover:text-[#f5c400] mt-2">
                  <span className="material-symbols-outlined">
                    my_location
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}