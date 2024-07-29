import { createBrowserRouter } from "react-router-dom";
import Archive from "../pages/Archive";
import DashboardPage from "../pages/DashboardPage";
import ErrorPage from "../pages/ErroPage";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Orders from "../pages/Orders";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders/archive",
    element: (
      <PrivateRoute>
        <Archive />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
