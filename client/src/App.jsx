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
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
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
      element: (
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/book",
      element: (
        <ProtectedRoute>
          <BookRide />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/ride/:rideId",
      element: (
        <ProtectedRoute>
          <RideTracking />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/history",
      element: (
        <ProtectedRoute>
          <UserHistory />
        </ProtectedRoute>
      ),
    },

    // 🔐 DRIVER PROTECTED ROUTES
    {
      path: "/driver/dashboard",
      element: (
        <ProtectedRoute>
          <DriverDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/driver/ride/:rideId",
      element: (
        <ProtectedRoute>
          <DriverRide />
        </ProtectedRoute>
      ),
    },
    {
      path: "/driver/history",
      element: (
        <ProtectedRoute>
          <DriverHistory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;