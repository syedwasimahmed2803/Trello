import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Modal from "@mui/material/Modal";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateChecklist from "../CreateComponents/CreateChecklist";
import CheckItem from "./CheckItem";
import { showChecklists } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checklistActions } from "../store/CheckListSlice";
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

export default function Checklists({ id }) {
  const dispatch = useDispatch();
  const checklist = useSelector((state) => state.checkList.checklist);
  const open = useSelector((state) => state.checkList.open);

  const handleOpen = () => {
    dispatch(checklistActions.toggleModal());
    fetchData();
  };
  const handleClose = () => {
    dispatch(checklistActions.toggleModal());
  };

  const fetchData = async () => {
    try {
      const data = await showChecklists(id);
      dispatch(checklistActions.getCheckListData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (data) => {
    dispatch(checklistActions.deleteCheckList(data));
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
          {checklist.map((item) => (
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
                    <CheckItem id={item.id} cardId={id} key={item.id} />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
          <CreateChecklist id={id} />
        </Box>
      </Modal>
    </div>
  );
}
