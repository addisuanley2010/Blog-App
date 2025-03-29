import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRequest } from "../feature/postSlice";
import PostList from "../component/PostList";
import LoadingSpinner from "../component/LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function HomePage() {
  const dispatch = useDispatch();
  const { post, loading, error } = useSelector((state) => state.postData);

  useEffect(() => {
    dispatch(fetchPostRequest());
    // dispatch({ type: 'post/fetchPostRequest' });
  }, [dispatch]);
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <div>
      <PostList posts={post} />
    </div>
  );
}

export default HomePage;
