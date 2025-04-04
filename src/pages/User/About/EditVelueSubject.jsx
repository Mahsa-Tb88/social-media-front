import {
  Avatar,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
  useUpdatedRelationship,
  useUpdatedFamily,
  useAddFamily,
  useAddPlace,
  useEditPlace,
  useDeleteOverview,
} from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSearchPerson } from "../../../utils/queries";
import noImage from "../../../assets/images/user.png";

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
  const userId = useParams().id;
  const querryClient = useQueryClient();
  const mutationOverview = useEditOverview();
  const mutationContactBaseInfo = useEditContactBaseInfo();
  const mutationAddPlace = useAddPlace();
  const mutationEditPlace = useEditPlace();

  function saveChangeHandler() {
    if (title == "overview") {
      const data = {
        subject,
        value: newValue,
        viewer: "friends",
        id: user.id,
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
        id: user.id,
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
    if (
      title == "hometown" ||
      title == "currentCity" ||
      title == "usedToLiveCity"
    ) {
      if (type == "new") {
        const data = {
          id: userId,
          [title]: { value: newValue, viewer: "friends", id: Date.now() },
        };

        mutationAddPlace.mutate(data, {
          onSuccess(d) {
            querryClient.invalidateQueries({ queryKey: ["placeLived"] });
          },
          onError(error) {
            console.log(error);
          },
        });
      } else {
        const data = { id: userId, [title]: { value: newValue, id } };
        mutationEditPlace.mutate(data, {
          onSuccess(d) {
            querryClient.invalidateQueries({ queryKey: ["placeLived"] });
          },
          onError(error) {
            console.log(error);
          },
        });
      }
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
        ) : subject == "Pronounce" ? (
          <Pronounce value={value} onCloseEdit={onCloseEdit} />
        ) : subject == "Intro" ? (
          <Intro value={value} type={type} onCloseEdit={onCloseEdit} />
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
  const theme = useSelector((state) => state.app.theme);
  const userId = useParams().id;
  const [status, setStatus] = useState(value.status);
  const [user, setUser] = useState(value ? value : "");
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");

  const listFriend = useSelector((state) =>
    state.user.profile.friends.listFriend.filter((f) => f.status == "accepted")
  );

  useEffect(() => {
    if (search) {
      const findUser = listFriend.filter((f) =>
        f.username.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      const timeOut = setTimeout(setUserList(findUser), 0);
      return () => clearTimeout(timeOut);
    }
  }, [search]);

  function selectUser(l) {
    setUser(l);
    setSearch("");
  }

  const mutationRel = useUpdatedRelationship();
  const querryClient = useQueryClient();
  function saveHandler() {
    console.log("user====", user);
    const data = {
      id: userId,
      relationship: {
        profileImg: user.profileImg,
        username: user.username,
        id: user.id,
        status,
        viewer: "friends",
      },
    };
    mutationRel.mutate(data, {
      onSuccess(d) {
        querryClient.invalidateQueries({ queryKey: ["familyRel"] });
        onCloseEdit();
      },
      onError(error) {
        console.log("error is", error);
      },
    });
  }
  return (
    <Stack spacing={3}>
      <TextField
        size="small"
        placeholder={"Serach username"}
        defaultValue={type == "edit" ? value.username : ""}
        onChange={(e) => setSearch(e.target.value)}
        value={user.username}
      />

      {search && (
        <Stack>
          {userList.map((l) => (
            <List>
              <ListItem
                sx={{
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: theme == "light" ? "#ebf5ff" : "grey.800",
                  },
                }}
                onClick={() => selectUser(l)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="User Image"
                    src={l.profileImg ? l.profileImg : noImage}
                  />
                </ListItemAvatar>
                <ListItemText>{l.username}</ListItemText>
              </ListItem>
            </List>
          ))}
        </Stack>
      )}

      <FormControl fullWidth>
        <InputLabel id="status">Status</InputLabel>
        <Select
          id="status"
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"Married"}>Married</MenuItem>
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
  const theme = useSelector((state) => state.app.theme);

  const [status, setStatus] = useState(value.status);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(value ? value : "");
  const userId = useParams().id;

  const { data, error } = useSearchPerson(user);
  const userfounded = data?.data.body || [];

  useEffect(() => {
    if (search) {
      const timeOut = setTimeout(setUser(search), 0);
      return () => clearTimeout(timeOut);
    }
  }, [search]);

  function selectUser(l) {
    setUser(l);
    setSearch("");
  }
  const mutationEditFamilyMember = useUpdatedFamily();
  const mutationAddFamily = useAddFamily();
  const querryClient = useQueryClient();
  function saveHandler() {
    if (type == "new") {
      const data = {
        id: userId,
        family: {
          profileImg: user.profileImg,
          username: user.username,
          id: user._id,
          status,
          viewer: "friends",
        },
      };
      console.log("add family", data);
      mutationAddFamily.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
          onCloseEdit();
        },
        onError(error) {
          console.log("error is", error);
        },
      });
    } else {
      const data = {
        id: userId,
        userUpdatedId: user.id,
        status,
      };
      mutationEditFamilyMember.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
          onCloseEdit();
        },
        onError(error) {
          console.log("error is", error);
        },
      });
    }
  }
  return (
    <Stack spacing={3}>
      <TextField
        size="small"
        placeholder={"Serach username"}
        defaultValue={type == "edit" ? value.username : ""}
        onChange={(e) => setSearch(e.target.value)}
        value={user.username}
        disabled={type == "edit" ? true : false}
      />
      {search && (
        <Stack>
          {userfounded.map((l) => (
            <List>
              <ListItem
                sx={{
                  cursor: "pointer",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: theme == "light" ? "#ebf5ff" : "grey.800",
                  },
                }}
                onClick={() => selectUser(l)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="User Image"
                    src={l.profileImg ? l.profileImg : noImage}
                  />
                </ListItemAvatar>
                <ListItemText>{l.username}</ListItemText>
              </ListItem>
            </List>
          ))}
        </Stack>
      )}
      <FormControl fullWidth>
        <InputLabel id="relation">Relationship</InputLabel>
        <Select
          id="relation"
          value={status}
          label="Relationship"
          onChange={(e) => setStatus(e.target.value)}
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
      <FormControl >
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

function Pronounce({ onCloseEdit }) {
  const userId = useParams().id;
  const [pronounce, setPronounce] = useState("");

  const querryClient = useQueryClient();
  const mutationOverview = useEditOverview();
  function saveHandler() {
    const data = {
      subject: "Pronounce",
      value: pronounce,
      viewer: "friends",
      id: userId,
    };
    mutationOverview.mutate(data, {
      onSuccess() {
        querryClient.invalidateQueries({
          queryKey: ["overview"],
        });
        onCloseEdit();
      },
      onError(error) {
        console.log(error);
      },
    });
  }
  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel id="status">Pronounce</InputLabel>
        <Select
          id="status"
          value={pronounce}
          label="Status"
          onChange={(e) => setPronounce(e.target.value)}
        >
          <MenuItem value={"She/Her"}>She/Her</MenuItem>
          <MenuItem value={"He/Him"}>He/Him</MenuItem>
          <MenuItem value={"They/Them"}>They/Them</MenuItem>
        </Select>
      </FormControl>

      <Button size="large" sx={{}} onClick={saveHandler}>
        Save
      </Button>
    </Stack>
  );
}

function Intro({ value, onCloseEdit, type, saveChangeHandler }) {
  const theme = useSelector((state) => state.app.theme);
  const userId = useParams().id;
  console.log("valueee bio", value);
  const [bio, setBio] = useState(type == "edit" ? value.value : "");

  const mutationOverview = useEditOverview();
  const querryClient = useQueryClient();
  function saveChangeHandler() {
    const data = {
      subject: "Intro",
      value: bio,
      id: userId,
    };
    mutationOverview.mutate(data, {
      onSuccess() {
        querryClient.invalidateQueries({
          queryKey: ["overview"],
        });
        onCloseEdit();
      },
      onError(error) {
        console.log(error);
      },
    });
  }
  const deleteMutation = useDeleteOverview();
  function deleteBio() {
    const data = { id: userId, subject: "Intro" };

    deleteMutation.mutate(data, {
      onSuccess(d) {
        querryClient.invalidateQueries({
          queryKey: ["overview"],
        });
        onCloseEdit();
      },
      onError(e) {
        console.log(e);
      },
    });
  }

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography sx={{ fontSize: 16, fontWeight: "bold", mb: 3 }}>
          {type == "new" ? "Write about yourself" : "Edit Bio"}
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Stack>

      <Button size="large" onClick={saveChangeHandler}>
        Save
      </Button>
      <Button
        size="large"
        sx={{
          bgcolor: theme == "light" ? "grey.200" : "grey.800",
          color: theme == "light" ? "grey.800" : "grey.200",
        }}
        onClick={deleteBio}
        disableElevation
      >
        Remove
      </Button>
    </Stack>
  );
}
