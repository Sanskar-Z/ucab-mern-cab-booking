import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import BookRide from "./pages/BookRide";
import RideTracking from "./pages/RideTracking";
import UserHistory from "./pages/UserHistory";
import DriverDashboard from "./pages/DriverDashboard";
import DriverRide from "./pages/DriverRide";
import DriverHistory from "./pages/DriverHistory";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/user/dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/user/book",
      element: <BookRide />,
    },
    {
      path: "/user/ride/:rideId",
      element: <RideTracking />,
    },
    {
      path: "/user/history",
      element: <UserHistory />,
    },
    {
      path: "/driver/dashboard",
      element: <DriverDashboard />,
    },
    {
      path: "/driver/ride/:rideId",
      element: <DriverRide />,
    },
    {
      path: "/driver/history",
      element: <DriverHistory />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;