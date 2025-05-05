import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout.jsx';
import UserLayout from '../layouts/UserLayout.jsx';

import { UserPrivateRoute, AdminRoute } from '../private_routes/PrivateRoutes.jsx'

import AdminLogin from '../pages/admin/AdminLogin.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ProductList from '../pages/admin/ProductList.jsx';
import ProductForm from '../pages/admin/ProductForm.jsx';
import UserList from '../pages/admin/UserList.jsx';
import OrderList from '../pages/admin/OrderList.jsx';

import Home from '../pages/user/Home.jsx';
import Register from '../pages/user/Register.jsx';
import Login from '../pages/user/Login.jsx';
import Profile from '../pages/user/Profile.jsx';
import Product from '../pages/user/Product.jsx';
import Cart from '../pages/user/Cart.jsx';
import Shipping from '../pages/user/Shipping.jsx';
import PlaceOrder from '../pages/user/PlaceOrder.jsx';
import OrderDetails from '../pages/user/OrderDetails.jsx';

import PageNotFound from '../pages/PageNotFound.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />

        <Route element={<UserPrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Route>
      </Route>

      <Route path="/admin" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product/create" element={<ProductForm />} />
          <Route path="product/update/:id" element={<ProductForm />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="order-list" element={<OrderList />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);


export default function AppRoutes() {
  return <RouterProvider router={router} />;
}