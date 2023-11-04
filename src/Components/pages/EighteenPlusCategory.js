import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EighteenPlusCategory = ({ category }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryId = category._id; // Replace with your actual category ID
    const fetchUsersInCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users in the 18+ category:", error);
        setLoading(false);
      }
    };

    fetchUsersInCategory();
  }, [category._id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{category.name}</h2>
          {/* Add any 18+ category-specific details here */}
          <div>this is 18+ stuff</div>
          <h3>Users Selling Services in this 18+ Category:</h3>
          <div className="d-flex align-items-center">
            <div className="row d-flex">
              {users.map((user) => (
                <Link
                  to={`/category/${category._id}/user/${user._id}`}
                  key={user._id}
                >
                  <div className="card  d-flex category-item">
                    <div className="card-body ">
                      <div key={user._id}>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EighteenPlusCategory;
