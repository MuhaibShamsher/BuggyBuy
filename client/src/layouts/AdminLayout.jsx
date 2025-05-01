import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
    </>
  );
}