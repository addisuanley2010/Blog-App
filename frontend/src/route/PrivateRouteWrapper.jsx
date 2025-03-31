import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import NotFoundPage from "../page/common/NotFoundPage";
import CreatePost from "../page/private/CreatePost";
import MyPost from "../page/private/MyPost";
import Logout from "../utils/Logout";

const PrivateRouteWrapper = ({ path, element }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" flex gap-4">
        <Logout />
        <button onClick={() => navigate("/")}>my post</button>
        <button onClick={() => navigate("/create")}>create post </button>
      </div>
      <Routes>
        <Route index path="/" element={<MyPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default PrivateRouteWrapper;
