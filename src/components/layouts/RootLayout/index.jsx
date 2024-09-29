import { Outlet } from "react-router-dom";
import AppbarCus from "../../elements/Appbar";
import AlertDialog from "../../elements/AlertDialog";

const RootLayout = () => {
    return (
        <>
            {/* OTHER ELEMENT */}
            <AppbarCus/>
            <AlertDialog/>
            <Outlet />
        </>
    );
};

export default RootLayout;