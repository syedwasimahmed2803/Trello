import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API_KEY, TOKEN } from "./config";
import { useState } from "react";
import axios from "axios";

function CreateCheckItem({ id, onCheckItemCreated }) {
  const [input, setInput] = useState("");
  const URL = `https://api.trello.com/1/checklists/${id}/checkItems?name=${input}&key=${API_KEY}&token=${TOKEN}`;

  const handleChange = async () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(URL);
        console.log(response);
        if (response.status === 200) {
          const data = await response.data;
          console.log(data);
          onCheckItemCreated();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setInput("");
    await fetchData();
  };
  return (
    <Box sx={{ display: "flex" }}>
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
