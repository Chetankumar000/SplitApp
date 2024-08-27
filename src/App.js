import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import DashBoard from "./components/DashBoard";
import Error from "./components/Error";
import TermsAndConditions from "./components/TermsAndConditions";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "terms",
    element: <TermsAndConditions />,
  },
  {
    path: "error",
    element: <Error />,
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <RouterProvider router={appRouter}></RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
