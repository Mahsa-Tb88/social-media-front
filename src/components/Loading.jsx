import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Alert
      color="info"
      sx={{
        width: { xs: "100%", sm: "400px" },
        py: 3,
        minWidth: 320,
        mx: "auto",
        flexDirection: "column",
      }}
      icon={false}
    >
      <AlertTitle sx={{ textAlign: "center", fontSize: 20, mb: 2 }}>
        VibeLink
      </AlertTitle>
      <LinearProgress />
    </Alert>
  );
}
