import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => (
  <div>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </div>
);

export default App;
