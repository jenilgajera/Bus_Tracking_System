import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import React from "react";
import Dashboard from "@/pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/buses" element={<Buses />} />
      <Route path="/drivers" element={<Drivers />} /> */}
      {/* Add other routes similarly */}
    </Routes>
  );
};

export default AppRoutes;
