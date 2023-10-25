import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import categoryContext from "../context/categories/categoryContext";
import Categoryitem from "./Categoryitem";

const Categories = () => {
  const context = useContext(categoryContext);
  const { categories, getCategories } = context;

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const nonEighteenPlusCategories = categories.filter(
    (category) => !category.isEighteenPlus
  );

  const eighteenPlusCategories = categories.filter(
    (category) => category.isEighteenPlus
  );

  return (
    <>
      <div className="row my-3 mx-2">
        <div className="col">
          <h2>Categories (Not 18+)</h2>
          <div className="container mx-2">
            {nonEighteenPlusCategories.length === 0 && "No categories to display"}
          </div>
          <div className="categories-container">
            {nonEighteenPlusCategories.map((category) => (
              <Link to={`/category/${category._id}`} key={category._id}>
                <Categoryitem category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="row my-3 mx-2">
        <div className="col">
          <h2>Categories (18+)</h2>
          <div className="container mx-2">
            {eighteenPlusCategories.length === 0 && "No categories to display"}
          </div>
          <div className="categories-container">
            {eighteenPlusCategories.map((category) => (
              <Link to={`/category/${category._id}`} key={category._id}>
                <Categoryitem category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
