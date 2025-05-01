import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/UserHeader.jsx";
import Footer from "../components/Footer.jsx";

export default function UserLayout() {
  return (
    <>
      <UserHeader />
      <Outlet />
      <Footer />
    </>
  );
}