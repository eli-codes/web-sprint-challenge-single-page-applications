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

// import * as Yup from 'yup';
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';

// import { Formik, Field, ErrorMessage } from 'formik';
// import { orderFormSchema } from './ValidationForm';

//         // {(formikProps) => (
//         //   <Form>
//         //     <div>
//         //       <label htmlFor="name">Name</label>
//         //       <Field type="text" name="name" />
//         //       <ErrorMessage name="name must be at least 2 characters" />
//         //     </div>
//         //     <button type="submit">Submit</button>
//         //   </Form>
//         // )}

// function OrderForm() {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [toppings, setToppings] = useState([]);
//   const history = useHistory();

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleAddressChange = (event) => {
//     setAddress(event.target.value);
//   };

//   const handleToppingChange = (event) => {
//     const { value, checked } = event.target;
//     if (checked) {
//       setToppings([...toppings, value]);
//     } else {
//       setToppings(toppings.filter((topping) => topping !== value));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const order = { name, address, toppings };
//     console.log(order);
//     history.push('/');
//   };

//   return (
//     <div className="order-form" id="pizza-form">
//       <h1>Create Your Pizza Order</h1>
//       <Form onSubmit={handleSubmit} >
//         <Form.Group controlId="formName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} id="name-input" />
//         </Form.Group>
//         <Form.Group controlId="formAddress">
//           <Form.Label>Address</Form.Label>
//           <Form.Control type="text" placeholder="Enter your address" value={address} onChange={handleAddressChange} />
//         </Form.Group>
//         <Form.Group controlId="formToppings">
//           <Form.Label>Toppings</Form.Label>
//           <div>
//             <Form.Check type="checkbox" label="Pepperoni" value="pepperoni" checked={toppings.includes('pepperoni')} onChange={handleToppingChange} />
//             <Form.Check type="checkbox" label="Mushrooms" value="mushrooms" checked={toppings.includes('mushrooms')} onChange={handleToppingChange} />
//             <Form.Check type="checkbox" label="Onions" value="onions" checked={toppings.includes('onions')} onChange={handleToppingChange} />
//             <Form.Check type="checkbox" label="Sausage" value="sausage" checked={toppings.includes('sausage')} onChange={handleToppingChange} />
//           </div>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Place Order
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default OrderForm;
