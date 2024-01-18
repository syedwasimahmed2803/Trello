import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createCard } from "../API";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function CreateCards({ id, onCardCreated }) {
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
        const data = await createCard(id, input);
        onCardCreated(data);
        handleSnackbarOpen();
      } catch (error) {
        console.error("Error creating card:", error);
        handleSnackbarErrorOpen();
      }
    };

    setInput("");
    await fetchData();
  };

  return (
    <>
      <Accordion
        sx={{
          boxShadow:
            "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add a card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "15ch" },
              display: "flex",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              value={input}
              label="Enter a title for this card..."
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleChange} variant="contained">
              Add card
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
          Card Successfully Created
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarErrorOpen}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">Error creating card. Please try again.</Alert>
      </Snackbar>
    </>
  );
}

export default CreateCards;
