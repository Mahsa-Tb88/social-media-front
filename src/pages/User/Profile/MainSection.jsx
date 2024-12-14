import { Box, Button, Container, Paper, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";

export default function MainSection() {
  const theme = useSelector((state) => state.app.theme);
  const profile = useSelector((state) => state.user.profile);
  return (
    <Container>
      <Paper>
        <Stack sx={{ flexDirection: "row" }}>
          <Box
            component="img"
            src={profile.profileImg ? profile.profileImg : noImage}
            sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <Box
            sx={{
              bgcolor: theme === "dark" ? "grey.800" : "grey.200",
              borderRadius: "10%",
            }}
          >
            What's on your mind?
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
