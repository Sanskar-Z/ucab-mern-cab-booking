import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom colored icons
const pickupIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const dropIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function LocationSelector({ pickup, drop, setPickup, setDrop }) {
    useMapEvents({
        click(e) {
            const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
            if (!pickup) setPickup(coords);
            else if (!drop) setDrop(coords);
            else {
                setPickup(coords);
                setDrop(null);
            }
        },
    });

    return (
        <>
            {pickup && <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />}
            {drop && <Marker position={[drop.lat, drop.lng]} icon={dropIcon} />}
        </>
    );
}

export default function MapSelector({ pickup, drop, setPickup, setDrop, height = "100%", width = "100%" }) {
    return (
        <MapContainer center={[18.5204, 73.8567]} zoom={13} style={{ height, width }} className="rounded-xl">
            <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector pickup={pickup} drop={drop} setPickup={setPickup} setDrop={setDrop} />
        </MapContainer>
    );
}