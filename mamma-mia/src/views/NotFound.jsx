import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="maintenance">
      <Link className="link" to="*">
        <h2 className="maintext">ingresaste una dirección que no existe</h2>
      </Link>
      <Button onClick={handleClick} className="btn-warning">
        A Home
      </Button>
    </div>
  );
};

export default NotFound;
