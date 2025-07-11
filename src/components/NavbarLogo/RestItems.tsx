// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { logout } from "../../redux/features/auth.slice";

// export default function RestItems() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   // console.log(user);

//   const handleLogOut = async () => {
//     dispatch(logout());
//   };
//   return (
//     <nav className="p-4 rounded-lg shadow-lg">
//       <ul className="flex space-x-6 justify-center text-sm sm:text-base font-semibold items-center">
//         <li>
//           <Link
//             to="/products"
//             className="text-cyan-400 neon-text hover:text-cyan-300 transition-all duration-300"
//           >
//             Products
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/about"
//             className="text-pink-400 neon-text hover:text-pink-300 transition-all duration-300"
//           >
//             About Us
//           </Link>
//         </li>

//         {user ? (
//           <div className="relative">
//             <button
//               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
//               hover:ring-2 hover:ring-blue-400 transition-all duration-300"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <FiUser className="text-white text-xl" />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-gray-900 z-50 text-white shadow-lg rounded-lg">
//                 <Link
//                   to="/dashboard/profile"
//                   className="flex items-center px-4 py-2 hover:bg-gray-800 transition-all duration-200"
//                 >
//                   <FiGrid className="mr-2" /> Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogOut}
//                   className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-800 transition-all duration-200"
//                 >
//                   <FiLogOut className="mr-2" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <li>
//             <Link
//               to="/auth/login"
//               className="text-green-400 neon-text hover:text-green-300 transition-all duration-300"
//             >
//               Login
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth.slice";

export default function RestItems() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    dispatch(logout());
  };

  return (
    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-sm sm:text-base font-semibold items-center">
      <li>
        <Link to="/all/products" className="text-cyan-400 hover:text-cyan-300">
          All Bikes
        </Link>
      </li>
      <li>
        <Link
          to="/accessories"
          className="text-orange-400 hover:text-orange-300"
        >
          Accessories
        </Link>
      </li>

      <li>
        <Link to="/blogs" className="text-pink-400 hover:text-pink-300">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/contact" className="text-green-400 hover:text-green-300">
          Contact
        </Link>
      </li>

      {user ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:ring-2 hover:ring-blue-400"
          >
            <FiUser className="text-white text-xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-900 text-white shadow-lg rounded-lg z-50">
              <Link
                to="/dashboard/change-pass"
                className="flex items-center px-4 py-2 hover:bg-gray-800"
              >
                <FiGrid className="mr-2" /> Dashboard
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-800"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <li>
          <Link to="/auth/login" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
}
