import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect } from "react";
import CreateCards from "../CreateComponents/CreateCards";
import DeleteButton from "../CreateComponents/CreateButton";
import Checklists from "./Checklists";
import { showCards } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/CardSlice"; // Update import statement

function Cards({ id }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cards.cardsData);

  const fetchData = async () => {
    try {
      const cardsData = await showCards(id);
      dispatch(cardActions.getCard({ id, cardsData })); // Update action payload
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = (deletedId) => {
    dispatch(cardActions.deleteCard(deletedId));
  };

  return (
    <>
      <List
        sx={{
          maxHeight: "55vh",
          overflowY: "auto",
        }}
      >
        {data[id] &&
          data[id].data.map((item) => (
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
                <DeleteButton
                  type="card"
                  id={item.id}
                  onDelete={() => handleDelete(item.id)}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <CreateCards id={id} />
    </>
  );
}

export default Cards;
