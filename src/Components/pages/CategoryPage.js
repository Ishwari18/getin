import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category/${categoryId}`);
        
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
  
    fetchCategoryDetails();
  }, [categoryId]);

  return (
    <div>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default CategoryPage;
