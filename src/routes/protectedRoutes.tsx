import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoute({ children }: any) {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
