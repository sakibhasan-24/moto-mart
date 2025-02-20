import { Outlet } from "react-router";
import Navbar from "../components/NavbarLogo/Navbar";

export default function MainLayout() {
  return (
    <div>
      <div className="text-white font-bold text-4xl">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
