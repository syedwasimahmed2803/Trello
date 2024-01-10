import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import Board from "./FeatureComponents/Board";
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "10vw",
            marginRight: "10vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.length ? (
            data.map((item) => <Board key={item.id} {...item} />)
          ) : (
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#0000FF"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default Home;
