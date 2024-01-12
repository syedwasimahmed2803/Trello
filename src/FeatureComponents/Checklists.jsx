import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useReducer } from "react";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateChecklist from "../CreateComponents/CreateChecklist";
import CheckItem from "./CheckItem";
import { showChecklists } from "../API";
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
const initialState = {
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload };
    case "ADD_CHECKLIST":
      return { ...state, data: [...state.data, action.payload] };
    case "DELETE_CHECKLIST":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function Checklists({ id }) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = state;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const data = await showChecklists(id);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChecklistCreated = (newData) => {
    dispatch({ type: "ADD_CHECKLIST", payload: newData });
  };

  const handleDelete = (deletedId) => {
    dispatch({ type: "DELETE_CHECKLIST", payload: deletedId });
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
    </div>
  );
}
