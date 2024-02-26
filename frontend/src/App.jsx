// import { useState } from "react";
import Home from "./components/Home/Home";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "./APIServices/users/usersAPI";
import { isAuthenticated } from "./redux/slices/authSlices";
import { useEffect } from "react";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UserDashbaord from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummary";
import AddCategory from "./components/Category/AddCategory";
import CreatePlan from "./components/Plans/CreatePlan";
import Pricing from "./components/Plans/Pricing";

function App() {
  //! use query
  const { isError, isLoading, data, isSuccess, error, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatus,
  });
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  //Get the login user from store
  const { userAuth } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {/* Nav */}
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* User dashboard */}
        <Route path="/dashboard" element={<UserDashbaord />}>
          {/* Account summery */}
          <Route
            path=""
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
          />
          {/* Create post */}
          <Route
            path="create-post"
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
          />
          {/* Create plan */}
          <Route
            path="create-plan"
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
          />
          {/* Create category */}
          <Route
            path="add-category"
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
          />
        </Route>
        {/* Public  routes */}
        <Route path="/posts" element={<PostsList />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        {/* <Route path="/post/:postId" element={<UpdatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
