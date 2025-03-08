import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../socket";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    socket.on("newPost", (post) => {
      setPosts((prev) => [...prev, post]);
    });

     return () => {
      socket.off("newPost");
    };

  },[])
  const addPost = async () => {
    userId!==0 && await axios.post("http://localhost:5000/api/posts", { content, userId });
    setContent("");
    setUserId(0)
  };

  const updatePost = async (id) => {
    const updatedContent = prompt("Update post content:");
    await axios.put(`http://localhost:5000/api/posts/${id}`, {
      content: updatedContent,
    });
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const UsersList = () => (
    <select onChange={(e) => setUserId(e.target.value)} value={userId}>
      <option selected  >please select user</option>
      {users.map((user) => (
        <option value={user.id} >{user.username}</option>
      ))}{" "}
    </select>
  );
  return (
    <div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New Post"
      />
      <UsersList />
      <button onClick={addPost}>Add Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content}
            <button onClick={() => updatePost(post.id)}>Update</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManagement;
