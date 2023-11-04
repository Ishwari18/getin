import React, { useEffect, useState } from "react";

// Function to add a category to selling categories
const addCategoryToSelling = async (categoryId, userId) => {
    const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:5000/api/categories/add-selling-category", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
      body: JSON.stringify({
        userId,
        categoryId,
      }),
    });

    if (response.ok) {
      return true; // Category added successfully
    }

    return false; // Category could not be added
  } catch (error) {
    console.error("Error adding category to selling categories:", error);
    return false; // Category could not be added
  }
};

export const AddServicespage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of 18+ categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (response.ok) {
          const data = await response.json();
          // Filter categories to show only 18+ categories
          const eighteenPlusCategories = data.filter(
            (category) => category.isEighteenPlus
          );
          setCategories(eighteenPlusCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle adding selected categories to selling categories
  const handleAddSellingCategories = () => {
    selectedCategories.forEach((categoryId) => {
      // Replace "yourUserId" with the actual user ID
      const userId = "yourUserId"; // Replace with your actual user ID

      addCategoryToSelling(categoryId, userId)
        .then((result) => {
          if (result) {
            console.log(`Category ${categoryId} added to selling categories.`);
          } else {
            console.log(`Failed to add category ${categoryId} to selling categories.`);
          }
        })
        .catch((error) => {
          console.error("Error adding category to selling categories:", error);
        });
    });
  };

  return (
    <div>
      <h2>Select 18+ Categories to Sell</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div>
          {categories.map((category) => (
            <div key={category._id}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategorySelect(category._id)}
              />
              {category.name}
            </div>
          ))}
          <button onClick={handleAddSellingCategories}>
            Add to Selling Categories
          </button>
        </div>
      )}
    </div>
  );
};
