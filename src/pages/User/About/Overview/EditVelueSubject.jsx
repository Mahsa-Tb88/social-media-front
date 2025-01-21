import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MyIconButton from "../../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export default function EditValueSubject({
  openEdit,
  onCloseEdit,
  subject,
  value = "",
  list,
  setList,
  type = "new",
}) {
  const [newValue, setNewValue] = useState(value);

  function saveChangeHandler() {
    let newList;
    console.log("list", list);
    console.log("value", value);
    console.log("subject", subject);

    if (
      subject == "Hometown" ||
      subject == "Current city" ||
      subject == "used to live"
    ) {
      newList = list.map((item) => {
        if ( item.city == value && item.status == subject) {
          return { ...item, city: newValue };
        } else {
          return item;
        }
      });
    } else {
      newList = list.map((item) => {
        if (item.value == value && item.subject == subject) {
          return { ...item, value: newValue };
        } else {
          return item;
        }
      });
    }

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
          {type == "new" ? "Add" + " " + subject : "Edit" + " " + subject}
        </Typography>
        <MyIconButton onClick={onCloseEdit}>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {subject == "Work" || subject == "Education" ? (
          <WorkEducationEditValue
            value={value}
            setList={setList}
            list={list}
            onCloseEdit={onCloseEdit}
            type={type}
          />
        ) : subject == "Status" ? (
          <Stack>
            <FormControl>
              <InputLabel id="status">Status</InputLabel>
              <Select
                value={newValue}
                label={newValue}
                labelId="status"
                defaultValue={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              >
                <MenuItem value="Marrid">Marrid</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="In relationship">In relationship</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        ) : (
          <Stack>
            <TextField
              defaultValue={value}
              label="New value"
              onChange={(e) => setNewValue(e.target.value)}
              sx={{ mt: 5 }}
            />
            <Button
              sx={{ mt: 4, fontWeight: "bold" }}
              size="large"
              onClick={saveChangeHandler}
            >
              Save
            </Button>
          </Stack>
        )}
      </DialogContent>
      <Divider />
    </Dialog>
  );
}

function WorkEducationEditValue({ value, setList, list, onCloseEdit, type }) {
  const [currentPosition, setCurrentPosition] = useState(!value.to);
  console.log(value);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      position: value.position,
      company: value.company,
      city: value.city,
      from: value.from,
      to: value.to,
    },
  });

  function onSubmit(data) {
    onCloseEdit();
    if (type == "new") {
      data._id = 6;
      data.viewr = "public";
      setList([...list, data]);
    } else {
      const newList = list.filter((l) => l._id != value._id);
      data._id = value._id;
      setList([...newList, data]);
    }
  }

  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Position
        </Typography>
        <TextField
          size="small"
          defaultValue={value.position}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("position")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Company
        </Typography>
        <TextField
          size="small"
          defaultValue={value.place}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("company")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          City
        </Typography>
        <TextField
          size="small"
          defaultValue={value.city}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("city")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>Year</Typography>
        <Stack>
          {
            <FormControlLabel
              control={<Checkbox />}
              checked={currentPosition}
              label="I am currently work here"
              onChange={() => setCurrentPosition(!currentPosition)}
              sx={{ mb: 1 }}
            />
          }
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <TextField
              label="From"
              type="number"
              // value={value.from}
              defaultValue={value.from}
              // onChange={handleChange}
              inputProps={{ min: "1900", max: "2099", step: "1" }} // restrict the range of years
              fullWidth
              {...register("from")}
            />
            {!currentPosition && (
              <TextField
                label="To"
                type="number"
                value={value.to}
                // onChange={handleChange}
                inputProps={{ min: "1900", max: "2099", step: "1" }} // restrict the range of years
                fullWidth
                {...register("to")}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      <Button type="submit" size="large">
        Save
      </Button>
    </Stack>
  );
}
