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
import React, { useEffect, useState } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";

export default function EditValueSubject({
  openEdit,
  onCloseEdit,
  subject,
  text,
  value,
  type,
  overview,
  setOverview,
}) {
  const [valueSub, setValueSub] = useState("");
  function changeHandler() {
    console.log(overview);
    const newOverview = overview.map((item) => {
      if (item.value == value) {
        return { ...item, value: valueSub };
      } else {
        return item;
      }
    });
    onCloseEdit();
    setOverview(newOverview);
  }

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
          {type} {subject}
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
          <TextField
            defaultValue={value}
            label="New value"
            onChange={(e) => setValueSub(e.target.value)}
          />
        </Stack>
        <Button
          sx={{ mt: 4, fontWeight: "bold" }}
          size="large"
          onClick={changeHandler}
        >
          Save
        </Button>
      </DialogContent>
      <Divider />
    </Dialog>
  );
}
