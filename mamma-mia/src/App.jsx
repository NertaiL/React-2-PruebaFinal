import "./App.css";
import Menu from "./components/Menu";
import ConnectedRoutes from "./routes/ConnectedRoutes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Menu />
      <ConnectedRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
