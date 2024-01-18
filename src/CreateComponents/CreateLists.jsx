import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { createList } from "../API";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function CreateLists({ id, onListCreated }) {
  const [input, setInput] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarErrorOpen(false);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarErrorOpen = () => {
    setSnackbarErrorOpen(true);
  };

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createList(id, input);
        onListCreated(data);
        handleSnackbarOpen(); // Open Snackbar on successful creation
      } catch (error) {
        console.error("Error fetching data:", error);
        handleSnackbarErrorOpen(); // Open Snackbar on error
      }
    };
    setInput("");
    await fetchData();
  };

  return (
    <div>
      <Accordion
        sx={{
          boxShadow:
            "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
          width: "15rem",
          marginTop: "3vh",
          marginRight: "2vw",
          marginLeft: "2vw",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>add another list</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={input}
              label="Enter list title..."
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleChange} variant="contained">
              add list
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          List Successfully Created
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarErrorOpen}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">Error creating list. Please try again.</Alert>
      </Snackbar>
    </div>
  );
}
