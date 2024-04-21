import Grid from "./Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import DataScreen from "./DataScreen";
import { useState } from "react";
import Login from "./Login";

function App() {
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  return (
    <Router>
      {seen ? <Login toggle={togglePop} /> : null}
      <Navbar toggle={togglePop} />
      <Routes>
        <Route path="/train" element={<Grid type={"train"} />} />
        <Route path="/predict" element={<Grid type={"predict"} />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/dataScreen" element={<DataScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
