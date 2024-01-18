import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";
import { showCheckItems, updateCheckItemState } from "../API";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import Snackbar from "@mui/material/Snackbar";
export default function CheckItem({ id, cardId }) {
  console.log(id);
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const fetchData = async () => {
    try {
      const data = await showCheckItems(id);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleCheckItemCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };
  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
    handleSnackbarOpen();
  };
  const handleChange = async (id, cardId, state) => {
    try {
      await updateCheckItemState(cardId, id, state, setData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <Box>
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "1rem",
              backgroundColor: "rgb(242, 242, 242)",
              marginBottom: "0.5rem",
            }}
          >
            <FormGroup
              sx={{
                marginRight: "auto",
                marginLeft: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={item.state === "complete" ? true : false}
                    onChange={() => handleChange(item.id, cardId, item.state)}
                  />
                }
                label={item.name}
              />
            </FormGroup>
            <DeleteButton
              type="checkItem"
              id={id}
              checkId={item.id}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </Box>
      <CreateCheckItem id={id} onCheckItemCreated={handleCheckItemCreated} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          Checkitem Successfully Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}
