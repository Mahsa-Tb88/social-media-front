import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";

export default function EditAbout({
  openEdit,
  onCloseEdit,
  subject,
  text,
  value,
  handleClose,
}) {
  return (
    <Dialog open={openEdit} onClose={onCloseEdit} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Edit {subject}
        </Typography>
        <MyIconButton onClick={onCloseEdit}>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack>
          <Typography sx={{ fontSize: 18, fontWeight: "bold", mb: 2 }}>
            {text}
          </Typography>
          <TextField defaultValue={value} label="New value" />
        </Stack>
        <Button sx={{ mt: 4, fontWeight: "bold" }} size="large">
          Save
        </Button>
      </DialogContent>
      <Divider />
    </Dialog>
  );
}
