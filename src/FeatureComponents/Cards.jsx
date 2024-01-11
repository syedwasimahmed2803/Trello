import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import CreateCards from "../CreateComponents/CreateCards";
import DeleteButton from "../CreateComponents/CreateButton";
import Checklists from "./Checklists";
import { showCards } from "../API";
function Cards({ id }) {
  console.log(id);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await showCards(id);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
