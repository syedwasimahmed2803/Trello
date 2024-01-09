import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TOKEN, API_KEY } from "./config";
import CreateLists from "./CreateLists";
// import CreateCards from "./CreateCards";
import DeleteListButton from "./DeleteListButton";
import Cards from "./Cards";
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
  }, [id]);
  const handleListCreated = () => {
    fetchData();
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
        {data.map((item) => (
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
              <span style={{ marginRight: "1rem" }}>{item.name}</span>
              <DeleteListButton listId={item.id} onDelete={handleDelete} />
            </div>
            <div>
              <Cards id={item.id} />
            </div>
          </div>
        ))}
      </div>
      <CreateLists id={id} onListCreated={handleListCreated} />
    </div>
  );
}

export default Lists;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { TOKEN, API_KEY } from "./config";
// import CreateLists from "./CreateLists";
// import CreateCards from "./CreateCards";
// function Lists() {
//   const [data, setData] = useState([]);
//   const { id } = useParams();
//   const URL = `https://api.trello.com/1/boards/${id}/lists?key=${API_KEY}&token=${TOKEN}`;
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(URL);
//       const data = await response.data;
//       setData(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "2rem",
//         marginTop: "10vh",
//         marginLeft: "2vw",
//         width: "100vw",
//       }}
//     >
//       <div style={{ display: "flex", gap: "2rem" }}>
//         {data.map((item) => (
//           <div style={{ width: "20rem" }} key={item.id}>
//             {item.name}
//             <CreateCards />
//           </div>
//         ))}
//       </div>
//       <CreateLists id={id} />
//     </div>
//   );
// }

// export default Lists;
