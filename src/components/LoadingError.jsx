/* eslint-disable react/prop-types */
import { Refresh } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import React from "react";

export default function LoadingError({
  message,
  handleAction = null,
  actionText = "Try Again",
  actionIcon = <Refresh />,
}) {
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <Alert
        color="error"
        icon={false}
        sx={{
          width: { xs: "100%", sm: "300px", md: "90%" },
          py: 3,
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AlertTitle sx={{ mb: 4, fontSize: 20 }}>{message}</AlertTitle>
        {handleAction && (
          <Button
            onClick={handleAction}
            endIcon={actionIcon}
            variant="contained"
          >
            {actionText}
          </Button>
        )}
      </Alert>
    </Stack>
  );
}
