import { FaAmazon, FaMotorcycle, FaShieldAlt } from "react-icons/fa";

const partners = [
  {
    id: 1,
    name: "Yamaha",
    logo: "", // No image, will fallback to icon
    years: 7,
    icon: <FaMotorcycle size={48} className="text-cyan-400" />,
    website: "https://www.yamaha-motor.com",
  },
  {
    id: 2,
    name: "Honda",
    logo: "",
    years: 5,
    icon: <FaShieldAlt size={48} className="text-red-600" />,
    website: "https://www.honda.com",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "",
    years: 3,
    icon: <FaAmazon size={48} className="text-yellow-400" />,
    website: "https://www.amazon.com",
  },
  {
    id: 4,
    name: "Suzuki",
    logo: "", // no image
    years: 6,
    icon: <FaMotorcycle size={48} className="text-blue-500" />,
    website: "https://www.suzuki.com",
  },
  {
    id: 5,
    name: "Kawasaki",
    logo: "",
    years: 4,
    icon: <FaShieldAlt size={48} className="text-green-500" />,
    website: "https://www.kawasaki.com",
  },
];

export default function PartnerMarquee() {
  return (
    <section className="bg-gray-900 py-10">
      <h2 className="text-center text-4xl font-bold mb-6 text-cyan-400">
        Our Trusted <span className="text-white">Partners</span>
      </h2>

      <div className="overflow-hidden whitespace-nowrap">
        <div
          className="inline-flex space-x-12 animate-marquee"
          style={{
            animationDuration: "30s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {partners
            .concat(partners)
            .map(({ id, name, logo, icon, years, website }, idx) => (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                key={`${id}-${idx}`}
                className="flex flex-col items-center justify-center w-36 cursor-pointer hover:scale-110 transform transition duration-300"
                title={`${name} - Partner for ${years} years`}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={name}
                    className="h-16 w-auto object-contain mb-2"
                    loading="lazy"
                  />
                ) : (
                  <div className="mb-2">{icon}</div>
                )}
                <span className="text-white font-semibold text-center">
                  {name}
                </span>
                <span className="text-cyan-400 text-sm">{years} yrs</span>
              </a>
            ))}
        </div>
      </div>

      {/* Custom marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%)
          }
          100% {
            transform: translateX(-50%)
          }
        }
        .animate-marquee {
          animation-name: marquee;
        }
      `}</style>
    </section>
  );
}
