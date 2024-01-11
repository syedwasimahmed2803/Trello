import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem } from "../API";

const DeleteButton = ({ type, id, checkId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteItem(type, id, checkId, onDelete);
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
