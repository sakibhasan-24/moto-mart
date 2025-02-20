import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
