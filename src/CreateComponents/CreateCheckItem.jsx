import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useReducer } from "react";
import { createCheckItem } from "../API";

const initialState = {
  input: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "RESET_INPUT":
      return { ...state, input: "" };
    default:
      return state;
  }
};

function CreateCheckItem({ id, onCheckItemCreated }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { input } = state;

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCheckItem(id, input);
        onCheckItemCreated(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    dispatch({ type: "RESET_INPUT" });
    await fetchData();
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        id="outlined-basic"
        value={input}
        label="Enter a title for this checkitem..."
        variant="outlined"
        onChange={(e) =>
          dispatch({ type: "SET_INPUT", payload: e.target.value })
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
