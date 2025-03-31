// src/pages/ErrorMessage.js

import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-page text-center">
      <h1 className="text-2xl font-bold">Something Went Wrong addisu</h1>
      <p className="mt-4">{message || 'An unexpected error has occurred addis.'}</p>
    </div>
  );
};


export default ErrorMessage
