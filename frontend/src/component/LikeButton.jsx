// src/components/LikeButton.js

import React, { useState } from 'react';
import { SlLike } from 'react-icons/sl';

const LikeButton = ({myLikes}) => {
  const [likes, setLikes] = useState(myLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    
    if (isLiked) {
      setLikes((likes.length) - 1);
    } else {
      setLikes((likes.length )+ 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <button 
      onClick={handleLike} 
      className={`flex items-center px-4 py-2 my-6 rounded-md shadow-md transition duration-200 ease-in-out 
                  ${isLiked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
    >
      <SlLike className={`mr-2 ${isLiked ? 'text-white' : 'text-blue-600'}`} />
      <span className={`font-semibold text-lg transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`}>
        {likes.length }
      </span>
    </button>
  );
};

export default LikeButton;