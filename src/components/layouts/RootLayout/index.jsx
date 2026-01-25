import { Outlet } from "react-router-dom";
import AlertDialog from "../../elements/AlertDialog";

const RootLayout = () => {
    return (
        <>
            <AlertDialog/>
            <Outlet />
        </>
    );
};

export default RootLayout;