import { useContext } from "react";
import { PizzaContext } from "../context/PizzaContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Catalogue.css";
import { useNavigate } from "react-router-dom";/*  es de react-router-dom */


const Catalogue = () => {
  const { pizzas, addToCart } = useContext(PizzaContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="mamamia">
        <h1>!Pizzería Mamma Mia!</h1>
      </div>
      <div className="pizza-daddy">
        {pizzas.map((pizza, i) => (
          <Card style={{ width: "18rem" }} key={i}>
            <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
            <Card.Body className="card-bodyy">
              <Card.Title>{pizza.name}</Card.Title>
              <Card.Text>Ingredientes:</Card.Text>
              <ul className="pizza-list">
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index}>🍕{ingredient}</li>
                ))}
              </ul>

              <ListGroup.Item className="price">${pizza.price}</ListGroup.Item>
              <section className="seemore-addtocart">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/pizza/${pizza.id}`);
                  }}
                >
                  Detalles 👀
                </Button>
                <Button variant="danger" onClick={() => addToCart(pizza)}>
                  Añadir 🛒
                </Button>
              </section>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Catalogue;
