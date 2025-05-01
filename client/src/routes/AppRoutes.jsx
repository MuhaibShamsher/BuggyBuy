import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout.jsx';
import UserLayout from '../layouts/UserLayout.jsx';

import AdminLogin from '../pages/admin/AdminLogin.jsx';
import AdminProfile from '../pages/admin/AdminProfile.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ProductForm from '../pages/admin/ProductForm.jsx';
import ProductList from '../pages/admin/ProductList.jsx';
import UserList from '../pages/admin/UserList.jsx';

import Home from '../pages/user/Home.jsx';
import Register from '../pages/user/Register.jsx';
import Login from '../pages/user/Login.jsx';
import Profile from '../pages/user/Profile.jsx';
import Product from '../pages/user/Product.jsx';
import Cart from '../pages/user/Cart.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="users" element={<UserList />} />
      </Route>
    </>
  )
);


export default function AppRoutes() {
  return <RouterProvider router={router} />;
}