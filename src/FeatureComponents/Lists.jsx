import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateLists from "../CreateComponents/CreateLists";
import DeleteButton from "../CreateComponents/CreateButton";
import { useNavigate } from "react-router-dom";
import { List } from "react-content-loader";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import Snackbar from "@mui/material/Snackbar";
import Cards from "./Cards";
import { showLists } from "../API";
import { useBoardContext } from "../Background";
function Lists() {
  const [data, setData] = useState([]);
  const [loadState, setLoadState] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const { id } = useParams();
  const { backgroundImageObject, backgroundColorObject } = useBoardContext();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const data = await showLists(id);
      setData(data);
      setLoadState(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate(`/error`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleListCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };

  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
    handleSnackbarOpen();
  };

  return (
    <div
      style={{
        display: "flex",
        // gap: "2rem",
        marginTop: "9vh",
        paddingTop: "3vh",
        // marginLeft: "2vw",
        backgroundColor: backgroundColorObject[id]
          ? backgroundColorObject[id]
          : "#0079BF",
        backgroundImage: `url(${backgroundImageObject[id]})`,
        height: "91vh",
        overflowX: "auto",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {!loadState ? (
          data.map((item) => (
            <div
              key={item.id}
              style={{
                marginLeft: "2vw",
                marginTop: "3vh",
                backgroundColor: "white",
                width: "20rem",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow:
                  "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ marginRight: "1rem", fontWeight: 600 }}>
                  {item.name}
                </span>
                <DeleteButton
                  type="list"
                  id={item.id}
                  onDelete={handleDelete}
                />
              </div>
              <div>
                <Cards id={item.id} />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <List />
            <List />
            <List />
            <List />
          </div>
        )}
        <CreateLists id={id} onListCreated={handleListCreated} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          List Successfully Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Lists;
