import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Users } from "../pages/users/Users";
import { Products } from "../pages/products/Products";
import { Login } from "../pages/Auth/Login";




export const router = createBrowserRouter([
    {
        path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "login", element: <Login /> },
    ],
    }
])