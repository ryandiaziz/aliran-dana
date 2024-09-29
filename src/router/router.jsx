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
import CategoriesPage from "../pages/categories/categoriesPage";
import AddCategoryPage from "../pages/add-category/AddCategoryPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="add-transaction" element={<AddTransactionPage />} />
            <Route path="accounts" element={<AccountPage />}/>
            <Route path="accounts/add-account" element={<AddAccountPage />} />
            <Route path="accounts/:account" element={<AddAccountPage />} />
            <Route path="categories" element={<CategoriesPage/>}/>
            <Route path="categories/add-category" element={<AddCategoryPage/>}/>
            <Route path="/categories/:category" element={<AddCategoryPage/>} />
        </Route>
    )
)

export default router