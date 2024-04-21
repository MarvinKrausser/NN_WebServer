import { Link } from "react-router-dom";
import "./NavBar.css";
import Button from "./Button";
import { passwordStatus } from "./Login";

interface Props {
  toggle: () => void;
}

const Navbar = (props: Props) => {
  return (
    <ul className="listNavbar">
      <li className="elementNavbar">
        <Link to="/">Home</Link>
      </li>
      <li className="elementNavbar">
        <Link to="/train">Train</Link>
      </li>
      <li className="elementNavbar">
        <Link to="/predict">Predict</Link>
      </li>
      <li className="elementNavbar">
        <Link to="/dataScreen">Data</Link>
      </li>
      {passwordStatus != "" && (
        <li className="elementNavbar" style={{ marginLeft: "auto" }}>
          <p>{passwordStatus}</p>
        </li>
      )}
      <li className="elementNavbar" style={{ marginLeft: "auto" }}>
        <Button buttonText={"Login"} onClick={props.toggle} />
      </li>
    </ul>
  );
};

export default Navbar;
