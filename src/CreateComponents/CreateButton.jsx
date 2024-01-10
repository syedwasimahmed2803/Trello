import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_KEY, TOKEN } from "../config";

const DeleteButton = ({ type, id, checkId, onDelete }) => {
  const handleDelete = async () => {
    try {
      let url = "";
      let method = "DELETE";
      let itemId = "";

      switch (type) {
        case "card":
          url = `https://api.trello.com/1/cards/${id}?key=${API_KEY}&token=${TOKEN}`;
          itemId = id;
          break;
        case "checklist":
          url = `https://api.trello.com/1/checklists/${id}?key=${API_KEY}&token=${TOKEN}`;
          itemId = id;
          break;
        case "checkItem":
          url = `https://api.trello.com/1/checklists/${id}/checkItems/${checkId}?key=${API_KEY}&token=${TOKEN}`;
          itemId = checkId;
          break;
        case "list":
          // Use PUT request to close the list
          url = `https://api.trello.com/1/lists/${id}/closed?value=true&key=${API_KEY}&token=${TOKEN}`;

          method = "PUT";
          itemId = id;
          break;
        default:
          console.error("Invalid type");
          return;
      }

      await axios({ method, url });
      onDelete(itemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      {type === "list" ? (
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      ) : (
        <Button color="error" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      )}
    </>
  );
};

export default DeleteButton;
