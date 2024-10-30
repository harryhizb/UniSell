import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import ShopPage from "../pages/shop/ShopPage";
import ErrorPage from "../components/ErrorPage";
import Search from "../pages/search/Search";
import Login from "../components/Login";
import Register from "../components/Register";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import SingleProduct from "../pages/shop/productdetais/SingleProduct";
import PaymentSuccess from "../components/PaymentSuccess";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserPayments from "../pages/dashboard/user/UserPayments";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import SellerDMain from "../pages/dashboard/seller/SellerDMain";
import AddSellerProduct from "../pages/dashboard/seller/AddSellerProduct";
import ManageSellerProducts from "../pages/dashboard/seller/ManageSellerProducts"; // Import ManageSellerProducts
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
// import ManageProducts from "../pages/dashboard/admin/manageProduct/ManageProducts";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import ManageSellerOrders from "../pages/dashboard/seller/ManageSellerOrders"; // Import ManageSellerOrders
import UpdateSellerProduct from "../pages/dashboard/seller/UpdateSellerProduct"; // Import UpdateSellerProduct
import AboutUs from "../pages/about-us/AboutUs";
import { elements } from "chart.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/success", element: <PaymentSuccess /> },
      { path: "/orders/:orderId", element: <OrderDetails /> },
    ],
  },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // Main Dashboard Layout
    children: [
      // User routes (accessible to buyers)
      { path: "", element: <UserDMain /> }, // Default route for user dashboard
      { path: "orders", element: <UserOrders /> },
      { path: "payments", element: <UserPayments /> },
      { path: "profile", element: <UserProfile /> },
      { path: "reviews", element: <UserReviews /> }, // Add reviews route if needed

      // Seller routes (restricted to sellers)
      {
        path: "seller",
        element: <SellerDMain />, // Seller Dashboard
      },
      {
        path: "seller/manage-orders",
        element: <ManageSellerOrders />,
      },
      {
        path: "seller/reviews",
        element: <UserReviews />,
      },
      {
        path: "seller/payments",
        element: <UserPayments />,
      },
      {
        path: "seller/add-new-post",
        element: <AddSellerProduct />,
      },
      {
        path: "seller/manage-products",
        element: <ManageSellerProducts />,
      },

      // Admin routes (restricted to admins)
      {
        path: "admin",
        element: <AdminDMain />,
      },
      {
        path: "admin/add-new-post",
        element: <AddProduct />,
      },
      // {
      //   path: "admin/manage-products",
      //   element: <ManageProducts />,
      // },
      {
        path: "admin/update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "admin/users",
        element: <ManageUser />,
      },
      // {
      //   path: "admin/manage-orders",
      //   element: <ManageOrders />,
      // },
    ],
  },
]);

export default router;
