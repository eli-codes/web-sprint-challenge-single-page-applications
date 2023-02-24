import { Link } from "react-router-dom";

import React from "react";

import { Switch, Route } from "react-router-dom";

import OrderForm from "./OrderForm";

const App = () => {
  return (
    <>
      <h1>Bloomtech Eats</h1>
      <p>Create your own pizza!</p>
      <Link to="/pizza">
        <button id="order-pizza" type="button">
          Order Pizza
        </button>
      </Link>
      <Switch>
        <Route exact path="/">
          <h1>Welcome to My Pizza Shop</h1>
        </Route>
        <Route path="/pizza">
          <OrderForm />
        </Route>
        <Route path="/verify"></Route>
      </Switch>
    </>
  );
};
export default App;
