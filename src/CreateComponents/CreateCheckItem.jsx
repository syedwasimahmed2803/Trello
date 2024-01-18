import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createCheckItem } from "../API";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function CreateCheckItem({ id, onCheckItemCreated }) {
  const [input, setInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCheckItem(id, input);
        onCheckItemCreated(data);
        handleSnackbarOpen();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setInput("");
    await fetchData();
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="outlined-basic"
          value={input}
          label="Enter a title for this checkitem..."
          variant="outlined"
          onChange={(e) => setInput(e.target.value)}
          sx={{ marginRight: "auto" }}
        />
        <Button onClick={handleChange} variant="contained">
          Add Item
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          CheckItem Successfully Created
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateCheckItem;
