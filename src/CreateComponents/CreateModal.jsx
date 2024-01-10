import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { API_KEY, TOKEN } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `https://api.trello.com/1/boards/?name=${input}&key=${API_KEY}&token=${TOKEN}`;
    const fetchData = async () => {
      try {
        const response = await axios.post(URL);
        console.log(response);
        if (response.status === 200) {
          const data = await response.data;
          console.log(data);
          navigate(`/boards/${data.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
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
            sx={{ fontWeight: 700, textAlign: "center", marginBottom: "2rem" }}
          >
            Create Board
          </Typography>

          <Box sx={{ display: "flex" }}>
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
    </div>
  );
}
