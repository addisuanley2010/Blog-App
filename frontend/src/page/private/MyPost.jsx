import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../../component/PostList";
import LoadingSpinner from "../../component/LoadingSpinner";
const MyPost = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "post/myPost" });
  }, [dispatch]);
 
  const { post, loading } = useSelector((state) => state.postData);
  if (loading) return <LoadingSpinner/>
  if (!post) return <div>No posts available</div>;
  return (
    <div>
      <PostList posts={post} />
    </div>
  );
};

export default MyPost;
