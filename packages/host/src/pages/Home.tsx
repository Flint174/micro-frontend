import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box component="main">
      <Link to="profiles">To Profiles</Link>
    </Box>
  );
}

export default Home;
