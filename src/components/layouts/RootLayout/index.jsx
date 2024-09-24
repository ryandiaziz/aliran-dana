import { Outlet } from "react-router-dom";
import AppbarCus from "../../elements/Appbar";

const RootLayout = () => {
    return (
        <>
            {/* OTHER ELEMENT */}          
            <AppbarCus/>  
            <Outlet />
        </>
    );
};

export default RootLayout;