import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import HomePage from "../pages/home/HomePage";
import AddTransactionPage from "../pages/add-transaction/AddTransactionPage";
import AccountPage from "../pages/accounts/AccountPage";
import AddAccountPage from "../pages/add-account/AddAccountPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="add-transaction" element={<AddTransactionPage />} />
            <Route path="accounts" element={<AccountPage />}/>
            <Route path="accounts/add-account" element={<AddAccountPage />} />
        </Route>
    )
)

export default router