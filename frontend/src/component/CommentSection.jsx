import React, { useState } from "react";
import { TfiComments } from "react-icons/tfi";
import { useDispatch } from "react-redux";

const CommentSection = ({ myComments, postId }) => {
  const [comments, setComments] = useState(myComments);
  const [newComment, setNewComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();


  const handleCommentSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "post/comment",
      payload: {
        postId: postId,
        comment: newComment,
        callback: myCallBack,
      },
    });
  };

  const myCallBack = () => {
    setComments((prevComments) => [...prevComments, { content: newComment }]);
    setNewComment("");
  };
  return (
    <div className="mb-4">
      <button 
        onClick={() => setToggle(!toggle)} 
        className="flex items-center text-blue-500 hover:text-blue-700 transition duration-200"
      >
        <TfiComments className="mr-2" />
        {toggle ? "Hide Comments" : "Show Comments"}
      </button>

      {toggle && (
        <>
          <form onSubmit={handleCommentSubmit} className="flex mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border border-gray-300 rounded-l px-2 py-1 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>

          <ul className="mt-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-1 text-gray-700">
                {comment.content}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CommentSection;