/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
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
import MyIconButton from "../../Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  useEditContactBaseInfo,
  useEditOverview,
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
import { toast } from "react-toastify";
import LoadingError from "../../LoadingError";
import EducationEdit from "./EducationEdit";
import WorkEdit from "./WorkEdit";

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
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["overview"],
          });
          toast.success(d.data.message);
        },
        onError(error) {
          console.log("error", error);
          toast.error(error.response.data.message);
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
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["contactBaseInfo"],
          });
          toast.success(d.data.message);
        },
        onError(error) {
          toast.error(error.response.data.message);
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
            toast.success(d.data.message);
          },
          onError(error) {
            toast.error(error.response.data.message);
          },
        });
      } else {
        const data = { id: userId, [title]: { value: newValue, id } };
        mutationEditPlace.mutate(data, {
          onSuccess(d) {
            querryClient.invalidateQueries({ queryKey: ["placeLived"] });
            toast.success(d.data.message);
          },
          onError(error) {
            toast.error(error.response.data.message);
          },
        });
      }
    }

    onCloseEdit();
  }

  console.log("title", title);
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
            setNewValue={setNewValue}
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
              disabled={newValue ? false : true}
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
        toast.success(d.data.message);
      },
      onError(error) {
        console.log("error is", error);
        toast.error(error.response.data.message);
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
          {userList.map((l, index) => (
            <List key={index}>
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

      <Button
        size="large"
        sx={{}}
        onClick={saveHandler}
        disabled={user.username ? false : true}
      >
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

  const { data, error, refetch } = useSearchPerson(user);
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

      mutationAddFamily.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
          onCloseEdit();
          toast.success(d.data.message);
        },
        onError(error) {
          toast.error(error.response.data.message);
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
          toast.success(d.data.message);
        },
        onError(error) {
          toast.error(error.response.data.message);
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
          {error && (
            <LoadingError
              handleAction={refetch}
              message={error.response.data.message}
            />
          )}
          {userfounded.map((l, index) => (
            <List key={index}>
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

      <Button size="large" onClick={saveHandler}>
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
        disabled={newValue ? false : true}
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
      onSuccess(d) {
        querryClient.invalidateQueries({
          queryKey: ["overview"],
        });
        onCloseEdit();
        toast.success(d.data.message);
      },
      onError(error) {
        toast.error(error.response.data.message);
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

      <Button
        size="large"
        sx={{}}
        onClick={saveHandler}
        disabled={pronounce ? false : true}
      >
        Save
      </Button>
    </Stack>
  );
}

function Intro({ value, onCloseEdit, type }) {
  const theme = useSelector((state) => state.app.theme);
  const userId = useParams().id;
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
      onSuccess(d) {
        querryClient.invalidateQueries({
          queryKey: ["overview"],
        });
        onCloseEdit();
        toast.success(d.data.message);
      },
      onError(error) {
        toast.error(error.response.data.message);
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
        toast.success(d.data.message);
        onCloseEdit();
      },
      onError(error) {
        toast.error(error.response.data.message);
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
          inputProps={{ maxLength: 400 }}
        />
      </Stack>

      <Button
        size="large"
        onClick={saveChangeHandler}
        disabled={bio ? false : true}
      >
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
