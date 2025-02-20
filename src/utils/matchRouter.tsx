import { useLocation } from "react-router";

const matchRouter = (path: String) => {
  const location = useLocation();
  if (path === location.pathname) return true;
};

export default matchRouter;
