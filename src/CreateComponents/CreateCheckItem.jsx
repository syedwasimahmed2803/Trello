import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCheckItem } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checklistItemActions } from "../store/CheckListItemSlice";
function CreateCheckItem({ id, cardId }) {
  const dispatch = useDispatch();
  const checklistitem = useSelector(
    (state) => state.checklistitem.checkListItemNames[cardId] || ""
  );

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCheckItem(id, checklistitem);
        dispatch(checklistItemActions.createCheckListItem(data));
        dispatch(checklistItemActions.resetCheckListItemName());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    await fetchData();
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        id="outlined-basic"
        value={checklistitem}
        label="Enter a title for this check item..."
        variant="outlined"
        onChange={(e) =>
          dispatch(
            checklistItemActions.setCheckListItemName({
              key: cardId,
              value: e.target.value,
            })
          )
        }
        sx={{ marginRight: "auto" }}
      />
      <Button onClick={handleChange} variant="contained">
        Add Item
      </Button>
    </Box>
  );
}

export default CreateCheckItem;
