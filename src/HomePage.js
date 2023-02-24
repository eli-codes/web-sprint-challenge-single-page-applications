import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to our pizza ordering page</h1>
      <p>Click the button below to order your pizza</p>
      <Link to="/pizza" id="order-pizza">
        Order Pizza
      </Link>
    </div>
  );
}

export default HomePage;
