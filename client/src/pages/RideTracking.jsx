import UserHeader from "../components/UserHeader";
import { useState, useEffect } from "react";
import API from "../services/api";
import MapSelector from "../components/MapSelector";

export default function RideTracking() {

  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {

    const fetchActiveRide = async () => {

      try {

        const res = await API.get("/rides/user/active");
        setActiveRide(res.data.data);

      } catch (error) {

        console.log(
          "error in active ride:",
          error.response?.data?.message || error.message
        );

      }

    };

    fetchActiveRide();

    const interval = setInterval(fetchActiveRide, 5000);

    return () => clearInterval(interval);

  }, []);

  async function handleCancel() {

    if (!activeRide?._id) return;

    if (
      activeRide.status === "ONGOING" ||
      activeRide.status === "COMPLETED"
    ) {
      alert("Ride cannot be cancelled now.");
      return;
    }

    try {

      await API.post(`/rides/${activeRide._id}/cancel`);

      alert("Ride cancelled successfully!");

      setActiveRide(null);

    } catch (error) {

      alert(error.response?.data?.message || error.message);

    }

  }

  if (!activeRide) {

    return (
      <div className="min-h-screen bg-slate-50">
        <UserHeader />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-slate-500 font-medium">
            No active ride found.
          </p>
        </div>
      </div>
    );

  }

  return (
    <div className="bg-slate-50 text-slate-900 font-[Inter] min-h-screen">

      <UserHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left */}
          <section className="lg:col-span-5 xl:col-span-4 space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Status */}
              <div className="p-6 border-b border-slate-50">

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider">

                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

                  {activeRide.status}

                </div>

              </div>

              {/* Pickup Drop */}

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
                      {activeRide?.pickupLocation?.address}
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
                      {activeRide?.dropLocation?.address}
                    </p>

                  </div>

                </div>

              </div>

              <div className="px-6">
                <hr className="border-slate-100" />
              </div>

              {/* Driver */}

              <div className="p-6 flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-500 text-3xl">
                    person
                  </span>
                </div>

                <div>

                  {console.log("Driver:" + activeRide?.driver?.name)}
                  <h3 className="font-bold">
                    {activeRide?.driver
                      ? activeRide?.driver?.name
                      : "Driver Not Assigned"}
                  </h3>

                  <p className="text-sm text-slate-500">

                    {activeRide?.driver?.vehicleDetails?.vehicleType || ""}

                    {" "}

                    <span className="font-mono">
                      {activeRide?.driver?.vehicleDetails?.vehicleNumber || ""}
                    </span>

                  </p>

                </div>

                <button className="ml-auto w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-[#f5c400] hover:text-white transition-all">

                  <span className="material-symbols-outlined">phone</span>

                </button>

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 border-y border-slate-100 bg-slate-50/50">

                <div className="p-4 text-center border-r border-slate-100">

                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Distance
                  </p>

                  <p className="font-bold">
                    {activeRide?.distance
                      ? `${activeRide.distance.toFixed(2)} km`
                      : "--"}
                  </p>

                </div>

                <div className="p-4 text-center">

                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Fare
                  </p>

                  <p className="font-bold">
                    {activeRide?.fare
                      ? `₹ ${Math.round(activeRide.fare)}`
                      : "--"}
                  </p>

                </div>

              </div>

              {/* Cancel */}

              <div className="p-6 bg-slate-50 border-t border-slate-100">

                <button
                  onClick={handleCancel}
                  className="w-full py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors shadow-sm active:scale-[0.98]"
                >
                  Cancel Ride
                </button>

              </div>

            </div>

          </section>

          {/* Map */}

          <section className="lg:col-span-7 xl:col-span-8 lg:min-h-[700px]">

            <div className="flex justify-center h-full w-full">

              <MapSelector
                pickup={activeRide?.pickupLocation}
                drop={activeRide?.dropLocation}
                setPickup={() => { }}
                setDrop={() => { }}
                height="88%"
                width="88%"
              />

            </div>

          </section>

        </div>

      </main>

    </div>
  );

}