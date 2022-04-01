import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explote() {
  return (
    <div className="explore">
      <header className="pageHeader">Explore</header>
      <main>{/*Slider */}</main>
      <p className="exploreCategoryHeading">Categories</p>
      <div className="exploreCategories">
        <Link to="/category/rent">
          <img
            src={rentCategoryImage}
            alt="rent"
            className="exploreCategoryImg"
          />
          <p className="exploreCategoryName">Places for rent</p>
        </Link>
        <Link to="/category/sale">
          <img
            src={sellCategoryImage}
            alt="rent"
            className="exploreCategoryImg"
          />
          <p className="exploreCategoryName">Places for sale</p>
        </Link>
      </div>
    </div>
  );
}

export default Explote;
