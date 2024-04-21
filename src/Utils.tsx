const ip = "134.60.157.99:5064";
export const tileSize = 20;
export const colourBlack = "black";
export const colourWhite = "white";
export interface Data {
  Item1: number;
  Item2: number[];
}

export const requestStop = async (): Promise<any> => {
  try {
    const response = await fetch("http://" + ip + "/api/DigitNn/getStop", {
      method: "GET",
      redirect: "follow",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.text);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const checkKey = async (key: string): Promise<any> => {
  try {
    const response = await fetch(
      "http://" + ip + "/api/DigitNn/getKey?key=" + key,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.text);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const submitDelete = async (
  index: number,
  key: string
): Promise<any> => {
  try {
    const response = await fetch(
      "http://" + ip + "/api/DigitNn?index=" + index + "&key=" + key,
      {
        method: "DELETE",
        redirect: "follow",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.text);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const submitStop = async (stop: boolean, key: string): Promise<any> => {
  try {
    const response = await fetch(
      "http://" + ip + "/api/DigitNn/stop?stop=" + stop + "&key=" + key,
      {
        method: "POST",
        redirect: "follow",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response.text);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const requestData = async (): Promise<any> => {
  try {
    const response = await fetch("http://" + ip + "/api/DigitNn/getData", {
      method: "GET",
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

export function convertNumberToColour(num: number): string {
  if (num == 1) {
    return colourBlack;
  }
  if (num == 0) {
    return colourWhite;
  }
  throw new Error("Wrong number");
}

export function convertToQuadratic2DArray<T>(array: T[]): T[][] {
  const size = Math.ceil(Math.sqrt(array.length)); // Calculate the size of each side of the quadratic 2D array
  const result: T[][] = [];

  for (let i = 0; i < size; i++) {
    const row: T[] = [];
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      row.push(array[index]);
    }
    result.push(row);
  }

  return result;
}

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

export const submitData = async (
  digit: number,
  colours: any[][]
): Promise<any> => {
  try {
    const response = await fetch(
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
