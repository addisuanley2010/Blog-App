import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./component/LoadingSpinner";
import AdminRouteWrapper from "./route/AdminRouteWrapper";
import PrivateRouteWrapper from "./route/PrivateRouteWrapper";
import PublicRouteWrapper from "./route/PublicRouteWrapper";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: "post/fetchPostRequest" });
    dispatch({ type: "user/check-auth" });
  }, [dispatch]);

  const { isAuthenticated, user, loading, error,isBlocked } = useSelector(
    (state) => state.userData
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <Routes>
      {(!isAuthenticated )? (
        <>
          <Route path="/*" element={<PublicRouteWrapper />} />
        </>
      ) : user.role === "admin" ? (
        <>
          <Route path="/*" element={<AdminRouteWrapper />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<PrivateRouteWrapper />} />
        </>
      )}
    </Routes>
  );
};

export default App;
