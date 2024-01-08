import { useState, useEffect } from "react";
import axios from "axios";
import Board from "./Board";
import { TOKEN, API_KEY } from "./config";
import { Box } from "@mui/material";
const URL = `https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`;

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "10vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "20vw",
            marginRight: "10vw",
          }}
        >
          {data.map((item) => (
            <Board key={item.id} {...item} />
          ))}
        </div>
      </Box>
    </>
  );
};

export default Home;
