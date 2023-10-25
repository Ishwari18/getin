import React from "react";

const NonEighteenPlusCategory = ({ category }) => (
  <div>
    <h2>{category.name}</h2>
    <p>{category.description}</p>
    {/* Add any other details specific to non-18+ categories */}
  </div>
);

export default NonEighteenPlusCategory;
