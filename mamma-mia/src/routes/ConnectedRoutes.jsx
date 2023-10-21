import { Routes as Rs, Route as R } from "react-router-dom";
import Home from "../views/Home";
import Pizza from "../components/Pizza";
import ShoppingCart from "../views/ShoppingCart";
import NotFound from '../views/NotFound'

const ConnectedRoutes = () => {
  return (
    <Rs>
      <R path="/" element={<Home />} />
      <R path="/pizza/:id" element={<Pizza />} />
      <R path="/cart" element={<ShoppingCart />} />
      <R path='*' element={<NotFound />} />
    </Rs>
  );
};

export default ConnectedRoutes;
