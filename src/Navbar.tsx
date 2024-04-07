import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div style={{ display: 'flex', marginLeft: '80px'}}>
            <Link style={{margin : '40px'}} to="/">Home</Link>
            <Link style={{margin : '40px'}} to="/train">Train</Link>
            <Link style={{margin : '40px'}} to="/predict">Predict</Link>
        </div>
    );
  };

  export default Navbar;