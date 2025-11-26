import React from "react";
import Barner from "./home-sections/Barner";
import Helped from "./home-sections/Helped";
import Reviews from "./home-sections/Reviews";
import Signature from "./home-sections/Signature";
import HowItWorks from "./home-sections/HowItWorks";

const reviews = fetch(`./reviews.json`).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Barner></Barner>
      <Signature></Signature>
      <Reviews reviews={reviews}></Reviews>
      <HowItWorks></HowItWorks>

      <Helped></Helped>
    </div>
  );
};

export default Home;
