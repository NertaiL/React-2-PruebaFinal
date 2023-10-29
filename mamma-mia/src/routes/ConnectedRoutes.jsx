import { Routes as Rs, Route as R } from "react-router-dom";
import Home from "../views/Home";
import Pizza from "../components/Pizza";
import ShoppingCart from "../views/ShoppingCart";
import NotFound from '../views/NotFound'

const ConnectedRoutes = () => {
  return (
    <Rs>
      <R path="/" element={<Home />} />
      <R path="/pizza/:id" element={<Pizza />} />{/* esta es una ruta que sera ocupada en algun onclick con navigate osea en mi caso en catalogo, onClick={() => {
                    navigate(`/pizza/${pizza.id}`);
      } por lo que vemos se repita la misma direccion ya que tiene que ser la misma pero en la iterazora se itera por id pizza.id */}
      <R path="/cart" element={<ShoppingCart />} />
      <R path='*' element={<NotFound />} />
    </Rs>
  );
};

export default ConnectedRoutes;
