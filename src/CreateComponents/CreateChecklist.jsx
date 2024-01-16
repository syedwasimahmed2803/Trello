import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createChecklist } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checklistActions } from "../store/CheckListSlice";

function CreateChecklist({ id }) {
  const dispatch = useDispatch();
  const checklist = useSelector((state) => state.checkList.newCheckListName);
  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createChecklist(id, checklist);
        dispatch(checklistActions.createCheckList(data));
        dispatch(checklistActions.resetCheckListName());
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
            value={checklist}
            label="Enter a title for this checklist..."
            variant="outlined"
            onChange={(e) =>
              dispatch(checklistActions.setCheckListName(e.target.value))
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
