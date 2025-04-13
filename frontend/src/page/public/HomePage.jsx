import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRequest } from "../../feature/postSlice";
import PostList from "../../component/PostList";
import LoadingSpinner from "../../component/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyPost from "./EmptyPost";

function HomePage() {
  const dispatch = useDispatch();
  const { post, error,loading } = useSelector((state) => state.postData);

  useEffect(() => {
    // dispatch(fetchPostRequest());
    dispatch({ type: "post/fetchPostRequest" });
  }, [dispatch]);
  
  if (error) return <ErrorMessage />;
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <PostList posts={post}  />
    </div>
  );
}

export default HomePage;
