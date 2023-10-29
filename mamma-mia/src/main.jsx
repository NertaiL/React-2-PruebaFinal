import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PizzaProvider from "./context/PizzaContext.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PizzaProvider>{/* aqui pasamos el provider para proveer el contexto a todos los componentes que se encuentren en app */}
        <App />
      </PizzaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
