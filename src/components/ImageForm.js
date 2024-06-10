import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import './ImageForm.css'; // Include this line to import the CSS file

const ImageForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('There was an error uploading the image!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="image-form">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageForm;
