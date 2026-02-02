import { createBrowserRouter } from "react-router";
import { Dashboard } from "@/app/components/Dashboard";
import { Profile } from "@/app/components/Profile";
import { Login } from "@/app/components/Login";
import { Recipes } from "@/app/components/Recipes";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/recipes",
    Component: Recipes,
  },
]);