import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");/*  aqui me redirecciona a home que vendria siendo mi catalogo, si le hubiese puesto /cart me dirige hacia la pagina cart  */
  };

  return (
    <div className="maintenance">
      <Link className="link" to="*">
        <h2 className="maintext">ingresaste una dirección que no existe</h2>
      </Link>
      <Button onClick={handleClick} className="btn-warning">{/*  aqui llamamos la funcion que nos deriva hacia home / */}
        A Home
      </Button>
    </div>
  );
};

export default NotFound;
