import { useState } from "react";
import UserHeader from "../components/UserHeader";
import API from "../services/api";
import MapSelector from "../components/MapSelector";

export default function BookRide() {
  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");

  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  // address to coordinate
  async function getCoordsFromAddress(address) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );

    const data = await res.json();

    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }

  // Distance Calculation
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dlat = ((lat2 - lat1) * Math.PI) / 180;
    const dlon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }


  // get address from coords
  async function getAddressFromCoords(lat, lng) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();

    if (!data || !data.display_name) return null;

    return data.display_name;
  }

  // Get Estimate
  async function handleGetEstimate() {
    try {
      setLoading(true);

      let pickupCoords = pickup;
      let dropCoords = drop;

      // If coordinates not selected from map, use text
      if (!pickupCoords && pickupText) {
        pickupCoords = await getCoordsFromAddress(pickupText);
      }

      if (!dropCoords && dropText) {
        dropCoords = await getCoordsFromAddress(dropText);
      }

      if (!pickupCoords || !dropCoords) {
        alert("Unable to determine pickup or drop location.");
        return;
      }

      setPickup(pickupCoords);
      setDrop(dropCoords);

      const distance = calculateDistance(
        pickupCoords.lat,
        pickupCoords.lng,
        dropCoords.lat,
        dropCoords.lng
      );

      const baseFare = 50;
      const perKmRate = 15;

      const fare = baseFare + distance * perKmRate;

      setEstimate({
        distance: distance.toFixed(2) + " km",
        duration: Math.round(distance * 3) + " mins",
        fare: "₹" + Math.round(fare),
      });

    } catch (error) {
      alert("Error fetching location data.");
    } finally {
      setLoading(false);
    }
  }

  // Book Ride
  async function handleBookNow() {
    if (!pickup || !drop) {
      alert("Please generate fare estimate first.");
      return;
    }

    try {
      await API.post("/rides", {
        pickupLocation: pickup,
        dropLocation: drop,
      });

      alert("Ride booked successfully!");

      setPickupText("");
      setDropText("");
      setPickup(null);
      setDrop(null);
      setEstimate(null);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while booking."
      );
    }
  }

  return (
    <div className="bg-[#f8f8f5] text-slate-900 min-h-screen font-[Inter]">
      <UserHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight">Book a Ride</h1>
          <p className="text-slate-500 mt-1">
            Quick, safe, and professional drivers at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                      value={pickupText}
                      onChange={(e) => setPickupText(e.target.value)}
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
                      value={dropText}
                      onChange={(e) => setDropText(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={handleGetEstimate}
                  disabled={loading}
                  className="w-full py-3 px-4 text-slate-900 font-bold text-sm bg-[#f5c400]/10 hover:bg-[#f5c400]/20 rounded-lg transition-colors border border-[#f5c400]/20"
                >
                  {loading ? "Calculating..." : "Get Fare Estimate"}
                </button>

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

          <div className="lg:col-span-7 h-[400px] lg:h-[600px] w-full relative">
            <MapSelector
              pickup={pickup}
              drop={drop}
              setPickup={async (coords) => {
                setPickup(coords);
                const address = await getAddressFromCoords(coords.lat, coords.lng);
                if (address) setPickupText(address);
              }}
              setDrop={async (coords) => {
                setDrop(coords);
                const address = await getAddressFromCoords(coords.lat, coords.lng);
                if (address) setDropText(address);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}