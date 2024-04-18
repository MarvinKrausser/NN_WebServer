import { useEffect, useState } from "react";
import Button from "./Button";
import {
  startTraining,
  submitData,
  characters,
  setupMouseEvents,
  requestPrediction,
} from "./Utils";

interface Props {
  type: string;
}

function Grid(props: Props) {
  // Define the dimensions of the matrix
  const numRows = 30;
  const tileSize = 20; // Adjust the size of each tile as needed

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [colours, setColours] = useState(
    Array.from({ length: numRows }, () => Array(numRows).fill("white"))
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [digit, setDigit] = useState(Math.floor(Math.random() * 62));
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [status, setStatus] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleMouseMove = (event: { clientX: any; clientY: any }) => {
    setPosition({ x: event.clientX, y: event.clientY });
    if (isMouseDown) {
      handleEnter("black");
    }
  };

  const resetColours = () => {
    setColours(
      Array.from({ length: numRows }, () => Array(numRows).fill("white"))
    );
  };

  const handleEnter = (col: string) => {
    const array = [...colours];
    const rowIndex = Math.floor((position.y - offsetY) / tileSize);
    const colIndex = Math.floor((position.x - offsetX) / tileSize);
    if (
      rowIndex >= 0 &&
      rowIndex < numRows &&
      colIndex >= 0 &&
      colIndex < numRows
    ) {
      array[rowIndex][colIndex] = col;
      setColours(array);
    }
  };

  useEffect(() => {
    const cleanup = setupMouseEvents(setIsMouseDown);
    return cleanup;
  }, []);

  const handleContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevents the default context menu from appearing
    handleEnter("white");
  };

  const handlePutRequest = () => {
    submitData(digit, colours);
    resetColours();
    setDigit(Math.floor(Math.random() * 62));
  };

  const handleTrainRequest = async () => {
    setStatus("Training");
    setStatus(await startTraining());
  };

  const submitRequest = async () => {
    setPrediction("Computing");
    setPrediction(await requestPrediction(colours));
    resetColours();
  };

  // Render the matrix
  return (
    <div className="input">
      {props.type == "train" && <h1>Train</h1>}
      {props.type == "predict" && <h1>Predict</h1>}
      <div
        className="grid"
        onDragStart={(e) => {
          e.preventDefault();
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={() => handleEnter("black")}
        onContextMenu={handleContextMenu}
        style={{ display: "flex", flexDirection: "column" }}
        ref={(el) => {
          if (!el) return;
          setOffsetY(el.getBoundingClientRect().top);
          setOffsetX(el.getBoundingClientRect().left);
        }}
      >
        {colours.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  backgroundColor: color,
                  width: tileSize + "px",
                  height: tileSize + "px",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {props.type == "train" && (
        <div style={{ marginLeft: "30px" }}>
          <p style={{ marginLeft: "30px" }}>{characters[digit]}</p>
          <Button buttonText={"Reset"} onClick={resetColours} />
          <Button buttonText={"Submit"} onClick={handlePutRequest} />
          <Button buttonText={"Train"} onClick={handleTrainRequest} />
          <p style={{ marginLeft: "30px" }}>{status}</p>
        </div>
      )}

      {props.type == "predict" && (
        <div style={{ marginLeft: "30px" }}>
          <p style={{ marginLeft: "30px" }}>{prediction}</p>
          <Button buttonText={"Submit"} onClick={submitRequest} />
        </div>
      )}
    </div>
  );
}

export default Grid;
