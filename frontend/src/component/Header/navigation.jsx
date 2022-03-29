import { FaSignInAlt, FaSign, FaHome, FaCartPlus } from "react-icons/fa";

export const mainNav = [
  {
    name: "Home",
    path: "/",
    icons: <FaHome />,
  },

  {
    name: "Products",
    path: "/product",
  },
];

export const rightNav = [
  {
    name: "Login",
    path: "/login",
    icons: <FaSignInAlt />,
  },

  {
    name: "Register",
    path: "/register",
    icons: <FaSign />,
  },
];
export const authNav = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icons: <FaSignInAlt />,
  },
];
