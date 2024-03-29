import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";

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

            // {
            //     // path: "p/:postId",
            //     // element: post
            // }
        ]
    },
]);