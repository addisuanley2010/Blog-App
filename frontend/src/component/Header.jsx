import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Header = ({ message, paths, toggleModal }) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.userData
  );
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-blue-600 p-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{message}</h1>

        <div className="hidden md:flex gap-4 items-center">
          {paths.map((path) => (
            <button
              key={path.path}
              onClick={() => navigate(`/${path.path}`)}
              className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded transition"
            >
              {path.name}
            </button>
          ))}
          {isAuthenticated && (
            <button onClick={toggleModal} className="text-white">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleToggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile App Bar */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start p-4 bg-blue-500">
          {paths.map((path) => (
            <button
              key={path.path}
              onClick={() => {
                navigate(`/${path.path}`);
                setIsMenuOpen(false); // Close menu after navigation
              }}
              className="text-white py-2"
            >
              {path.name}
            </button>
          ))}
          {isAuthenticated && (
            <button onClick={toggleModal} className="text-white flex items-center">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white mr-2"
              />
              Profile
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;