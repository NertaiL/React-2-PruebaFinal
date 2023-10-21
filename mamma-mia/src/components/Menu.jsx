import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import pizzamenu from "../assets/pizza32px.png";
import shoppingcart from "../assets/cart32px.png";
import "./Menu.css";
import { PizzaContext } from "../context/PizzaContext";
import { useContext } from "react";

const Menu = () => {
  const ActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
  const { cart } = useContext(PizzaContext);
  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.quantity * pizza.price,
    0
  );
  return (
    <Navbar className="nav-daddy">
      <Container>
        <Navbar.Brand>
          {" "}
          <NavLink className={ActiveClass} to="/">
            <img src={pizzamenu} alt="Pizza-Menu" /> Pizzeria Mamma Mia!
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Total:{" "}
            <NavLink className={ActiveClass} to="/cart">
              ${totalPrice}
              <img src={shoppingcart} alt="" />{" "}
            </NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
