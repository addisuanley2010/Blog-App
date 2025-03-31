import React from "react";
import { loading } from "../feature/userSlice"
import { useDispatch } from "react-redux";
const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(loading(false));
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-secondary text-red-800 font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      Logout
    </button>
  );
};

export default Logout;
