import Grid from "./Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Predict from "./Predict";
import Navbar from "./Navbar";
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/train" element={<Grid />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
