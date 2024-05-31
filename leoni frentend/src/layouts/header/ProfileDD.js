import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'react-feather';
import user4 from '../../assets/images/users/user4.jpg';

const ProfileDD = () => {
  
  const [imageData, setImageData] = useState(null); // Declare imageData state

  useEffect(() => {
    const fetchUser = async () => {
      const id = sessionStorage.getItem('id');

      try {
        // Ensure you're using backticks for template literals
        const response = await axios.get(`http://localhost:8080/api/auth/users/${id}`);
        const base64Image = response.data.imageData;
        
        if (base64Image) {
          setImageData(base64Image); // Directly use the base64 string
          console.log("Image data found.");
        }

      } catch (error) {
        console.log("No image data found.");
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        {imageData ? (
          // Use the imageData state directly in the src attribute
          <img src={`data:image/jpeg;base64,${imageData}`} alt="user" className="rounded-circle" width="55" />
        ) : (
          <img
    src={user4}
    alt="user"
    className="img-fluid rounded-circle"
    width="150"
  />
        )}
        <span>
          <h5 className="mb-0 fw-medium">{sessionStorage.getItem('username')}</h5>
          <small className='text-muted'>{sessionStorage.getItem('email')}</small>
        </span>
      </div>
      <a href="/profile" className="dropdown-item px-4 py-3">
        <User size={20} className="text-muted" />
        &nbsp; My Profile
      </a>
    </div>
  );
};

export default ProfileDD;