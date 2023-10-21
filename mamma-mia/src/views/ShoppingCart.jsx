import { useContext, useEffect } from "react";
import { PizzaContext } from "../context/PizzaContext";
import Button from "react-bootstrap/Button";
import "./ShoppingCart.css";
const ShoppingCart = () => {
  const { cart, setCart } = useContext(PizzaContext);

  const totalPrice = cart.reduce((acc, foundItems) => {
    return acc + foundItems.quantity * foundItems.price;
  }, 0);

  const decrement = (foundItems) => {
    const updatedPurchase = cart.map((item) => {
      if (item.id === foundItems && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    const filter = updatedPurchase.filter(
      (foundItems) => foundItems.quantity > 0
    );
    setCart(filter);
  };
  const increment = (foundItems) => {
    const updatedPurchase = cart.map((item) => {
      if (item.id === foundItems) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });

    setCart(updatedPurchase);
  };

  useEffect(() => {}, [cart]);

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
            <h4>${pizza.price * (pizza.quantity || 1)}</h4>
            <Button variant="danger" onClick={() => decrement(pizza.id)}>
              Menos -
            </Button>
            <h4>{pizza.quantity || 1}</h4>
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
