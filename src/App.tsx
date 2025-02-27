import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import StripeProvider from "./components/stripe/StripeProvider";

const App: React.FC = () => (
  <div>
    <StripeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </StripeProvider>
  </div>
);

export default App;
