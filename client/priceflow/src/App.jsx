import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./admin/components/Sidebar";
import Dashboard from "./admin/pages/Dashboard";
import Pricing from "./admin/pages/Pricing";
import Compliance from "./admin/pages/Compliance";
import Analytics from "./admin/pages/Analytics";
import Reports from "./admin/pages/Reports";
import LandingPage from "./landingpage/LandingPage";
import AdminSignin from "./landingpage/signin/AdminSignin";
import ClientSignin from "./landingpage/signin/ClientSignin";
import AdminSignup from "./landingpage/signup/AdminSignup";
import ClientSignup from "./landingpage/signup/ClientSignup";
import ClientDashboard from "./clientportal/pages/ClientDashboard";
import Navbar from "./landingpage/Navbar";
import CliCompliance from "./clientportal/pages/CliCompliance";
import Invoices from "./clientportal/pages/Invoices";
import Orders from "./clientportal/pages/Orders";
import Products from "./clientportal/pages/Products";
import CliSidebar from "./clientportal/components/CliSidebar";
import PriceList from "./admin/pages/PriceList";

function App() {
  return (
    <Router>
      <RouteWithNavbar />
    </Router>
  );
}

function RouteWithNavbar() {
  const location = useLocation(); // Now inside the Router

  return (
    <>
      {/* Render Navbar only if the current path is the homepage ("/") */}
      {location.pathname === "/" && <Navbar />}
      
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/signin/admin" element={<AdminSignin />} />
        <Route path="/signin/client" element={<ClientSignin />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/signup/client" element={<ClientSignup />} />

        {/* Admin Panel (Sidebar Persistent) */}
        <Route
          path="/admin/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 bg-gray-100 p-6">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="compliance" element={<Compliance />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="PriceList" element={<PriceList />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Client Panel (Sidebar Persistent) */}
        <Route
          path="/client/*"
          element={
            <div className="flex">
              <CliSidebar />
              <div className="flex-1 bg-gray-100 p-6">
                <Routes>
                  <Route path="dashboard" element={<ClientDashboard />} />
                  <Route path="compliance" element={<CliCompliance />} />
                  <Route path="invoices" element={<Invoices />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="products" element={<Products />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
