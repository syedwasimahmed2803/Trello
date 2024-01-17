import Box from "@mui/material/Box";
import { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";
import { showCheckItems, updateCheckItemState } from "../API";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/CheckItemSLice";

export default function CheckItem({ id, cardId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.checkItem.checkItemsData);
  const fetchData = async () => {
    try {
      const checkItemsData = await showCheckItems(id);
      dispatch(checkItemActions.getCheckItem({ checkItemsData, id }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (deletedId) => {
    dispatch(checkItemActions.deleteCheckItem(deletedId));
  };
  const handleChange = async (id, cardId, state) => {
    try {
      const checkItemsData = await updateCheckItemState(cardId, id, state);
      dispatch(checkItemActions.updatecheckItem({ id, checkItemsData }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Box>
        {data.map((unit) =>
          unit.data.map((item) => {
            console.log(item.name);
            if (item.idChecklist === id) {
              return (
                <div key={item.id} style={{ display: "flex" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          item.state === "complete" ? true : false
                        }
                        onChange={() => {
                          handleChange(item.id, cardId, item.state);
                        }}
                      />
                    }
                    label={item.name}
                  />
                  <DeleteButton
                    type="checkItem"
                    id={id}
                    checkId={item.id}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              );
            }
          })
        )}
      </Box>
      <CreateCheckItem id={id} />
    </>
  );
}
