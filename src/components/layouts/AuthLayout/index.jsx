import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            {/* Elemen khusus untuk halaman login, jika ada */}
            <Outlet />
        </>
    );
};

export default AuthLayout;