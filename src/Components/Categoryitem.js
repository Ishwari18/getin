import React from "react";
import "./categoryitem.css";

const Categoryitem = (props) => {
  const { category } = props;

  return (
    <div className="category-item">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{category.title}</h5>
          </div>
          <br />
          <p className="card-text">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Categoryitem;
