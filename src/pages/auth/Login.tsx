// import { useState } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login Data:", formData);
//   };

//   return (
//     <div
//       className="flex border-4
//       border-transparent animate-border  items-center justify-center  p-4"
//     >
//       <div className="w-full max-w-md  text-white p-6 rounded-lg  shadow-lg">
//         <h2 className="text-3xl sm:text-6xl font-bold text-center text-blue-600 ">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex items-center border-b border-gray-500 py-2">
//             <FaEnvelope className="text-gray-400 mr-3" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="bg-transparent outline-none text-white w-full p-2"
//               placeholder="Your Email"
//               required
//             />
//           </div>

//           <div className="flex items-center border-b border-gray-500 py-2">
//             <FaLock className="text-gray-400 mr-3" />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="bg-transparent outline-none text-white w-full p-2"
//               placeholder="Your Password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-400">
//           <Link
//             to="/forgot-password"
//             className="block hover:underline text-blue-400"
//           >
//             Forgot Password?
//           </Link>
//           <p className="mt-2">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-400 hover:underline">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/api/authApi";
import { setUser } from "../../redux/features/auth.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(formData).unwrap();
      dispatch(setUser(response));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex border-4 border-transparent animate-border items-center justify-center p-4">
      <div className="w-full max-w-md text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl sm:text-6xl font-bold text-center text-blue-600">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-500 py-2">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="flex items-center border-b border-gray-500 py-2">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-2">
            {(error as any)?.data?.message || "Login failed. Try again."}
          </p>
        )}

        <div className="mt-4 text-center text-gray-400">
          <Link
            to="/forgot-password"
            className="block hover:underline text-blue-400"
          >
            Forgot Password?
          </Link>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
