import { Dialog } from "@mui/material";
import React from "react";

export default function FilterViewer({ open, onClose, setViewer }) {
  return (
    <Dialog open={open} onClose={onClose}>
      FilterViewer
    </Dialog>
  );
}
