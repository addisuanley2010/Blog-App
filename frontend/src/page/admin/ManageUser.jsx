import React from 'react';

const users = [
  {
    "id": 1,
    "email": "addisu@gmail.com",
    "username": "addisu",
    "status": "ONLINE",
    "role": "admin",
    "profile": {
      "name": "Addaye A",
      "gender": "Male",
      "age": 60,
    }
  },
  {
    "id": 12,
    "email": "aster@gmail.com",
    "username": "aster",
    "status": "ONLINE",
    "role": "user",
    "profile": {
      "name": "AstereAwpke ",
      "gender": "female",
      "age": 69,
    }
  },
  {
    "id": 13,
    "email": "addisuyigzaw@mkau.edu.et",
    "username": "addisuyigzaw",
    "status": "ONLINE",
    "role": "user",
    "profile": null
  },
  // Add more users as needed
];
import { useSelector } from 'react-redux';

const ManageUser = () => {
  const { user } = useSelector((state) => state.userData);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.profile ? `${user.profile.name}, ${user.profile.gender}, ${user.profile.age}` : 'No Profile'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;