import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";
import { showCheckItems, updateCheckItemState } from "../API";
import { checklistItemActions } from "../store/CheckListItemSlice";
import { useEffect } from "react";
export default function CheckItem({ id, cardId }) {
  const dispatch = useDispatch();
  const checklistitem = useSelector(
    (state) => state.checkListItem.checklistitem
  );
  const fetchData = async () => {
    try {
      const data = await showCheckItems(id);
      dispatch(checklistItemActions.getCheckListItemData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (deletedId) => {
    dispatch(checklistItemActions.deleteCheckListItem(deletedId));
  };
  const handleChange = async (checkItemId, checkItemState) => {
    console.log("Handling change:", checkItemId, checkItemState);
    try {
      const updatedState = await updateCheckItemState(
        cardId,
        checkItemId,
        checkItemState
      );
      console.log(updatedState);
      dispatch(
        checklistItemActions.updateCheckItem({ checkItemId, updatedState })
      );
    } catch (error) {
      console.error("Error updating item state:", error);
    }
  };

  return (
    <div>
      <Box>
        {checklistitem.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "1rem",
              backgroundColor: "rgb(242, 242, 242)",
              marginBottom: "0.5rem",
            }}
          >
            <FormGroup
              sx={{
                marginRight: "auto",
                marginLeft: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={item.state === "complete"}
                    onChange={() => handleChange(item.id, item.state)}
                  />
                }
                label={item.name}
              />
            </FormGroup>
            <DeleteButton
              type="checkItem"
              id={id}
              checkId={item.id}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </Box>
      <CreateCheckItem id={id} key={id} />
    </div>
  );
}
