import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
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

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
