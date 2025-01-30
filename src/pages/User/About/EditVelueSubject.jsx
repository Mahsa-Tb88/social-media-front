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
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useEditContactBaseInfo,
  useEditOverview,
} from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";

export default function EditValueSubject({
  openEdit,
  onCloseEdit,
  subject,
  value = "",
  type = "new",
  title,
}) {
  const [newValue, setNewValue] = useState(value);
  const user = useSelector((state) => state.user.profile);

  const querryClient = useQueryClient();
  const mutationOverview = useEditOverview();
  const mutationContactBaseInfo = useEditContactBaseInfo();

  function saveChangeHandler() {
    if (title == "overview") {
      const data = {
        subject,
        value: newValue,
        viewer: "friends",
        id: user._id,
      };
      console.log("newvalue", newValue);
      mutationOverview.mutate(data, {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["overview"],
          });
        },
        onError(error) {
          console, log(error);
        },
      });
    }

    if (title == "contactBaseInfo") {
      const data = {
        subject,
        value: newValue,
        viewer: "friends",
        id: user._id,
      };
      console.log("datais", data);
      mutationContactBaseInfo.mutate(data, {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["contactBaseInfo"],
          });
        },
        onError(error) {
          console.log("error is ", error);
        },
      });
    }

    onCloseEdit();
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
        {subject == "Family" ? (
          <FamilyMember
            value={value}
            list={list}
            setList={setList}
            type={type}
            onCloseEdit={onCloseEdit}
          />
        ) : subject == "Work" || subject == "Education" ? (
          <WorkEducationEditValue
            value={value}
            setList={setList}
            list={list}
            onCloseEdit={onCloseEdit}
            type={type}
          />
        ) : subject == "Status" ? (
          <Status
            newValue={newValue}
            setNewValue={setNewValue}
            saveChangeHandler={saveChangeHandler}
          />
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
      data.id = Date.now();
      data.viewr = "public";
      console.log("rrrrrrrrrrr", [...list, data]);
      setList([...list, data]);
    } else {
      const newList = list.filter((l) => l.id != value.id);
      data.id = value.id;
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
              defaultValue={value.from}
              fullWidth
              {...register("from")}
            />
            {!currentPosition && (
              <TextField
                label="To"
                type="number"
                value={value.to}
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

function FamilyMember({ value, list, setList, type, onCloseEdit }) {
  function findFamilyMember() {
    "from backend and setUser from backed";
  }
  console.log("value", value);
  const [relation, setRelation] = useState("");
  const [status, setStatus] = useState(value.status);
  const [user, setUser] = useState(value);

  function saveHandler() {
    let newList;
    if (type == "new") {
      // newList = user;
      newList = {
        username: "Hossein88",
        img: "noImage",
        status: "Married",
        viewer: "public",
        id: 450,
      };
      setList([...list, newList]);
    } else {
      newList = list.map((l) => {
        if (l.username == value.username) {
          return {
            username: user.username,
            id: user.id,
            img: user.img,
            viewer: l.viewer,
          };
        } else {
          return l;
        }
      });
      setList(newList);
      onCloseEdit();
    }
  }
  return (
    <Stack spacing={3}>
      <TextField
        size="small"
        placeholder={"Serach username"}
        // label={title == "Family" ? "Family" : "Person"}
        onChange={findFamilyMember}
        defaultValue={type == "edit" ? value.username : ""}
      />
      {subject == "Family" ? (
        <FormControl fullWidth>
          <InputLabel id="relation">Relationship</InputLabel>
          <Select
            id="relation"
            value={relation}
            label="Relationship"
            onChange={(e) => setRelation(e.target.value)}
          >
            <MenuItem value={"Mother"}>Mother</MenuItem>
            <MenuItem value={"Father"}>Father</MenuItem>
            <MenuItem value={"Sister"}>Sister</MenuItem>
            <MenuItem value={"Brother"}>Brother</MenuItem>
            <MenuItem value={"Cousin"}>Cousin</MenuItem>
            <MenuItem value={"Aunt"}>Aunt</MenuItem>
            <MenuItem value={"Uncle"}>Uncle</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            id="status"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"Marrid"}>Marrid</MenuItem>
            <MenuItem value={"In realtionship"}>In relationship</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button size="large" sx={{}} onClick={saveHandler}>
        Save
      </Button>
    </Stack>
  );
}

function Status({ newValue, setNewValue, saveChangeHandler }) {
  return (
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
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="In relationship">In relationship</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{ mt: 4, fontWeight: "bold" }}
        size="large"
        onClick={saveChangeHandler}
      >
        Save
      </Button>
    </Stack>
  );
}
