import React from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { api } from "../utils/api";
const PostItem = ({ post }) => {
  const { id, content, createdAt, author, image, comments,likes } = post;

  return (
    <div className="post-item border p-4 rounded shadow mb-4">
      <h2 className="font-bold">{author.username}</h2>
      <p className="text-gray-700">{content}</p>
      {image && (
        <img
          src={`${api}/${image}`}
          alt={`Post ${id}`}
          className="mt-2 rounded"
        />
      )}
      <p className="text-gray-500 text-sm">
        Created at: {new Date(createdAt).toLocaleString()}
      </p>
      <div className="flex justify-start  mt-4 items-start gap-4">
        <LikeButton myLikes={likes}/>
        <CommentSection myComments={comments} />
      </div>
    </div>
  );
};

export default PostItem;
