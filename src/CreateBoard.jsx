import { API_KEY, TOKEN } from "./config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const CreateBoard = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `https://api.trello.com/1/boards/?name=${input}&key=${API_KEY}&token=${TOKEN}`;
    const fetchData = async () => {
      try {
        const response = await axios.post(URL);
        console.log(response);
        if (response.status === 200) {
          const data = await response.data;
          console.log(data);
          navigate(`/boards/${data.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    await fetchData();
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBoard;
