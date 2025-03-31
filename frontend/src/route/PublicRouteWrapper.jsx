import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../page/public/Login";
import Registration from "../page/public/Registration";
import HomePage from "../page/public/HomePage";
import NotFoundPage from "../page/common/NotFoundPage";

const PublicRouteWrapper = ({ path, element }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex gap-4">
        <button onClick={() => navigate("/")}>home</button>
        <button onClick={() => navigate("/login")}>login</button>
        <button onClick={() => navigate("/registration")}>registration </button>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default PublicRouteWrapper;
