import React from "react";
import Login from "../User/Login";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "../../APIServices/users/usersAPI";
import { Navigate } from "react-router-dom";
import AuthCheckingComponent from "./AuthCheckingComponent";

export default function AuthRoute({ children }) {
  //! use query
  const { isError, isLoading, data, isSuccess, error, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatus,
  });
  //for loading
  if (isLoading) return <AuthCheckingComponent />;
  //in case a user is not login
  if (!data) return <Navigate to="/login" />;
  return children;
}
