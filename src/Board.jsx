import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Board = ({ id, name, prefs }) => {
  return (
    <div style={{ margin: "2vw" }}>
      <Link to={`/boards/${id}`} style={{ textDecoration: "none" }}>
        <Card
          key={id}
          sx={{
            boxShadow:
              "0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)",
            minHeight: 120,
            width: 250,
            display: "flex",
            backgroundSize: "cover",
            backgroundImage: `url(${prefs.backgroundImage})`,
            backgroundColor: `${prefs.backgroundColor}`,
          }}
        >
          <CardContent
            sx={{ backgroundColor: "rgba(0,0,0,0.35)", width: "100%" }}
          >
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Board;
