import { useState, useEffect } from "react";
import { Instagram } from "react-content-loader";
import Board from "./FeatureComponents/Board";
import { Box } from "@mui/material";
import { showBoards } from "./API";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "./store/BoardSlice";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.board.data);

  const fetchData = async () => {
    try {
      const data = await showBoards();
      dispatch(boardActions.getBoardData(data));
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
          {data.length ? (
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
