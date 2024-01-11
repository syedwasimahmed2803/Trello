import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../API";

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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const data = await createBoard(input);
        navigate(`/boards/${data.id}`);
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
    </div>
  );
}
