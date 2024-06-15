import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Users } from "../pages/users/Users";
import { Products } from "../pages/products/Products";
import { Login } from "../pages/Auth/Login";
import { AddProduct } from "@/pages/products/product-detail/add-product-form";
import { Category } from "@/pages/category/Category";
import { AddCategory } from "@/pages/category/category-detail/add-category-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "login", element: <Login /> },
      // { path: "orders", element: <Orders /> },
      { path: "/newProduct", element: <AddProduct /> },
      { path: "/categories", element: <Category /> },
      { path: "/newCategory", element: <AddCategory /> },
    ],
  },
]);
