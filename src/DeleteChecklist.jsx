import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_KEY, TOKEN } from "./config";

function DeleteChecklist({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${id}?key=${API_KEY}&token=${TOKEN}`
      );
      onDelete(id);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };
  return <DeleteIcon onClick={handleDelete} />;
}

export default DeleteChecklist;
