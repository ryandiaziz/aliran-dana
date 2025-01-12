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
import TransferPage from "../pages/transfer/TransferPage";
import ProtectedRoute from "../components/elements/ProtectedRoute";
import AuthLayout from "../components/layouts/AuthLayout";
import SignInPage from "../pages/sign-in/SignInPage";
import RegisterPage from "../pages/register/registerPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<SignInPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={
                        <ProtectedRoute isPage={true}>
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    <Route path="add-transaction" element={
                        <ProtectedRoute isPage={true}>
                            <AddTransactionPage />
                        </ProtectedRoute>
                    } />
                    <Route path="transfer" element={
                        <ProtectedRoute isPage={true}>
                            <TransferPage />
                        </ProtectedRoute>} />
                    <Route path="accounts" element={
                        <ProtectedRoute isPage={true}>
                            <AccountPage />
                        </ProtectedRoute>
                    } />
                    <Route path="accounts/add-account" element={
                        <ProtectedRoute isPage={true}>
                            <AddAccountPage />
                        </ProtectedRoute>
                    } />
                    <Route path="accounts/:account" element={
                        <ProtectedRoute isPage={true}>
                            <AddAccountPage />
                        </ProtectedRoute>
                    } />
                    <Route path="categories" element={
                        <ProtectedRoute isPage={true}>
                            <CategoriesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="categories/add-category" element={
                        <ProtectedRoute isPage={true}>
                            <AddCategoryPage />
                        </ProtectedRoute>
                    } />
                    <Route path="categories/:category" element={
                        <ProtectedRoute isPage={true}>
                            <AddCategoryPage />
                        </ProtectedRoute>} />
                </Route>
            </Route>
        </>
    )
)

export default router