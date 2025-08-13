import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import React from "react";
import Dashboard from "@/pages/Dashboard";
import AddStudents from "@/pages/AddStudents";
import Home from "@/pages/Home";
// import Buses from "@/pages/Buses";
// import Drivers from "@/pages/Drivers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login is outside the dashboard layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Layout with Outlet */}
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home/>} />
        <Route path="addstudents" element={<AddStudents />} />
        {/* <Route path="buses" element={<Buses />} /> */}
        {/* <Route path="drivers" element={<Drivers />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
