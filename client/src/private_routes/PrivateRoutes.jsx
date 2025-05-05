import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const UserPrivateRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);

    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}