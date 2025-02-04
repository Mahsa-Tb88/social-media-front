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
import React, { useEffect, useState } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useEditContactBaseInfo,
  useEditOverview,
  useAddWork,
  useEditWork,
  useAddEducation,
  useEditEducation,
  useSearchPerson,
} from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditValueSubject({
  openEdit,
  onCloseEdit,
  subject,
  value = "",
  type = "new",
  title,
  id,
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
      mutationOverview.mutate(data, {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["overview"],
          });
        },
        onError(error) {
          console.log(error);
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
          <FamilyMember value={value} type={type} onCloseEdit={onCloseEdit} />
        ) : subject == "Relationship" ? (
          <Relationship value={value} type={type} onCloseEdit={onCloseEdit} />
        ) : subject == "Work" ? (
          <WorkEdit
            value={value}
            onCloseEdit={onCloseEdit}
            type={type}
            id={id}
          />
        ) : subject == "Education" ? (
          <EducationEdit
            value={value}
            onCloseEdit={onCloseEdit}
            type={type}
            id={id}
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

function WorkEdit({ value, onCloseEdit, type, id }) {
  const userId = useParams().id;
  const [currentPosition, setCurrentPosition] = useState(
    value ? value.isCurrently : false
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      position: value.position,
      company: value.company,
      city: value.city,
      startYear: value.startYear,
      endYear: value.endYear,
      isCurrently: value.isCurrently,
    },
  });
  const mutationNewWork = useAddWork();
  const querryClient = useQueryClient();
  const mutationEditWork = useEditWork();

  function onSubmit(data) {
    onCloseEdit();
    if (type == "new") {
      data.id = userId;
      data.isCurrently = currentPosition;
      console.log("data isss", data);
      mutationNewWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["work"],
          });
        },
        onError(error) {
          console.log("error isss", error);
        },
      });
    } else {
      data.userId = userId;
      data.id = id;
      if (currentPosition) {
        data.endYear = 0;
        data.isCurrently = true;
      } else {
        data.isCurrently = false;
      }
      console.log("data submited", currentPosition, data);

      mutationEditWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["work"] });
        },
        onError(error) {
          console.log("error is", error);
        },
      });
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
              defaultValue={value.startYear}
              fullWidth
              {...register("startYear")}
            />

            {!currentPosition && (
              <TextField
                label="To"
                type="number"
                value={value.endYear}
                fullWidth
                {...register("endYear")}
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

function EducationEdit({ value, onCloseEdit, type, id }) {
  const userId = useParams().id;
  const [currentPosition, setCurrentPosition] = useState(
    value ? value.isCurrently : false
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      field: value.field,
      degree: value.degree,
      university: value.university,
      startYear: value.startYear,
      endYear: value.endYear,
      isCurrently: value.isCurrently,
    },
  });
  const mutationNewEducation = useAddEducation();
  const querryClient = useQueryClient();
  const mutationEditEducation = useEditEducation();

  function onSubmit(data) {
    onCloseEdit();
    if (type == "new") {
      data.id = userId;
      data.isCurrently = currentPosition;
      mutationNewEducation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["education"],
          });
        },
        onError(error) {
          console.log("error isss", error);
        },
      });
    } else {
      data.userId = userId;
      data.id = id;
      data.isCurrently = currentPosition;

      mutationEditEducation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["education"] });
        },
        onError(error) {
          console.log("error is", error);
        },
      });
    }
  }
  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Field of study
        </Typography>
        <TextField
          size="small"
          defaultValue={value.position}
          label="New value"
          {...register("field")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Degree
        </Typography>
        <TextField
          size="small"
          defaultValue={value.place}
          label="New value"
          {...register("degree")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          University
        </Typography>
        <TextField
          size="small"
          defaultValue={value.city}
          label="New value"
          {...register("university")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>Year</Typography>
        <Stack>
          {
            <FormControlLabel
              control={<Checkbox />}
              checked={currentPosition}
              label="I am currently studing"
              onChange={() => setCurrentPosition(!currentPosition)}
              sx={{ mb: 1 }}
            />
          }
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <TextField
              label="From"
              type="number"
              defaultValue={value.startYear}
              fullWidth
              {...register("startYear")}
            />

            {!currentPosition && (
              <TextField
                label="To"
                type="number"
                value={value.endYear}
                fullWidth
                {...register("endYear")}
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

function Relationship({ value, type, onCloseEdit }) {
  const [status, setStatus] = useState(value.status);
  const [search, setSearch] = useState("");
  function findPerson() {}
  const mutation = useSearchPerson();
  useEffect(() => {
    const data = { search };
    const timeOut = setTimeout(
      mutation.mutate(data, {
        onSuccess(d) {},
        onError(error) {
          console.log("error is", error);
        },
      }),
      2000
    );
    return () => clearTimeout(timeOut);
  }, [search]);
  function saveHandler() {}
  return (
    <Stack spacing={3}>
      <TextField
        size="small"
        placeholder={"Serach username"}
        defaultValue={type == "edit" ? value.username : ""}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      <Button size="large" sx={{}} onClick={saveHandler}>
        Save
      </Button>
    </Stack>
  );
}

function FamilyMember({ value, type, onCloseEdit }) {
  function findFamilyMember() {
    "from backend and setUser from backed";
  }
  const [relation, setRelation] = useState("");
  const [status, setStatus] = useState(value.status);
  const [user, setUser] = useState(value);

  function saveHandler() {
    let newList;
    if (type == "new") {
      newList = {
        username: "Hossein88",
        img: "noImage",
        status: "Married",
        viewer: "public",
        id: 450,
      };
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
