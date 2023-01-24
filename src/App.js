import "./App.css";
import { CssBaseline, ThemeProvider, Typography, Link } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Layout from "components/Layout";
import Dashboard from "components/Dashboard/index.jsx";
import Products from "components/ClientFacing/Products.jsx";
import Customers from "components/ClientFacing/Customers.jsx";
import Transactions from "components/ClientFacing/Transactions.jsx";
import Geography from "components/ClientFacing/Geography.jsx";
import Overview from "components/Sales/Overview.jsx";
import Daily from "components/Sales/Daily.jsx";
import Monthly from "components/Sales/Monthly.jsx";
import Breakdown from "components/Sales/Breakdown.jsx";
import Admin from "components/management/Admin.jsx";
import Performance from "components/management/Performance.jsx";
import ForgotPassword from "components/authentication/ForgotPassword.jsx";
import Signin from "components/authentication/Signin.jsx";
import Signup from "components/authentication/Signup.jsx";
import AddProduct from "components/admin/AddProduct.jsx";
import Checkout from "components/admin/Checkout.jsx";
import CheckUser from "components/Layout/CheckUser.jsx";
import Profile from "components/Layout/Profile.jsx";
import Signout from "components/authentication/Signout.jsx";
import VerifyEmail from "components/authentication/VerifyEmail.jsx";
import ResetPassword from "components/authentication/ResetPassword.jsx";
import ChangePassword from "components/authentication/ChangePassword.jsx";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/signin" replace />} />
              {/* <Route element={<CheckUser allowedRoles={["user", "admin"]} />}> */}
              <Route path="profile" element={<Profile />} />
              {/* </Route> */}
              {/* <Route element={<CheckUser allowedRoles={["admin"]} />}> */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="addProduct" element={<AddProduct />} />

              <Route path="checkout" element={<Checkout />} />
              <Route path="geography" element={<Geography />} />
              <Route path="overview" element={<Overview />} />
              <Route path="daily" element={<Daily />} />
              <Route path="monthly" element={<Monthly />} />
              <Route path="breakdown" element={<Breakdown />} />
              <Route path="admin" element={<Admin />} />
              <Route path="performance" element={<Performance />} />
              {/* </Route> */}
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Routes>
          {/* <Copyright /> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
