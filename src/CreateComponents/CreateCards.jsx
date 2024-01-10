import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API_KEY, TOKEN } from "../config";
import { useState } from "react";
import axios from "axios";

function CreateCards({ id, onCardCreated }) {
  const [input, setInput] = useState("");
  const URL = ` https://api.trello.com/1/cards?idList=${id}&name=${input}&key=${API_KEY}&token=${TOKEN}`;

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(URL);
        console.log(response);
        if (response.status === 200) {
          const data = await response.data;
          onCardCreated(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setInput("");
    await fetchData();
  };
  return (
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
  );
}

export default CreateCards;