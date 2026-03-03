import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationSelector({ pickup, drop, setPickup, setDrop }) {
    useMapEvents({
        click(e) {
            const coords = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            };

            if (!pickup) {
                setPickup(coords);
            } else if (!drop) {
                setDrop(coords);
            } else {
                // reset if both already selected
                setPickup(coords);
                setDrop(null);
            }
        },
    });

    return (
        <>
            {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
            {drop && <Marker position={[drop.lat, drop.lng]} />}
        </>
    );
}

export default function MapSelector({
    pickup,
    drop,
    setPickup,
    setDrop,
}) {
    return (
        <MapContainer
            center={[18.5204, 73.8567]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="rounded-xl"
        >
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationSelector
                pickup={pickup}
                drop={drop}
                setPickup={setPickup}
                setDrop={setDrop}
            />
        </MapContainer>
    );
}