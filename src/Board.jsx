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
            minHeight: 120,
            width: 250,
            display: "flex",
            backgroundSize: "cover",
            backgroundImage: `url(${prefs.backgroundImage})`,
            backgroundColor: `${prefs.backgroundColor}`,
          }}
        >
          <CardContent>
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
