import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";

import { SearchProvider } from "./context/SearchContext";
import { MarkProvider } from "./context/MarkContext";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./ui/ProtectedRoute";
import FullSpinner from "./ui/FullSpinner";
import ToastNotif from "./ui/ToastNotif";

const ProtectFromAuth = lazy(() => import("./ui/ProtectFromAuth"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Error = lazy(() => import("./ui/Error"));

const ManagePosts = lazy(() => import("./featues/posts/ManagePosts"));
const ManageUsers = lazy(() => import("./featues/users/ManageUsers"));
const CreatePost = lazy(() => import("./featues/posts/CreatePost"));
const Posts = lazy(() => import("./featues/posts/Posts"));
const Post = lazy(() => import("./featues/posts/Post"));

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const FavouritePosts = lazy(() => import("./pages/FavouritePosts"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));

const routes = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<FullSpinner />}>
        <MarkProvider>
          <SearchProvider>
            <AppLayout />
          </SearchProvider>
        </MarkProvider>
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "/post/:slug", element: <Post /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "/favourite-posts", element: <FavouritePosts /> },
      { path: "/admin/manage-posts", element: <ManagePosts /> },
      { path: "/admin/manage-users", element: <ManageUsers /> },
      { path: "/admin/create-post", element: <CreatePost /> },
    ],
    errorElement: (
      <Suspense>
        <Error />,
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<FullSpinner />}>
        <ProtectFromAuth />
      </Suspense>
    ),
    children: [
      { path: "/signin", element: <Signin />, errorElement: <Error /> },
      { path: "/signup", element: <Signup />, errorElement: <Error /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<FullSpinner />}>
        <PageNotFound />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <ToastNotif />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
