import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import NotFoundPage from "../page/common/NotFoundPage";
import CreatePost from "../page/private/CreatePost";
import MyPost from "../page/private/MyPost";
import HomePage from "../page/public/HomePage";
import Header from "../component/Header";
import Profile from "../component/Profile";
import { privatePaths } from "../utils/Paths";

const PrivateRouteWrapper = ({ path, element }) => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <Header
        message={"User Panel"}
        paths={privatePaths}
        toggleModal={toggleModal}
      />

      <Routes>
        <Route index path="/mypost" element={<MyPost />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login/*" element={<Navigate to="/" />} />
      </Routes>
      {isModalOpen && <Profile toggleModal={toggleModal} />}
    </>
  );
};

export default PrivateRouteWrapper;
