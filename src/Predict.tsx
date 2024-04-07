import { useEffect, useState } from "react";
import Button from './Button';

function Predict() {
  // Define the dimensions of the matrix
  const numRows = 30;
  const tileSize = 20; // Adjust the size of each tile as needed

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [colours, setColours] = useState(Array.from({ length: numRows }, () => Array(numRows).fill('white')));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [prediction, setPrediction] = useState("");

  const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
    setPosition({ x: event.clientX, y: event.clientY });
    if (isMouseDown) {
      handleEnter('black');
    }
  };

  const resetColours = () => {
    setColours(Array.from({ length: numRows }, () => Array(numRows).fill('white')));
  }

  const handleEnter = (col: string) => {
    const array = [...colours];
    const rowIndex = Math.floor(((position.y - offsetY) / tileSize));
    const colIndex = Math.floor(((position.x - offsetX) / tileSize));
    if (rowIndex >= 0 && rowIndex < numRows && colIndex >= 0 && colIndex < numRows) {
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
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleContextMenu = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevents the default context menu from appearing
    handleEnter('white');
  };

  const submitRequest = () => {
      fetch("http://localhost:5064/api/DigitNn?data=" + JSON.stringify(colours.flat().map((value) => {if(value == 'black'){return 1;} else {return 0;}})), {method: "GET", redirect: "follow"})
        .then(async (response) => setPrediction(await response.text()))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    resetColours();
  };

  

  // Render the matrix
  return (
    <div style={{marginLeft : '40px'}}>
        <h1>Prediction</h1>
    <div 
    onDragStart={(e) => {e.preventDefault();}}
      onMouseMove={handleMouseMove} 
      onMouseDown={() => handleEnter('black')} 
      onContextMenu={handleContextMenu}
      style={{display: 'flex', flexDirection: 'column' }}
      ref={el => {
        if (!el) return;
        setOffsetY(el.getBoundingClientRect().top);
        setOffsetX(el.getBoundingClientRect().left);
      }}
    >
      {colours.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((color, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              style={{
                backgroundColor: color,
                width: tileSize + 'px',
                height: tileSize + 'px',
              }} 
            />
          ))}
        </div>
      ))}
    </div>
    <div style={{marginLeft : '30px'}}>
        <p style={{marginLeft : '30px'}}>{prediction}</p>
        <Button buttonText={"Submit"} onClick={submitRequest} />
      </div>
    </div>
  );
}

export default Predict;
