import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const urlPizza = "/pizzas.json";
export const PizzaContext = createContext(); /* Guardo en una constante el createContext() la guarde en una variable llamada PizzaContext, para cuando queramos pasar por paramaetros en el return seria <PizzaContext.Provider><PizzaContext.Provider>*/

const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasDetails, setPizzasDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);

  const getPizza = async () => {
    try {
      const response = await axios.get(urlPizza);
      if (response.status !== 200) { /* aqui estamos diciendo si la respuesta es diferente a 200 entonces dame un error como data not found */
        throw new Error("Data not found");
      }
      setPizzas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("You did not obtain the requested data:", error);
    }
  };

  const addToCart = (foundItems) => {
    /* el parametro foundItems es mas que nada una etiqueda, osea cuando ocupemos addtocart en un button ,ejemplo en el componente catalogue mapeamos pizzas y le pasamos la iteradora pizza onClick={() => addToCart(pizza)} entonces sin que nosotros la veamos en el codigo, en donde escribimos la etiqueta founditems, se reemplazaria a pizza o el nombre de la variable iteradora del que estemos ocupando en el button */
    const updatedCart = cart.map((item) => {/* aqui mapeo la cart y la guardo en una constante en este caso updateCart , */
      if (item.id === foundItems.id) {/* aqui comprobando si el id de la pizza en el carrito item.id coincide con el id que queremos añadir, founditems.id , en este caso tomando encuenta que en el componentee catalogue le pasamos al button addToCart(pizza) seria if (item.id === pizza.id) sin que nosotros lo veamos yaque founditems es una etiqueta que luego sera reemplazada*/
        return { ...item, quantity: (item.quantity || 0) + 1 };/* entonces retorname la pizza en este caso ...item que eso estaria diciendo esto item = { id: 1, name: "Pizza Margarita", price: 10 } osea estamos haciendo una copia con esto ... de las propiedades que tenemos y estableciendo una propiedad llamada quantity, en la linea 31 lo explico mejor */
      } /* Estás creando un nuevo objeto que tiene todas las propiedades de item (la pizza actual del carrito), y, adicionalmente, estás estableciendo la propiedad quantity y aqui (item.quantity || 0) + 1 } estamos diciendo que si el valor a la izquierda de || osea item.quantity si es un valor falso entonces tomame el valor de la derecha que seria 0, osea si item.quantity tiene un valor true(es decir, un valor que no sea undefined o null, osea que tenga algun numero como valor en quantity, entonces usa ese valor, o si item.quantity es falso(si no esta definido) entonces usa el valor  de la derecha osea 0 y en ese caso como parte en 0 simplemente le sumamos 1) , ejemplo si item es { id: 1, name: "Pizza Margarita", quantity: 3 } entonces (item.quantity || 0) + 1 se evaluará como (3 || 0) + 1, lo que resulta en 4. ahora ejemplo 2 si item.quantity no está definido osea si item es { id: 1, name: "Pizza Margarita" } Entonces (item.quantity || 0) + 1 se evaluará como (undefined || 0) + 1,osea tomaria el valor de 0 y se le sumaria 1, lo que resulta en 1.*/
      return item;/* esto si si el item.id no es estrictamente === al founditems.id entonces return el item sin hacerles cambios. */
    });

    /* Con el código anterior (la parte que usaba map):

Si la pizza ya estaba en el carrito: La cantidad de esa pizza se incrementa en 1.

Si la pizza no estaba en el carrito: Simplemente se devuelve el item sin hacerle cambios.

Después de este proceso, aunque hayas incrementado la cantidad de una pizza existente en el carrito, no has añadido ninguna pizza nueva al carrito si no estaba antes.

Por eso necesitas la siguiente parte: */

    if (!updatedCart.find((item) => item.id === foundItems.id)) {/* bueno si la pizza no esta agregada al carrito, entonces, voy hacer un push y la agrego como primera vez */
      updatedCart.push({ ...foundItems, quantity: 1 });
    }
/* este es mi comentario de lo que pienso sobre el codigo 45 al 46 osea un ejemplo si yo añado la primera pizza napolitana al carrito, como es la primera entonces se va acumplir el codigo de que no tengo ninguna pizza agregada al carrito entonces me va a hacer un push con la copia del ...founditems y la cantidad y luego como ya esta en el carrito si agrego la misma pizza, ahi se cumple la otra parte , como ya esta la pizza en el carrito entonces no hace nada ese codigo y funciona el codigo anterior que lo suma?
 */
    /* ¡Exactamente! Has comprendido el flujo correctamente. Vamos a repasar tu ejemplo para consolidar tu entendimiento:

Agregas la pizza Napolitana por primera vez:

Durante el proceso con map, no encuentra la pizza Napolitana en el carrito (porque aún no está allí), así que solo devuelve los items existentes sin cambios.
Luego, el código verifica con if (!updatedCart.find((item) => item.id === foundItems.id)). No encuentra la pizza Napolitana en el carrito, por lo que la condición se cumple.
Entonces, añade la pizza Napolitana al carrito con updatedCart.push({ ...foundItems, quantity: 1 });. Ahora, la pizza Napolitana está en el carrito con una cantidad de 1.
Agregas la pizza Napolitana nuevamente:

Durante el proceso con map, encuentra la pizza Napolitana en el carrito y aumenta su cantidad en 1. Ahora, la cantidad es 2.
Luego, el código verifica nuevamente con if (!updatedCart.find((item) => item.id === foundItems.id)). Esta vez, sí encuentra la pizza Napolitana en el carrito, por lo que la condición no se cumple y no se ejecuta el push. No es necesario, porque la pizza ya está en el carrito y su cantidad ya se actualizó.
Por lo tanto, la combinación de estos dos segmentos de código garantiza que:

Si la pizza ya está en el carrito, su cantidad se incremente.
Si la pizza no está en el carrito, se añada al carrito con una cantidad inicial de 1.
¡Has interpretado el flujo de manera correcta! */

    setCart(updatedCart); /* aqui solamente actualizo el estado cart con el valor de updateCart */
    toast.success("Pizza añadida exitosamente", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };/* en resumen lo que estamos haciendo con la funcion updatecart esque si esta la pizza en el carrito entonces incrementame 1 al momento si le doy a + y si no esta en el carrito entonces agregame la pizza */

  useEffect(() => {
    getPizza();
  }, []);

  return (
    <PizzaContext.Provider
      value={{
        pizzas,
        setPizzas,
        pizzasDetails,
        setPizzasDetails,
        cart,
        setCart,
        addToCart,
        cartUpdated,
        setCartUpdated
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;
