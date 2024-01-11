import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateLists from "../CreateComponents/CreateLists";
import DeleteButton from "../CreateComponents/CreateButton";
import { useNavigate } from "react-router-dom";
import { List } from "react-content-loader";

import Cards from "./Cards";
import { showLists } from "../API";
function Lists() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await showLists(id);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate(`/error`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleListCreated = (newData) => {
    setData((prevList) => [...prevList, newData]);
  };

  const handleDelete = (deletedId) => {
    setData((prevList) => prevList.filter((item) => item.id !== deletedId));
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        marginTop: "15vh",
        marginLeft: "2vw",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", alignItems: "start" }}>
        {data.length ? (
          data.map((item) => (
            <div
              key={item.id}
              style={{
                width: "20rem",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow:
                  "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ marginRight: "1rem", fontWeight: 600 }}>
                  {item.name}
                </span>
                <DeleteButton
                  type="list"
                  id={item.id}
                  onDelete={handleDelete}
                />
              </div>
              <div>
                <Cards id={item.id} />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <List />
            <List />
            <List />
            <List />
          </div>
        )}
        <CreateLists id={id} onListCreated={handleListCreated} />
      </div>
    </div>
  );
}

export default Lists;
