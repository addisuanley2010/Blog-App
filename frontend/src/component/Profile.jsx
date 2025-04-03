import React from 'react'
import Logout from '../utils/Logout'
import { useSelector } from 'react-redux';

const Profile = ({ toggleModal }) => {
    const {  user } = useSelector(
        (state) => state.userData
      );
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Profile Options</h2>
            <div className="flex items-center mb-4">
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-blue-500 mr-3"
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-gray-500">{user.role}</p>
              </div>
              <Logout/>

            </div>
            <ul>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert("Account Settings")}
              >
                Account Settings
              </li>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert("Change Password")}
              >
                Change Password
              </li>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert("Help")}
              >
                Help
              </li>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert("Privacy Policy")}
              >
                Privacy Policy
              </li>
              <li
                className="py-2 hover:bg-gray-100 cursor-pointer"
                onClick={toggleModal}
              >
                Close
              </li>
            </ul>
          </div>
        </div>
  )
}

export default Profile
