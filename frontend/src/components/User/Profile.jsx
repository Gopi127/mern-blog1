import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "../../APIServices/users/usersAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { isAuthenticated } from "../../redux/slices/authSlices";

export default function Profile() {
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
  return <div>Profile</div>;
}
