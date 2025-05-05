import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminHeader />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
