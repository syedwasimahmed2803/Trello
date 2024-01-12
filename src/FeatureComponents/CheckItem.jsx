import Box from "@mui/material/Box";
import { useEffect, useReducer } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteButton from "../CreateComponents/CreateButton";
import CreateCheckItem from "../CreateComponents/CreateCheckItem";
import { showCheckItems, updateCheckItemState } from "../API";

const initialState = {
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload };
    case "ADD_CHECKITEM":
      return { ...state, data: [...state.data, action.payload] };
    case "DELETE_CHECKITEM":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function CheckItem({ id, cardId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data } = state;
  const fetchData = async () => {
    try {
      const data = await showCheckItems(id);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleCheckItemCreated = (newData) => {
    dispatch({ type: "ADD_CHECKITEM", payload: newData });
  };
  const handleDelete = (deletedId) => {
    dispatch({ type: "DELETE_CHECKITEM", payload: deletedId });
  };
  // const handleChange = async (id, cardId, state) => {
  //   try {
  //     await updateCheckItemState(cardId, id, state, setData);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  return (
    <div>
      <Box>
        {data.map((item) => (
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
                    defaultChecked={item.state === "complete" ? true : false}
                    // onChange={() => handleChange(item.id, cardId, item.state)}
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
      <CreateCheckItem id={id} onCheckItemCreated={handleCheckItemCreated} />
    </div>
  );
}
