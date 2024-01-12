import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import { createChecklist } from "../API";

const initialState = {
  input: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "RESET_INPUT":
      return { ...state, input: "" };
    default:
      return state;
  }
};

function CreateChecklist({ id, onChecklistCreated }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { input } = state;

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createChecklist(id, input);
        onChecklistCreated(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dispatch({ type: "RESET_INPUT" });
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
        <Typography>Add a Checklist</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            value={input}
            label="Enter a title for this checklist..."
            variant="outlined"
            onChange={(e) =>
              dispatch({ type: "SET_INPUT", payload: e.target.value })
            }
          />
          <Button onClick={handleChange} variant="contained">
            Add Checklist
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default CreateChecklist;
