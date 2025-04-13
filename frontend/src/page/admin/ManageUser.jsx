import React from "react";

import { useSelector } from "react-redux";
import { useEffect ,useState} from "react";
import { useDispatch } from "react-redux";

const ManageUser = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.usersList);

const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    dispatch({ type: "usersList/user-list" });
  }, [dispatch]);

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleDelete = (id) => {
    dispatch({ type: "usersList/delete-user", payload: {id , callBack} });

  };

  const handleVerify = (id) => {
    dispatch({ type: "usersList/verify-user", payload: {id} });
  };

  const handleBlock = (id) => {
    console.log("Block user:", id);
  };
  const callBack = (id) => {
    setUsersList(usersList.filter((user) => user.id !== id));
  };
  return (
    <div className="w-full px-4 overflow-x-auto my-16">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="min-w-full overflow-x-auto">
          {/* Desktop view */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersList?.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.status}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.profile
                      ? `${user.profile.name}, ${user.profile.gender}, ${user.profile.age}`
                      : "No Profile"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                    {!user?.isVerified ? (
                      <button
                        onClick={() => handleVerify(user.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Verify
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(user.id)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                      >
                        {user?.isBlocked ? "Unblock" : "block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden">
            {usersList?.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow rounded-lg mb-4 p-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">ID:</span>
                    <span>{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Username:</span>
                    <span>{user.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="break-all">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span>{user.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Role:</span>
                    <span>{user.role}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Profile:</span>
                    <span className="break-all">
                      {user.profile
                        ? `${user.profile.name}, ${user.profile.gender}, ${user.profile.age}`
                        : "No Profile"}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2 pt-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleVerify(user.id)}
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleBlock(user.id)}
                      className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Block
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;