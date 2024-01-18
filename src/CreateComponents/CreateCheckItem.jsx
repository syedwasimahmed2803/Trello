import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCheckItem } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/CheckItemSLice";

function CreateCheckItem({ id }) {
  const dispatch = useDispatch();
  const newCheckItemName = useSelector(
    (state) => state.checkItem.newCheckItemName[id] || ""
  );

  const handleChange = async () => {
    try {
      const data = await createCheckItem(id, newCheckItemName);
      dispatch(
        checkItemActions.createCheckItem({
          newCheckItem: data,
          checklistId: id,
        })
      );
      dispatch(checkItemActions.resetCheckItemName());
    } catch (error) {
      console.error("Error creating check item:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        id="outlined-basic"
        value={newCheckItemName}
        label="Enter a title for this check item..."
        variant="outlined"
        sx={{ marginRight: "auto" }}
        onChange={(e) => {
          dispatch(
            checkItemActions.setCheckItemName({
              value: e.target.value,
              checklistId: id,
            })
          );
        }}
      />
      <Button onClick={handleChange} variant="contained">
        Add Item
      </Button>
    </Box>
  );
}

export default CreateCheckItem;
