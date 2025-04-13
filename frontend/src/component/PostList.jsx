import React from "react";
import PostItem from "./PostItem";
import EmptyPost from "../page/public/EmptyPost";

const PostList = ({ posts }) => {
  return posts?.length == 0 ? (
    <EmptyPost />
  ) : (
    <div className="post-list">
      {posts?.map((post) => (
        <PostItem key={post?.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
