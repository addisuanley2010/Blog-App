import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Header = ({ message, paths, toggleModal }) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.userData
  );
  const navigate = useNavigate();
  
  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{message}</h1>

        <div className="flex gap-4 items-center">
          {paths.map((path) => (
            <button
              onClick={() => navigate(`/${path.path}`)}
              className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded transition"
            >          

              {path.name}
            </button>
          ))}
          {isAuthenticated && <button onClick={toggleModal} className="text-white">
            <img
              src={user.profileImage}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
