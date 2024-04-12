import { useEffect, useState } from "react";
import Button from "./Button";

function Grid() {
  // Define the dimensions of the matrix
  const numRows = 30;
  const tileSize = 20; // Adjust the size of each tile as needed

  let characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [colours, setColours] = useState(
    Array.from({ length: numRows }, () => Array(numRows).fill("white"))
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [digit, setDigit] = useState(Math.floor(Math.random() * 62));
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [status, setStatus] = useState("");

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
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // Add event listeners when component mounts
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevents the default context menu from appearing
    handleEnter("white");
  };

  const handlePutRequest = () => {
    fetch(
      "http://localhost:5064/api/DigitNn?data=" +
        JSON.stringify({
          target: digit,
          input: colours.flat().map((value) => {
            if (value == "black") {
              return 1;
            } else {
              return 0;
            }
          }),
        }),
      { method: "PUT", redirect: "follow" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    resetColours();
    setDigit(Math.floor(Math.random() * 62));
  };

  const handleTrainRequest = () => {
    setStatus("Training");
    fetch("http://localhost:5064/api/DigitNn", {
      method: "POST",
      redirect: "follow",
    })
      .then(async (response) => setStatus(await response.text()))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  // Render the matrix
  return (
    <div className="input">
      <h1>Training</h1>
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
      <div style={{ marginLeft: "30px" }}>
        <p style={{ marginLeft: "30px" }}>{characters[digit]}</p>
        <Button buttonText={"Reset"} onClick={resetColours} />
        <Button buttonText={"Submit"} onClick={handlePutRequest} />
        <Button buttonText={"Train"} onClick={handleTrainRequest} />
        <p style={{ marginLeft: "30px" }}>{status}</p>
      </div>
    </div>
  );
}

export default Grid;
