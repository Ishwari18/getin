import React from "react";
import Categories from "./Categories";
import "./css/Home.css";
import mainimg from "../images/vrBox.jpg";

export default function Home() {
  return (
    <>
      <div className="main">
        <div className="component">
          <h1>A New Home for VR Chats</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            exp
          </p>
          <button>Join Now</button>
        </div>
        <div className="component">
          <img src={mainimg} alt="" />
        </div>
      </div>
      <div className="main">
      <Categories />
      </div>
      
    </>
  );
}
