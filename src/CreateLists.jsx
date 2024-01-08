import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateLists() {
  return (
    <div>
      <Accordion>
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
              "& > :not(style)": { m: 1, width: "15ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Enter list title..."
              variant="outlined"
            />
            <Button variant="contained">add list</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
