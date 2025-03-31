import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NotFoundPage from "../page/common/NotFoundPage";
import Dashboard from "../page/admin/Dashboard";
import MangageUser from "../page/admin/MangageUser";
import Logout from "../utils/Logout";

const AdminRouteWrapper = ({ path, element }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex gap-4">
        <Logout />
        <button onClick={() => navigate("/user")}>manage user</button>
        <button onClick={() => navigate("/")}>home </button>
      </div>

      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/user" element={<MangageUser />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AdminRouteWrapper;
