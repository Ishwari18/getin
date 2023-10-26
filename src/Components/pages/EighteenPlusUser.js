import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EighteenPlusUser = () => {
  const { categoryId, userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/category/${categoryId}/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok while fetching user details");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [categoryId, userId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Number: {user.number}</p>
          {/* You can display other user details here */}
        </>
      )}
    </div>
  );
};

export default EighteenPlusUser;
