import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Points from "./Layout/Points/Points";
import Log from "./Layout/Log/Log";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Layout />,
        children: [
            {
                path: "/",
                element: "New Feed",
            },
            {
                path: "/profile",
                element: "Profile",
            },
            {
                path: "/points",
                element: <Points />,
            },
            {
                path: "/log",
                element: <Log />,
            },
        ]
    },
]);