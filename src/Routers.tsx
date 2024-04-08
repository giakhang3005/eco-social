import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Points from "./Layout/Points/Points";
import Log from "./Layout/Log/Log";
import NewFeed from "./Layout/NewFeed/NewFeed";
import Profile from "./Layout/Profile/Profile";
import NewPosts from "./Layout/NewPosts/NewPosts";
import Post from "./Layout/Post/Post";
import PostApprove from "./Layout/PostApprove/PostApprove";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Layout />,
        children: [
            {
                path: "/",
                element: <NewFeed />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/points",
                element: <Points />,
            },
            {
                path: "/approval",
                element: <PostApprove />,
            },
            {
                path: "/log",
                element: <Log />,
            },
            {
                path: "/new-post",
                element: <NewPosts />,
            },
            {
                path: "/post/:id",
                element: <Post />,
            }
        ]
    },
]);