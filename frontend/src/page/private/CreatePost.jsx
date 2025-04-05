import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create a preview URL
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('My name is Addisu Anley')
    
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
  
   
    dispatch({ type: "post/createPost", formData });
          setContent('');
      setImage(null);
      setImagePreview(null); // Clear preview
   
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Post</h1>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded shadow"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;