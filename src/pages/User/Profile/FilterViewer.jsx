import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import React from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";

export default function FilterViewer({ open, onClose, setViewer }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography sx={{ mr:"auto" }}>Select audience </Typography>
        <MyIconButton>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
