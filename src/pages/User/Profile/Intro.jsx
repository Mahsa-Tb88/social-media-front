import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Intro() {
  const theme = useSelector((state) => state.app.theme);
  return (
    <Paper sx={{ p: 2 }}>
      <Typography component="h6" variant="h6" sx={{ mb: 3 }}>
        Intro
      </Typography>
      <Stack>
        <Typography sx={{ fontWeight: "bold" }}>bio anan ananan</Typography>
        <Button
          disableElevation
          sx={{
            bgcolor: theme == "light" ? "grey.200" : "grey.800",
            color: theme == "light" ? "grey.800" : "grey.200",
            mt: 2,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Edit bio
        </Button>
      </Stack>
      <Stack sx={{ mt: 4 }} spacing={2}>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <AssignmentIndIcon
            sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
          />
          <Typography>Her</Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <SchoolIcon
            sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
          />
          <Typography>Studied at </Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <HomeIcon
            sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
          />
          <Typography>Lives in</Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <LocationOnIcon
            sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
          />
          <Typography>From</Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <FavoriteIcon
            sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
          />
          <Typography>Married to</Typography>
        </Stack>
        <Button
          disableElevation
          sx={{
            bgcolor: theme == "light" ? "grey.200" : "grey.800",
            color: theme == "light" ? "grey.800" : "grey.200",
            mt: 2,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Edit details
        </Button>
      </Stack>
    </Paper>
  );
}
