import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../API";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const data = await createBoard(input);
        navigate(`/boards/${data.id}`);
        handleSnackbarOpen();
      } catch (error) {
        console.log("Error Creating Board");
      }
    };
    await fetchData();
    setInput("");
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "rgb(0, 0, 0)", color: "white" }}
        onClick={handleOpen}
      >
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: 700, textAlign: "center", marginBottom: "1rem" }}
          >
            Create Board
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              id="outlined-basic"
              value={input}
              label="Enter Board Name..."
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
              sx={{ marginRight: "auto" }}
            />
            <Button onClick={handleSubmit} variant="contained">
              Add Board
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Board Successfully Created
        </Alert>
      </Snackbar>
    </div>
  );
}
