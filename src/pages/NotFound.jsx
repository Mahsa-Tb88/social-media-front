import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ borderRadius: 2, px: 4, py: 1 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}
