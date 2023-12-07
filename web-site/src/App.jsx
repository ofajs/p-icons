import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "./Copyright";
import IconList from "./icon-list";

export default function App() {
  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          P-ICONS
        </Typography>
        <IconList />
        <Copyright />
      </Box>
    </Container>
  );
}
