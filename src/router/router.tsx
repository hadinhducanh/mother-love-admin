import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Users } from "../pages/users/Users";
import { Products } from "../pages/products/Products";
import { Login } from "../pages/Auth/Login";
import { AuthProvider } from "@/pages/Auth/AuthContext";
import { AddProduct } from "@/pages/products/product-detail/add-product-form";
import { Category } from "@/pages/category/Category";
import { AddCategory } from "@/pages/category/category-detail/add-category-form";
const AppWithProvider = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithProvider />,
    children: [
      { path: "", element: <Login /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "home", element: <Home /> },
      // { path: "orders", element: <Orders /> },
      { path: "/newProduct", element: <AddProduct /> },
      { path: "/categories", element: <Category /> },
      { path: "/newCategory", element: <AddCategory /> },
    ],
  },
]);
