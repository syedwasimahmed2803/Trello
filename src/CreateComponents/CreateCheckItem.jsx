import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createCheckItem } from "../API";

function CreateCheckItem({ id, onCheckItemCreated }) {
  const [input, setInput] = useState("");

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const data = await createCheckItem(id, input);
        onCheckItemCreated(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setInput("");
    await fetchData();
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        id="outlined-basic"
        value={input}
        label="Enter a title for this checkitem..."
        variant="outlined"
        onChange={(e) => setInput(e.target.value)}
        sx={{ marginRight: "auto" }}
      />
      <Button onClick={handleChange} variant="contained">
        Add Item
      </Button>
    </Box>
  );
}

export default CreateCheckItem;
