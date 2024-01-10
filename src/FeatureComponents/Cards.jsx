import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN, API_KEY } from "../config";
import CreateCards from "../CreateComponents/CreateCards";
import DeleteCards from "../laidoffcomponents/DeleteCards";
import DeleteButton from "../CreateComponents/CreateButton";
import Checklists from "./Checklists";
function Cards({ id }) {
  console.log(id);
  const [data, setData] = useState([]);
  const URL = ` https://api.trello.com/1/lists/${id}/cards?key=${API_KEY}&token=${TOKEN}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleCardCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };
  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
  };
  return (
    <>
      <List
        sx={{
          maxHeight: "55vh",
          overflowY: "auto",
        }}
      >
        {data.map((item) => (
          <ListItem
            sx={{
              backgroundColor: "rgb(242, 242, 242)",
              borderRadius: "1rem",
              marginBlock: "0.5rem",
            }}
            key={item.id}
            disablePadding
          >
            <ListItemButton style={{}}>
              <ListItemText
                style={{
                  marginRight: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.name}
                <Checklists id={item.id} />
              </ListItemText>
              {/* <DeleteCards id={item.id} onDelete={handleDelete} /> */}
              <DeleteButton type="card" id={item.id} onDelete={handleDelete} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CreateCards id={id} onCardCreated={handleCardCreated} />
    </>
  );
}
export default Cards;
