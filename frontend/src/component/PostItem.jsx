import React, { useState } from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { api } from "../utils/api";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa"; 
const PostItem = ({ post }) => {
  const { isAuthenticated } = useSelector((state) => state.userData);
  const { id, content, createdAt, author, image, comments, likes } = post;

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 350; 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg p-6 mb-6 grid grid-cols-1 gap-4">
      <div className="flex items-center mb-4">
        <FaUserCircle className="text-gray-500 text-2xl mr-2" /> {/* Profile icon */}
        <h2 className="font-bold text-lg">{author.username}</h2>
      </div>
      <p className="text-gray-800 text-base mb-4">
        {isExpanded || content.length <= maxLength
          ? content
          : `${content.substring(0, maxLength)}...`}
        {content.length > maxLength && (
          <button
            onClick={toggleExpand}
            className="text-blue-500 hover:underline ml-1"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </p>
      {image && (
        <div className="overflow-hidden rounded-lg shadow-md mb-4">
          <img
            src={`${api}/${image}`}
            alt={`Post ${id}`}
            className="w-full h-64 object-cover transition-transform transform hover:scale-105"
          />
        </div>
      )}
      <p className="text-gray-500 text-sm mb-4">
        Posted on: {new Date(createdAt).toLocaleString()}
      </p>
      <div className="flex justify-start items-center gap-6">
        <div className="flex items-center text-gray-600">
          {isAuthenticated ? (
            <LikeButton myLikes={likes} postId={id} />
          ) : (
            <span className="text-sm font-medium">{likes?.length} Likes</span>
          )}
        </div>
        <div className="flex items-center text-gray-600">
          {isAuthenticated ? (
            <CommentSection myComments={comments} postId={id}/>
          ) : (
            <span className="text-sm font-medium">{comments?.length} Comments</span>
          )}
        </div>
      </div>    </div>
  );
};

export default PostItem;