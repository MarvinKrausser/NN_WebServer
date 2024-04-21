import { useEffect, useState } from "react";
import {
  convertNumberToColour,
  convertToQuadratic2DArray,
  requestData,
  tileSize,
  Data,
  characters,
  requestStop,
  submitStop,
  submitDelete,
} from "./Utils";
import Button from "./Button";
import { passwordGlobal } from "./Login";

function DataScreen() {
  const [status, setStatus] = useState("nothing");
  const [requestStatus, setRequestStatus] = useState("");
  const [stop, setStop] = useState(false);
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      setStatus("loading");
      setData(JSON.parse(await requestData()));
      setStatus("loaded");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStop = async () => {
    try {
      setStop(JSON.parse(await requestStop()));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitStop = async (stopVar: boolean) => {
    try {
      if (passwordGlobal == "") {
        setRequestStatus("No Key");
        return;
      }
      setRequestStatus(await submitStop(stopVar, passwordGlobal));
      fetchStop();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitDelete = async (index: number) => {
    try {
      if (stop) {
        setRequestStatus("You have to stop the Dataflow first");
        return;
      }
      if (passwordGlobal == "") {
        setRequestStatus("No Key");
        return;
      }
      setRequestStatus(await submitDelete(index, passwordGlobal));
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStop();
  }, []);

  return (
    <div className="site">
      <h1>Data</h1>
      <ul className="grid-list">
        <li>
          <Button buttonText={"Load Data"} onClick={fetchData} />
        </li>
        <li>
          <p>DataFlow: {JSON.stringify(stop)}</p>
        </li>
        <li>
          <Button
            buttonText={"Resume DataFlow"}
            onClick={() => {
              handleSubmitStop(false);
            }}
          />
        </li>
        <li>
          <Button
            buttonText={"Stop DataFlow"}
            onClick={() => {
              handleSubmitStop(true);
            }}
          />
        </li>
        {requestStatus != "" && (
          <li>
            <p>{requestStatus}</p>
          </li>
        )}
      </ul>
      {status == "loading" && <p>Loading Data</p>}

      {status == "loaded" && (
        <>
          <p>Number of Pictures: {data.length}</p>
          <ul className="grid-list">
            {data.map((dataObject, colIndex) => (
              <li key={colIndex} style={{ padding: "10px" }}>
                <>
                  <p>Target: {characters[dataObject.Item1]}</p>
                  <div
                    className="grid"
                    onDragStart={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {convertToQuadratic2DArray(dataObject.Item2).map(
                      (row, rowIndex) => (
                        <div key={rowIndex} style={{ display: "flex" }}>
                          {row.map((color, colIndex) => (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              style={{
                                backgroundColor: convertNumberToColour(color),
                                width: tileSize / 2 + "px",
                                height: tileSize / 2 + "px",
                              }}
                            />
                          ))}
                        </div>
                      )
                    )}
                  </div>
                  <Button
                    buttonText={"Delete"}
                    onClick={() => {
                      handleSubmitDelete(colIndex);
                    }}
                  />
                </>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DataScreen;
