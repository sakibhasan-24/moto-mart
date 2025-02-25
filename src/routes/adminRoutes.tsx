import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { JSX } from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!user || (user && user?.role !== "admin")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
