import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateChecklist from "../CreateComponents/CreateChecklist";
import CheckItem from "./CheckItem";
import { showChecklists } from "../API";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";
import Snackbar from "@mui/material/Snackbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};

export default function Checklists({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await showChecklists(id);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChecklistCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };
  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
    handleSnackbarOpen();
  };
  return (
    <div>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "16rem",
          height: "5vh",
          position: "absolute",
          marginTop: "3px",
          top: "0",
          left: "0",
          cursor: "pointer",
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
              <Accordion
                sx={{ width: "100%", maxHeight: "50vh", overflowY: "auto" }}
              >
                <AccordionSummary
                  expandIcon={
                    // <DeleteChecklist id={item.id} onDelete={handleDelete} />
                    <DeleteButton
                      type="checklist"
                      id={item.id}
                      onDelete={handleDelete}
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <CheckItem id={item.id} cardId={id} />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
          <CreateChecklist
            id={id}
            onChecklistCreated={handleChecklistCreated}
          />
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
          Checklist Successfully Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}
