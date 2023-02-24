import React, { useState } from "react";
import schema from "./formSchema";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  name: "",
  address: "",
  toppings: [],
  size: "",
  special: "",
};

const initialFormErrors = {
  name: "",
  address: "",
};

function OrderForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const history = useHistory();

  const handleSubmit = () => {
    console.log("formValues: ", formValues);
    fetch("https://reqres.in/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
    history.push("/");
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const handleChange = (name, value) => {
    validate(name, value);
    console.log("###", "here");
    setFormValues({ ...formValues, [name]: value });
  };

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormValues({
        ...formValues,
        toppings: [...formValues.toppings, value],
      });
    } else {
      setFormValues({
        ...formValues,
        toppings: formValues.toppings.filter((topping) => topping !== value),
      });
    }
  };

  return (
    <div className="order-form">
      <h1>Create Your Pizza Order</h1>
      <form id="pizza-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id="name-input"
            type="text"
            name="name"
            value={formValues.name}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
          <p>{formErrors.name}</p>
        </label>
        <label>
          Address:
          <input
            id="address-input"
            type="text"
            name="address"
            value={formValues.address}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
          <p>{formErrors.address}</p>
        </label>
        <label>
          Size:
          <select
            name="size"
            id="size-dropdown"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>
        <label>
          Toppins:
          <div>
            <label>
              Pepperoni:
              <input
                type="checkbox"
                value="pepperoni"
                checked={formValues.toppings.includes("pepperoni")}
                onChange={handleToppingChange}
              />
            </label>
            <label>
              Mushrooms:
              <input
                type="checkbox"
                value="mushrooms"
                checked={formValues.toppings.includes("mushrooms")}
                onChange={handleToppingChange}
              />
            </label>
            <label>
              Onions:
              <input
                type="checkbox"
                value="onions"
                checked={formValues.toppings.includes("onions")}
                onChange={handleToppingChange}
              />
            </label>
            <label>
              Sausage:
              <input
                type="checkbox"
                value="sausage"
                checked={formValues.toppings.includes("sausage")}
                onChange={handleToppingChange}
              />
            </label>
          </div>
        </label>
        <label>
          Special Instructions:
          <input
            id="special-text"
            type="text"
            name="special"
            value={formValues.special}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
          />
          <p>{formErrors.address}</p>
        </label>
        <button id="order-button" type="submit">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
