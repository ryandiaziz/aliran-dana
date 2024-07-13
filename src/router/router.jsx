import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import HomePage from "../pages/home/HomePage";
import AddTransactionPage from "../pages/add-transaction/AddTransactionPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="add-transaction" element={<AddTransactionPage />} />
        </Route>
    )
)

export default router