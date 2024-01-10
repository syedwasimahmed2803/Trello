import CreateModal from "./CreateComponents/CreateModal";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "fixed",
        top: "0",
        width: "100%",
        padding: "2vh",
        margin: "0",
        boxShadow: "2px 2px 5px rgba(5, 5, 5, 0.2)",
      }}
    >
      <div className="heading">
        <div style={{ display: "flex", marginLeft: "7rem" }}>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <HomeIcon style={{ marginTop: "1.5vh" }} />
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "1.5vh", marginRight: "3.5vw" }}>
        <CreateModal />
      </div>
    </Box>
  );
};

export default Nav;
