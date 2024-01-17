import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createCheckItem } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/CheckItemSLice";

function CreateCheckItem({ id }) {
  const dispatch = useDispatch();
  const newCheckItemName = useSelector((state) =>
    state.checkItem.newCheckItemName.find((item) => item.id === id)
  );

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCheckItem(id, newCheckItemName.name);
        dispatch(checkItemActions.createCheckItem({ data, id }));
        dispatch(checkItemActions.resetcheckItemName());
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
        value={newCheckItemName ? newCheckItemName.name : ""}
        label="Enter a title for this checkitem..."
        variant="outlined"
        sx={{ marginRight: "auto" }}
        onChange={(e) => {
          dispatch(
            checkItemActions.setcheckItemName({ value: e.target.value, id })
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
