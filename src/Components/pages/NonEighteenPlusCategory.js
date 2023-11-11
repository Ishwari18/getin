import React, { useState, useEffect } from "react";
import socket from "../pages/socket";

const NonEighteenPlusCategory = ({ category }) => {
  const [userData, setUserData] = useState(null);
  const [matchedUserName, setMatchedUserName] = useState(null);

  const findMatch = () => {
    socket.emit("find_match", userData);
  };

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

  useEffect(() => {
    socket.on("matchFound", (matchedUser) => {
      if (matchedUser && matchedUser.name) {
        setMatchedUserName(matchedUser.name);
      } else {
        console.log("Invalid matchedUser data received:", matchedUser);
      }
    });
  }, []);

  return (
    <div>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      {matchedUserName ? (
        <p>Match found! You are matched with {matchedUserName}</p>
      ) : (
        <button onClick={findMatch}>Find Match</button>
      )}
    </div>
  );
};

export default NonEighteenPlusCategory;
