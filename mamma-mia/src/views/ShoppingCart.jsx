import { useContext, /* useEffect  */} from "react";
import { PizzaContext } from "../context/PizzaContext";
import Button from "react-bootstrap/Button";
import "./ShoppingCart.css";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const { cart, setCart ,cartUpdated ,setCartUpdated } = useContext(PizzaContext);
/* AQUI CART Y SETCART HEREDAN LO QUE CONSUMI DE LA API */
  const totalPrice = cart.reduce((acc, foundItems) => {
    return acc + foundItems.quantity * foundItems.price;
  }, 0);
  /* EN RESUMEN LO QUE ME PERMITE EL REDUCE, ES PODER TENER UN ACC O TOTAL COMO QUIERA LLAMARLO, PARA GUARDAR EL TOTAL DE LA OPERACION, EN ESTE CASO MULTIPLICO CNATIDAD * PRICE PARA OBTENER EL TOTAL Y ESE TOTAL SE GUARDA EN ACC ,ABAJO EXPLICACION */
  /* Aqui lo estoy diciendo en la etiqueta founditems que sera reemplazada cierto por la variable iteradora que es la que no vemos, y acc que sera nuestro acumumlador del precio total, yaque estamos multiplicando la cantidad * price de la variable iteradora que no vemos, entonces cada vez que estemos incrementando o decrementando se guardara en el acumulador y asi poder mostrar el total del precio */
/* reduce: Consolida elementos y devuelve un único valor.
¡Exactamente! Has comprendido bien el propósito central de reduce.
Iteración: reduce pasa por cada elemento del arreglo, en este caso, cada pizza.
Procesamiento específico: Aunque cada pizza tiene múltiples propiedades, en tu función de reducción, te enfocas específicamente en price y quantity para calcular el costo total de esa pizza particular.
Acumulación: El resultado de esa operación (la multiplicación de price por quantity para una pizza) se suma al acumulador (acc en tu código). El acumulador es como un "contador en marcha" que mantiene la suma total mientras reduce procesa cada elemento.
Resultado final: Al final del proceso, el acumulador (acc) contiene el valor total consolidado que, en tu caso, es el costo total de todas las pizzas en el carrito.
El poder de reduce radica en su capacidad para tomar un conjunto de valores (el arreglo) y consolidarlos o "reducirlos" en un único valor final. Y, como mencionaste, mientras haces esto, tienes la libertad de enfocarte en las propiedades o aspectos específicos del elemento que te interesan, y "ignorar" o excluir aquellos que no necesitas para la operación particular que estás realizando. */
  
const decrement = (foundItems) => {
    const updatedPurchase = cart.map((item) => {
      if (item.id === foundItems && item.quantity > 0) {/* aqui estoy diciendo si item.id es igual a founditems que seria el reemplazante cierto, y la cantidad es mayor a 0, entonces retorname las propiedades de item , pero en la cantidad decrementamelo -1  y si el item no coincide o el elemento ya es 0, siemplemente retorname la pizza tal como est asin modificarla */
       return { ...item, quantity: item.quantity - 1 };
      }
      return item;/* aqui en vez de return podria ser else */
    });

    const filter = updatedPurchase.filter(
      (foundItems) => foundItems.quantity > 0/* aqui ocupo el metodo filter, y estoy diciendo si el founditems.quantity es mayor a 0 entonces incluyelas si es menor o igual a 0 eliminalas */
    );/* osea que si es = a 0 o menor se eliminaria, claro porque si tengo pizzas en mi carrito, y ponte seleccione 1 pizza y la elimino , como esa pizza seria 0 en cantidad se eliminaria y no se mostraria, que seria lo logico, imaginate si le hubiera apuesto mayor o igual a 0foundItems.quantity >= 0 osea que si tengo 1 pizza en el carrito y la elimino, me saldira 0 pero me seguiria mostrando la pizza lo cual no seria optimo */
    setCart(filter);
    setCartUpdated(false);
    toast.warn("Eliminaste 1 pizza");
  };
  /* Aquí, después de haber reducido la cantidad de la pizza deseada, uso filter para crear un nuevo arreglo que contiene solo las pizzas que tienen una cantidad mayor que 0. Esto significa que cualquier pizza con una cantidad de 0 será excluida del nuevo arreglo filter. */
 /* Finalmente, actualizas el estado cart con el arreglo filter, que es el carrito de compras actualizado después de reducir la cantidad de la pizza deseada y eliminar cualquier pizza con una cantidad de 0 */
/* En resumen, la función decrement:
Busca una pizza específica en el carrito por su id.
Reduce la cantidad de esa pizza en 1.
Elimina cualquier pizza del carrito que tenga una cantidad de 0.
Actualiza el estado del carrito con estos cambios. */

  const increment = (foundItems) => {/* aqui lo que estoy diciendo es si item.id es igual a founditems , entonces retorname las propiedades de item y agregame la propiedad cantidad y aqui (item.quantity || 1) + 1 
  estoy diciendo si item.quantity tiene algun valor o dato se incrementa de lo contrario empieza con 1 y tambien se incrementa, de lo contrario solo retorname el item como estaba sin modificar */
    const updatedPurchase = cart.map((item) => {
      if (item.id === foundItems) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });

    setCartUpdated(true);
    toast.info("Vamos, Agregaste 1 pizzas +");
    setCart(updatedPurchase);
  };

  /* resumen: 
  La función increment toma un argumento, foundItems, que parece ser el id de una pizza específica que deseas incrementar.
Usas el método map para iterar sobre cada pizza en el carrito (cart).
Para cada pizza (item), verificas si su id coincide con el id que deseas incrementar (foundItems).
Si hay una coincidencia, creas un nuevo objeto que tiene todas las propiedades originales de item (usando el operador spread ...item) y actualizas o defines la propiedad quantity.
La lógica (item.quantity || 1) + 1 determina el nuevo valor para quantity:
Si item.quantity tiene un valor (es decir, no es undefined, null, 0, o cualquier otro valor falsy en JavaScript), ese valor se utiliza.
Si item.quantity es falsy (como undefined si la pizza acaba de ser añadida al carrito y aún no tiene una propiedad quantity), entonces se utiliza 1 como el valor base.
Luego, independientemente de si se utilizó item.quantity o 1, le sumas 1 para incrementar la cantidad.
Si el id de la pizza no coincide con foundItems, simplemente retornas la pizza tal como está sin modificarla.
Finalmente, actualizas el estado cart con el nuevo arreglo de pizzas updatedPurchase, que refleja el incremento en la cantidad de la pizza deseada. */

 /*  useEffect(() => {
    if (cartUpdated) {
      toast.info("Vamos, Agregaste 1 pizzas +");
      setCartUpdated(false); // resetea el valor para la próxima vez
  }
  }, [cart,cartUpdated]); 
  Este cambio eliminará la necesidad de utilizar el estado cartUpdated y el useEffect asociado, porque ahora estás mostrando los mensajes de toast directamente desde las funciones increment y decrement.
  */



  return (
    <main className="daddy">
      <h4>Detalles del pedido:</h4>
      {cart.map((pizza, k) => (
        <article key={k}>
          <section className="image-name">
            <img src={pizza.img} alt={pizza.name} />
            <h4>{pizza.name}</h4>
          </section>
          <section className="price-increment-decrement">
            <h4>${pizza.price * (pizza.quantity || 1)}</h4>{/* bueno aqui estoy diciendo que price me multiplique la cantidad si tiene cantidad o si no tiene que sea por 1 */}
            <Button variant="danger" onClick={() => decrement(pizza.id)}>
              Menos -
            </Button>
            <h4>{pizza.quantity || 1}</h4>{/*  bueno aqui estoy diciendo si pizza tiene alguna cantidad que me lo tome de lo contrario que me tome 1 */}
            <Button variant="success" onClick={() => increment(pizza.id)}>
              Mas +
            </Button>
          </section>
        </article>
      ))}
      <section>
        <h4>total:${totalPrice}</h4>
      </section>
      <Button>Ir A Pagar</Button>
    </main>
  );
};

export default ShoppingCart;

/* AQUI HUBIESE SIDO MEJOR PASARLO A COMPONENTS Y DESPUES RENDERIZARLO EN UNA VISTA LLAMADO COMO UNO QUIERA PARA QUE SE VEA MAS LIMPIO */