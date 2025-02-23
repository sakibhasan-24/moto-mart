import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => (
  <div>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </div>
);

export default App;
