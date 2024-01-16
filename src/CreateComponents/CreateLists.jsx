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
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../store/ListSlice";

export default function CreateLists({ id }) {
  const dispatch = useDispatch();
  const listName = useSelector((state) => state.list.newlistName);

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createList(id, listName);
        dispatch(listActions.createList(data));
        dispatch(listActions.resetCheckListName());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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
              value={listName}
              label="Enter list title..."
              variant="outlined"
              onChange={(e) =>
                dispatch(listActions.setListName(e.target.value))
              }
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
