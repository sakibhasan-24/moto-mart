import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/features/auth.slice";
import { useSignupMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthButton from "../../components/button/AuthButton";

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      dispatch(setUser(response));

      toast.success("Signup successful! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 3000);
    } catch (err: any) {
      console.error("Signup failed:", err);

      toast.error(err?.data?.message || "Signup failed. Please try again!", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-6 min-h-screen">
      <div className="w-full max-w-md border-4 border-transparent animate-border text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 text-green-600">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-gray-500 py-2">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none text-white w-full p-2"
              placeholder="Your Name"
              required
            />
          </div>

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

          <AuthButton
            isLoading={isLoading}
            text="Sign Up"
            icon={<FaUserPlus className="mr-2 text-lg" />}
          />
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
