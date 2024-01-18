import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";
import { useDispatch, useSelector } from "react-redux";
import { checkItemActions } from "../store/CheckItemSLice";
import { showCheckItems, updateCheckItemState } from "../API";

export default function CheckItem({ id, cardId }) {
  const dispatch = useDispatch();
  const checkItemsData = useSelector(
    (state) => state.checkItem.checkItems[id]?.data || []
  );

  const fetchData = async () => {
    try {
      const checkItemsData = await showCheckItems(id);
      dispatch(
        checkItemActions.getCheckItem({ checklistId: id, checkItemsData })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (checkItemId) => {
    dispatch(
      checkItemActions.deleteCheckItem({ checklistId: id, checkItemId })
    );
  };

  const handleChange = async (checkItemId, state) => {
    try {
      const updatedCheckItem = await updateCheckItemState(
        cardId,
        checkItemId,
        state
      );
      dispatch(
        checkItemActions.updateCheckItem({
          checklistId: id,
          checkItemId,
          updatedCheckItem,
        })
      );
    } catch (error) {
      console.error("Error updating check item state:", error);
    }
  };

  return (
    <>
      <Box>
        {checkItemsData.map((item) => {
          if (item.idChecklist === id) {
            return (
              <div key={item.id} style={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={item.state === "complete"}
                      onChange={() => {
                        handleChange(item.id, item.state);
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
        })}
      </Box>
      <CreateCheckItem id={id} />
    </>
  );
}
