import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const urlPizza = "/pizzas.json";
export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [pizzasDetails, setPizzasDetails] = useState({});
  const [cart, setCart] = useState([]);

  const getPizza = async () => {
    try {
      const response = await axios.get(urlPizza);
      if (response.status !== 200) {
        throw new Error("Data not found");
      }
      setPizzas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("You did not obtain the requested data:", error);
    }
  };

  const addToCart = (foundItems) => {
    const updatedCart = cart.map((item) => {
      if (item.id === foundItems.id) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });

    if (!updatedCart.find((item) => item.id === foundItems.id)) {
      updatedCart.push({ ...foundItems, quantity: 1 });
    }

    setCart(updatedCart);
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
  };

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
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;
