import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../utils/auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isPage = false, children }) => {
    if (!isAuthenticated()) {
        // Jika tidak ada token, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }
    return isPage ? children : <Outlet />; // Jika token ada, render komponen anak
};

ProtectedRoute.propTypes = {
    isPage: PropTypes.bool,
    children: PropTypes.node
}

export default ProtectedRoute;
