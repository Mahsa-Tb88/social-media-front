import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyIconButton from "../../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";

export default function EditValueSubject({
  openEdit,
  onCloseEdit,
  subject,
  text,
  value,
  type,
  list,
  setList,
}) {
  const [valueSub, setValueSub] = useState(value);

  function saveChangeHandler() {
    const newList = list.map((item) => {
      if (item.value == value && item.subject == subject) {
        return { ...item, value: valueSub };
      } else {
        return item;
      }
    });
    onCloseEdit();
    setList(newList);
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
        {subject == "Status" ? (
          <Stack>
            <FormControl>
              <InputLabel id="status">Status</InputLabel>
              <Select
                value={valueSub}
                label={valueSub}
                labelId="status"
                defaultValue={valueSub}
                onChange={(e) => setValueSub(e.target.value)}
              >
                <MenuItem value="Marrid">Marrid</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="In relationship">In relationship</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        ) : (
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
        )}
        <Button
          sx={{ mt: 4, fontWeight: "bold" }}
          size="large"
          onClick={saveChangeHandler}
        >
          Save
        </Button>
      </DialogContent>
      <Divider />
    </Dialog>
  );
}
