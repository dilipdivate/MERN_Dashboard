import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Layout/Navbar";
import Sidebar from "components/Layout/Sidebar";
import { userApi } from "globalStore/userApi.js";
import { useCookies } from "react-cookie";
// import { useGetUserByIdQuery } from "globalStore/dashboardApi.js";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // console.log(userId);
  // const { data } = useGetUserByIdQuery(userId);
  // console.log(data);
  // const [cookies] = useCookies(["logged_in"]);

  // const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
  //   skip: false,
  //   refetchOnMountOrArgChange: true,
  // });
  // const loading = isLoading || isFetching;

  // const { data } = userApi.endpoints.getMe.useQueryState(null, {
  //   selectFromResult: (data) => data,
  // });

  // console.log("Coming1", data);
  // const userData = data.user;

  // console.log("Coming2", cookies.logged_in);
  // const checkLoggedIn = cookies.logged_in;

  // const data = {};
  // console.log(logged_in);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        // user={userData || {}}
        // checkLoggedIn={cookies.logged_in}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          // user={userData || {}}
          // checkLoggedIn={cookies.logged_in}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
