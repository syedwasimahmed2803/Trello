import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createList } from "../API";

export default function CreateLists({ id, onListCreated }) {
  const [input, setInput] = useState("");

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createList(id, input);
        onListCreated(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          width: "15vw",
          marginRight: "2vw",
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
    </div>
  );
}
