import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { API_KEY, TOKEN } from "./config";
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

export default function Checklists({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(id);
  const [data, setData] = useState([]);
  const URL = `https://api.trello.com/1/cards/${id}/checklists?key=${API_KEY}&token=${TOKEN}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      console.log(response);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "14rem",
          height: "4vh",
          position: "absolute",
          top: "0",
          left: "0",
        }}
        onClick={handleOpen}
      ></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {data.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton style={{}}>
                <ListItemText
                  style={{
                    marginRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
