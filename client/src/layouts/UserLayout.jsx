import { Outlet } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader.jsx';
import Footer from '../components/Footer.jsx';

export default function UserLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <UserHeader />
      <main className="flex-fill py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}