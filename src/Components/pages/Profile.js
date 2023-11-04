import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);

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
        <Link to="/sell">Sell</Link> {/* Add a Link to the "Sell" page */}
      </div>
    ) : (
      <p>Loading user profile...</p>
    )}
  </div>
  );
};

export default Profile;
