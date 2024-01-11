import { createContext, useContext, useEffect, useState } from "react";
import { showBoards } from "./API";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [backgroundImageObject, setBackgroundImageObject] = useState({});
  const [backgroundColorObject, setBackgroundColorObject] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showBoards();
        setData(data);

        const backgroundObj = {};
        data.forEach((board) => {
          backgroundObj[board.id] = board.prefs.backgroundImage;
        });
        setBackgroundImageObject(backgroundObj);

        const backgroundColorObj = {};
        data.forEach((board) => {
          backgroundColorObj[board.id] = board.prefs.backgroundColor;
        });
        setBackgroundColorObject(backgroundColorObj);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BoardContext.Provider
      value={{ backgroundImageObject, backgroundColorObject }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
