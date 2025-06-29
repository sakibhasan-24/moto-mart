import { FaTools, FaHardHat } from "react-icons/fa";

export default function Accessories() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="text-center">
        <div className="animate-bounce text-yellow-400 text-6xl mb-6 flex justify-center">
          <FaHardHat />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🚧 Under Construction
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          We're currently working on something awesome. Please check back later.
        </p>

        <div className="mt-8 animate-pulse text-yellow-500 text-3xl flex justify-center">
          <FaTools />
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Moto Mart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
