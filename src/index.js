import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render( <Router> <App /> </Router>, document.getElementById("root"));

// ReactDOM.createRoot(document.body).render(
//     <Router>
//       <App />
//     </Router>
//   );