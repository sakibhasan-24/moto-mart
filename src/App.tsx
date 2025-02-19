import { RouterProvider } from "react-router";
import router from "./routes/routes";

const App: React.FC = () => (
  <div>
    <RouterProvider router={router} />
  </div>
);

export default App;
