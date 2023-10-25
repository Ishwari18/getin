import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NonEighteenPlusCategory from "./NonEighteenPlusCategory";
import EighteenPlusCategory from "./EighteenPlusCategory";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories/category/${categoryId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category details:", error);
        setLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {category.isEighteenPlus ? (
            <EighteenPlusCategory category={category} />
          ) : (
            <NonEighteenPlusCategory category={category} />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
