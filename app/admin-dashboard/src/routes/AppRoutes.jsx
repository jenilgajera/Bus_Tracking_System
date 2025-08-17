import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import React from "react";
import Dashboard from "@/pages/Dashboard";
import AddStudents from "@/pages/AddStudents";
import Home from "@/pages/Home";
import BusesManagement from "@/pages/BusesManagement";
import AddDrivers from "@/pages/AddDrivers";
import LiveBusMap from "@/pages/LiveBusMap";
import ComplaintsManagement from "@/pages/ComplaintsManagement";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login is outside the dashboard layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Layout with Outlet */}
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="addstudents" element={<AddStudents />} />
        <Route path="addbuses" element={<BusesManagement />} />
        <Route path="adddrivers" element={<AddDrivers />} />
        <Route path="livebusmap" element={<LiveBusMap />} />
        <Route path="complaintmanagement" element={<ComplaintsManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
