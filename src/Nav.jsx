import CreateModal from "./CreateModal";
import AppsIcon from "@mui/icons-material/Apps";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import "./Nav.css";
const Nav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2vh",
        margin: "0",
        boxShadow: "2px 2px 5px rgba(5, 5, 5, 0.2)",
      }}
    >
      <div className="heading">
        <div style={{ display: "flex", marginLeft: "7vw" }}>
          <AppsIcon style={{ marginTop: "1.5vh" }} />
          <HomeIcon style={{ marginTop: "1.5vh" }} />
        </div>
      </div>
      <div style={{ marginTop: "1.5vh" }}>
        <CreateModal />
      </div>
    </Box>
  );
};

export default Nav;
