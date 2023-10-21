import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import Button from "react-bootstrap/Button";
import "./Pizza.css";

const Pizza = () => {
  const { id } = useParams();
  const { pizzas, pizzasDetails, setPizzasDetails, addToCart } =
    useContext(PizzaContext);
  const data = () => {
    const pizzaData = pizzas.find((pizza) => pizza.id === id);
    setPizzasDetails(pizzaData);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <main
      style={{ width: "18rem" }}
      key={pizzasDetails.id}
      className="containerr"
    >
      <section className="daddy-card">
        <div>
          <img
            src={pizzasDetails.img}
            alt={pizzasDetails.name}
            className="image-details"
          />
        </div>
        <section className="baby-card">
          <article>{pizzasDetails.name}</article>
          <article>{pizzasDetails.desc}</article>
          <span>Ingredientes:</span>
          <ul className="pizza-list">
            {pizzasDetails.ingredients &&
              pizzasDetails.ingredients.map((ingredient, index) => (
                <li key={index}>🍕{ingredient}</li>
              ))}
          </ul>

          <article className="price-details">${pizzasDetails.price}</article>
          <Button variant="primary" onClick={() => addToCart(pizzasDetails)}>
            Añadir 🛒
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Pizza;
