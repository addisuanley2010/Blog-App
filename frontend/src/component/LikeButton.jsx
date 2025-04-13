import React, { useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
const LikeButton = ({ myLikes, postId }) => {
  const { user } = useSelector((state) => state.userData);
  const [likes, setLikes] = useState(myLikes);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const userId = user?.id;

  useEffect(() => {
    const likedByUser = likes?.some((like) => like.userId === userId);
    setIsLiked(likedByUser);
  }, [likes, userId]);

  const handleLike = () => {
    dispatch({
      type: "post/like",
      payload:{postId,callback:myCallBack},
    });
    
  };
  const myCallBack = () => {
    isLiked
      ? setLikes((prevLikes) =>
          prevLikes.filter((like) => like.userId !== userId)
        )
      : setLikes((prevLikes) => [...prevLikes, { userId }]);

    setIsLiked((prev) => !prev);
  };

  return (
    <button className="flex items-center flex-col "
      onClick={handleLike}  >
      <>{isLiked ? <AiFillLike className="text-red-600 text-3xl" /> : <SlLike />}</>
      <span className="text-xs italic text-rose-400 underline"> {likes?.length > 0 && likes.length+" Likes"}
      </span>
    </button>
  );
};


export default LikeButton;
