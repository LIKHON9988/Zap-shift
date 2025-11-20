import React from "react";
import Barner from "./home-sections/Barner";
import Helped from "./home-sections/Helped";
import Reviews from "./home-sections/Reviews";

const reviews = fetch(`./reviews.json`).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Barner></Barner>
      <Reviews reviews={reviews}></Reviews>
      <Helped></Helped>
    </div>
  );
};

export default Home;
