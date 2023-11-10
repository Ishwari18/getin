import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] =  useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const token = localStorage.getItem("token");

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('profilePicture', profilePicture);

    // Get the auth token from local storage
   

    // Include the auth token in the request headers
    const config = {
      headers: {
        "auth-token": token,
      },
    };

    axios
      .post("http://localhost:5000/api/auth/upload-profile-picture", formdata, config)
      .then((res) => {
        console.log(res);
        // You can optionally update the user's profile with the new picture
        // or trigger a refresh of the user's data
        fetchProfilePicture();
      })
      .catch((err) => console.log(err));
  };

  const fetchProfilePicture = () => {
    // Fetch the user's profile picture from the new route
    axios
      .get("http://localhost:5000/api/auth/user-profile", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setProfilePictureUrl(res.data.profilePicture);
      })
      .catch((err) => {
        console.log(err);
        // Handle the error, e.g., display a default image
      });
  };

  // Fetch user-specific data here using the user's token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Make an authenticated request to get user data
      fetch("http://localhost:5000/api/auth/user-profile", {
        method: "GET",
        headers: {
          "auth-token": `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user profile:", error));
    }
    // Fetch the user's profile picture
    fetchProfilePicture();
  }, []);

  const handleLogOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page or any other page you prefer
    // For example, you can use react-router to navigate:
    // window.location.href = "/login";
  };

  return (
    <div>
      <h2>Profile Page</h2>
      {userData ? (
        <div>
          <h3>Welcome, {userData.name}</h3>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.number}</p>
          {/* Display other user-specific details here */}
          <button onClick={handleLogOut}>Log Out</button>
          <Link to="/sell">Sell</Link>

          {profilePictureUrl ? (
            <img src={profilePictureUrl} alt="Profile" />
          ) : (
            <p>Loading profile picture...</p>
          )}

          <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
