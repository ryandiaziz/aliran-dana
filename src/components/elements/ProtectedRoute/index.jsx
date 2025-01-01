import axios from 'axios';
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../utils/auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isPage = false, children }) => {
    // Jika tidak ada token, arahkan ke halaman login
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    else axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    return isPage ? children : <Outlet />; // Jika token ada, render komponen anak
};

ProtectedRoute.propTypes = {
    isPage: PropTypes.bool,
    children: PropTypes.node
}

export default ProtectedRoute;
