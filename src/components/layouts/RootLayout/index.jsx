import { Outlet } from "react-router-dom";
import HomePage from "../../../pages/home/HomePage";

const RootLayout = () => {
    return (
        <>
            {/* OTHER ELEMENT */}
            <HomePage/>
            <Outlet />
        </>
    );
};

export default RootLayout;