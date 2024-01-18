import { useState, useEffect } from "react";
import { Instagram } from "react-content-loader";
import Alert from "@mui/material/Alert";
import Board from "./FeatureComponents/Board";
import { Box } from "@mui/material";
import { showBoards } from "./API";

const Home = () => {
  const [data, setData] = useState([]);
  const [loadState, setLoadState] = useState(true);
  const fetchData = async () => {
    try {
      const data = await showBoards();
      setData(data);
      setLoadState(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          {!loadState ? (
            data.length ? (
              data.map((item) => <Board key={item.id} {...item} />)
            ) : (
              <div
                style={{
                  width: "80vw",
                  height: "60vh",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginRight: "10vw",
                  marginTop: "2vh",
                }}
              >
                <Alert severity="info">No boards to Display.</Alert>
              </div>
            )
          ) : (
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
              <Instagram style={{ marginInline: "1vw" }} />
              <Instagram style={{ marginInline: "1vw" }} />
              <Instagram style={{ marginInline: "1vw" }} />
              <Instagram style={{ marginInline: "1vw" }} />
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default Home;
