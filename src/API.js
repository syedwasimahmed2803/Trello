import axios from "axios";
import { API_KEY, TOKEN } from "./config";

axios.defaults.baseURL = "https://api.trello.com/1/";
axios.defaults.params = {
  key: API_KEY,
  token: TOKEN,
};

const showBoards = async () => {
  try {
    const response = await axios.get("members/me/boards");
    return response.data;
  } catch (error) {
    console.error("Error getting boards:", error.message);
    throw error;
  }
};

const showLists = async (id) => {
  try {
    const response = await axios.get(`boards/${id}/lists`);
    return response.data;
  } catch (error) {
    console.error("Error getting lists for board:", error.message);
    throw error;
  }
};

const showCards = async (id) => {
  try {
    const response = await axios.get(`lists/${id}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error getting cards for list:", error.message);
    throw error;
  }
};
const showChecklists = async (id) => {
  try {
    const response = await axios.get(`cards/${id}/checklists`);
    return response.data;
  } catch (error) {
    console.error("Error getting checklists for card:", error.message);
    throw error;
  }
};
const showCheckItems = async (id) => {
  try {
    const response = await axios.get(`checklists/${id}/checkItems`);
    return response.data;
  } catch (error) {
    console.error("Error getting check items for checklist:", error.message);
    throw error;
  }
};

const createBoard = async (input) => {
  try {
    const response = await axios.post("boards", {
      name: input,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new Board:", error.message);
    throw error;
  }
};

const createList = async (id, input) => {
  try {
    const response = await axios.post("lists", {
      name: input,
      idBoard: id,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new list:", error.message);
    throw error;
  }
};
const createCard = async (id, input) => {
  try {
    const response = await axios.post("cards", {
      idList: id,
      name: input,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating card:", error);
    throw error;
  }
};

const createChecklist = async (id, input) => {
  try {
    const response = await axios.post("checklists", {
      idCard: id,
      name: input,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating checklist:", error);
    throw error;
  }
};

const createCheckItem = async (id, input) => {
  try {
    const response = await axios.post(`checklists/${id}/checkItems`, {
      name: input,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating check item:", error);
    throw error;
  }
};

const deleteItem = async (type, id, checkId, onDelete) => {
  try {
    let url = "";
    let method = "DELETE";
    let itemId = "";

    if (type === "card") {
      url = `cards/${id}`;
      itemId = id;
    } else if (type === "checklist") {
      url = `checklists/${id}`;
      itemId = id;
    } else if (type === "checkItem") {
      url = `checklists/${id}/checkItems/${checkId}`;
      itemId = checkId;
    } else if (type === "list") {
      url = `lists/${id}/closed?value=true`;
      method = "PUT";
      itemId = id;
    } else {
      console.error("Invalid type");
      return;
    }

    await axios({ method, url });
    onDelete(itemId);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
const updateCheckItemState = async (cardId, id, currentState) => {
  try {
    const newState = currentState === "complete" ? "incomplete" : "complete";

    await axios.put(`cards/${cardId}/checkItem/${id}`, {
      state: newState,
    });

    return newState;
  } catch (error) {
    console.error("Error updating check item state:", error);
    throw error;
  }
};

export {
  showBoards,
  showCards,
  showLists,
  showChecklists,
  showCheckItems,
  createBoard,
  createList,
  createCard,
  createChecklist,
  createCheckItem,
  updateCheckItemState,
  deleteItem,
};
