const ip = "134.60.157.99:5064";

export const requestPrediction = async (colours: any[][]): Promise<any> => {
  try {
    const response = await fetch(
      "http://" +
        ip +
        "/api/DigitNn?data=" +
        JSON.stringify(
          colours.flat().map((value) => {
            if (value == "black") {
              return 1;
            } else {
              return 0;
            }
          })
        ),
      { method: "GET", redirect: "follow" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const submitData = async (digit: number, colours: any[][]) => {
  fetch(
    "http://" +
      ip +
      "/api/DigitNn?data=" +
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
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

export const startTraining = async () => {
  try {
    const response = await fetch("http://" + ip + "/api/DigitNn", {
      method: "POST",
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const setupMouseEvents = (setIsMouseDown: (arg0: boolean) => void) => {
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);

  return () => {
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mouseup", handleMouseUp);
  };
};

export const characters = [
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
