import Button from "@mui/material/Button";
import axios from "axios";
import { API_KEY, TOKEN } from "./config";

const DeleteListButton = ({ listId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed?&key=${API_KEY}&token=${TOKEN}`,
        { value: true }
      );
      onDelete(listId);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteListButton;
