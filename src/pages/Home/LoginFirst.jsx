/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LoginFirst({ open, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme((state) => state.app.theme);
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <Typography>You need to log in to view comments.</Typography>
      </DialogContent>
      <DialogActions
        sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}
      >
        <Button
          size="small"
          onClick={() => onClose(false)}
          sx={{
            bgcolor: theme === "dark" ? "grey.600" : "grey.300",
            color: theme === "dark" ? "grey.300" : "grey.800",
            "&:hover": {bgcolor:theme === "dark" ? "grey.700" : "grey.400"},
          }}
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          color="primary"
          size="small"
          disableElevation
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
