import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCard } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/CardSlice"; // Update import statement

function CreateCards({ id }) {
  const dispatch = useDispatch();
  const newCardName = useSelector(
    (state) => state.cards.newCardName[id] // Update the selector to use newCardName[id]
  );

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCard(id, newCardName);
        dispatch(cardActions.createCards({ data, id })); // Update action payload
        dispatch(cardActions.resetCardName());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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
            value={newCardName ? newCardName : ""}
            label="Enter a title for this card..."
            variant="outlined"
            onChange={(e) => {
              dispatch(cardActions.setCardName({ value: e.target.value, id }));
            }}
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
