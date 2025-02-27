import { Outlet } from "react-router";
import Navbar from "../components/NavbarLogo/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <div className="text-white font-bold text-4xl">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
