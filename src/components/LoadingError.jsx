import { Refresh } from "@mui/icons-material";
import { Alert, AlertTitle, Button } from "@mui/material";
import React from "react";

export default function LoadingError({
  message,
  handleAction = null,
  actionText = "Try Again",
  actionIcon = <Refresh />,
}) {
  return (
    <Alert
      color="error"
      icon={false}
      sx={{
        width: { xs: "100%", sm: "400px" },
        py:3,
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AlertTitle sx={{ mb: 4, fontSize: 20 }}>{message}</AlertTitle>
      {handleAction && (
        <Button onClick={handleAction} endIcon={actionIcon} variant="contained">
          {actionText}
        </Button>
      )}
    </Alert>
  );
}
