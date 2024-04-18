import Grid from "./Grid";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/train" element={<Grid type={"train"} />} />
        <Route path="/predict" element={<Grid type={"predict"} />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
