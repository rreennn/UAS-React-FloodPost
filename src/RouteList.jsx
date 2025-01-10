import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AllPosts from "./Pages/AllPosts";
import AddPosts from "./Pages/AddPosts";
import ProtectedRoute from "./ProtectedRoute";
import ManagePosts from "./Pages/ManagePosts";
import EditPost from "./Pages/EditPost";

const RouteList = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/posts",
    element: (
      <ProtectedRoute element={<AllPosts />}/>
        
    ),
  },
  {
    path: "/add",
    element: (
      <ProtectedRoute element={<AddPosts />}/>
    ),
  },
  {
    path: "/manage",
    element: (
      <ProtectedRoute element={<ManagePosts />}/>
    ),
  },
  {
    path: "/edit-post/:id",
    element: <EditPost />,
  },
]);

export default RouteList;
