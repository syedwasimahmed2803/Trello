import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TOKEN, API_KEY } from "./config";
import CreateLists from "./CreateLists";

function Lists() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const URL = `https://api.trello.com/1/boards/${id}/lists?key=${API_KEY}&token=${TOKEN}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <CreateLists />
    </div>
  );
}

export default Lists;
