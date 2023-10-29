import { Routes as Rs, Route as R } from "react-router-dom";/* aqui basicamente le doy un alias a Routes que seria el que agrupa las rutas y Route seria las rutas */
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
      } por lo que vemos se repita la misma direccion de /pizza/ ya que tiene que ser la misma en ambas partes si le ponemos pizzita pizzita tiene que ser en ambas parte para que encuentre la ruta, y dsp el :id, es al momento de ver el detalle de la pizza se agrege el id de la pizza en la url , por eso se itera en catalogue  $pizza.id */}
      <R path="/cart" element={<ShoppingCart />} />
      <R path='*' element={<NotFound />} />
    </Rs>
  );
};

export default ConnectedRoutes;
