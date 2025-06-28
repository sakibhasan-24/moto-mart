import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const locations = [
  {
    country: "USA",
    brand: "Yamaha Showroom",
    city: "Los Angeles",
    email: "contact@yamaha-usa.com",
    phone: "+1 555-1234",
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    country: "UK",
    brand: "Kawasaki Dealer",
    city: "London",
    email: "info@kawasaki-uk.co.uk",
    phone: "+44 20 7946 0123",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    country: "India",
    brand: "Honda Bikes",
    city: "New Delhi",
    email: "support@honda.in",
    phone: "+91 11 2345 6789",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    country: "Germany",
    brand: "BMW Motorrad",
    city: "Berlin",
    email: "service@bmw-motorrad.de",
    phone: "+49 30 123456",
    lat: 52.52,
    lng: 13.405,
  },
  {
    country: "Canada",
    brand: "Suzuki Center",
    city: "Toronto",
    email: "contact@suzuki.ca",
    phone: "+1 416-555-7890",
    lat: 43.65107,
    lng: -79.347015,
  },
  {
    country: "Japan",
    brand: "Yamaha HQ",
    city: "Iwata",
    email: "hq@yamaha.co.jp",
    phone: "+81 538 37 1234",
    lat: 34.7108,
    lng: 137.726,
  },
];

export default function MotoMartMap() {
  return (
    <section className="bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-3">
          Our <span className="text-cyan-400">Global Locations</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Find MotoMart partner showrooms and dealer hubs across the world.
        </p>
      </motion.div>

      <motion.div
        className="h-[500px] w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={false}
          className="h-full w-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc, i) => (
            <Marker key={i} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.brand}</strong>
                <br />
                {loc.city}, {loc.country}
                <br />
                <a
                  href={`mailto:${loc.email}`}
                  className="text-cyan-400 underline"
                >
                  {loc.email}
                </a>
                <br />
                <a
                  href={`tel:${loc.phone}`}
                  className="text-cyan-400 underline"
                >
                  {loc.phone}
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </section>
  );
}
