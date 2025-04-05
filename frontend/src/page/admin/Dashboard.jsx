import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Dashboard = () => {
  const stats = {
    totalUsers: 120,
    totalPosts: 75,
    totalComments: 200,
    totalLikes: 150,
  };

  const recentPosts = [
    { id: 1, title: "Understanding React Hooks", date: "2025-03-30" },
    { id: 2, title: "A Guide to Redux", date: "2025-03-28" },
    { id: 3, title: "CSS Grid Layouts", date: "2025-03-25" },
  ];

  const recentComments = [
    { id: 1, user: "Addis", content: "Great post!", date: "2025-03-31" },
    { id: 2, user: "Aster", content: "Very informative.", date: "2025-03-29" },
  ];

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Engagement',
        data: [30, 50, 70, 90, 100, 120],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Total Posts</h2>
          <p className="text-2xl">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Total Comments</h2>
          <p className="text-2xl">{stats.totalComments}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Total Likes</h2>
          <p className="text-2xl">{stats.totalLikes}</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="font-semibold">User Engagement Over Time</h2>
        <Line data={engagementData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Recent Posts</h2>
          <ul className="mt-2">
            {recentPosts.map(post => (
              <li key={post.id} className="border-b py-2">
                <span className="font-medium">{post.title}</span> - <span className="text-gray-500">{post.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Recent Comments</h2>
          <ul className="mt-2">
            {recentComments.map(comment => (
              <li key={comment.id} className="border-b py-2">
                <span className="font-medium">{comment.user}</span>: {comment.content} - <span className="text-gray-500">{comment.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold">Top 5 Posts by Likes</h2>
        <ul className="mt-2">
          <li className="border-b py-2">
            <span className="font-medium">Post Title 1</span> - <span className="text-gray-500">Likes: 50</span>
          </li>
          <li className="border-b py-2">
            <span className="font-medium">Post Title 2</span> - <span className="text-gray-500">Likes: 40</span>
          </li>
          <li className="border-b py-2">
            <span className="font-medium">Post Title 3</span> - <span className="text-gray-500">Likes: 30</span>
          </li>
          <li className="border-b py-2">
            <span className="font-medium">Post Title 4</span> - <span className="text-gray-500">Likes: 20</span>
          </li>
          <li className="border-b py-2">
            <span className="font-medium">Post Title 5</span> - <span className="text-gray-500">Likes: 10</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;