import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/train">Train</Link>
      </li>
      <li>
        <Link to="/predict">Predict</Link>
      </li>
    </ul>
  );
};

export default Navbar;
