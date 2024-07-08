import RootLayout from "../components/layouts/RootLayout";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

// import {
//     TodayPage,
//     UpcomingPage,
// } from "../pages/index"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            {/* <Route path="todays" element={<TodayPage />} />
            <Route path="upcomings" element={<UpcomingPage />} /> */}
        </Route>
    )
)

export default router