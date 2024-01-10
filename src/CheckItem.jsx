import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { API_KEY, TOKEN } from "./config";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteCheckItem from "./DeleteCheckItem";
import CreateCheckItem from "./CreateCheckItem";

export default function CheckItem({ id }) {
  console.log(id);
  const [data, setData] = useState([]);
  const URL = `https://api.trello.com/1/checklists/${id}/checkItems?key=${API_KEY}&token=${TOKEN}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      //   console.log(response);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleCheckItemCreated = () => {
    fetchData();
  };
  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
  };

  return (
    <div>
      <Box>
        {data.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <FormGroup sx={{ marginRight: "auto" }}>
              <FormControlLabel control={<Checkbox />} label={item.name} />
            </FormGroup>
            <DeleteCheckItem
              id={id}
              checkId={item.id}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </Box>
      <CreateCheckItem id={id} onCheckItemCreated={handleCheckItemCreated} />
    </div>
  );
}
