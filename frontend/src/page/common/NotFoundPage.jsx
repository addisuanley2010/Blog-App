// src/pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 underline mt-4">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;