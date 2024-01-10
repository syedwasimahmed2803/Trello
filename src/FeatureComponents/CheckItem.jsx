import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { API_KEY, TOKEN } from "../config";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import DeleteCheckItem from "../laidoffcomponents/DeleteCheckItem";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";

export default function CheckItem({ id, cardId }) {
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
  const handleCheckItemCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };
  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
  };
  const handleChange = async (id, cardId, state) => {
    console.log(id);
    console.log(cardId);
    const newState = state === "complete" ? "incomplete" : "complete";
    const URL = `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?state=${newState}&key=${API_KEY}&token=${TOKEN}`;
    const response = await axios.put(URL);

    //   console.log(response);
    setData((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, state: newState } : item
      )
    );
    return response;
  };

  return (
    <div>
      <Box>
        {data.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <FormGroup sx={{ marginRight: "auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={item.state === "complete" ? true : false}
                    onChange={() => handleChange(item.id, cardId, item.state)}
                  />
                }
                label={item.name}
              />
            </FormGroup>
            {/* <DeleteCheckItem
              id={id}
              checkId={item.id}
              onDelete={handleDelete}
            /> */}
            <DeleteButton
              type="checkItem"
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
