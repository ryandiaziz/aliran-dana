import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            {/* OTHER ELEMENT */}            
            <Outlet />
        </>
    );
};

export default RootLayout;