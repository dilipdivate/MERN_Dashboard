import { userApi } from "globalStore/userApi.js";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import FullScreenLoader from "./FullScreenLoader";

const CheckUser = ({ allowedRoles }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || user) && allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to="/profile" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default CheckUser;
