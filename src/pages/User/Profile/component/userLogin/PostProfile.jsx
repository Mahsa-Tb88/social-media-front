import {
  Box,
  Button,
  Dialog,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MoodIcon from "@mui/icons-material/Mood";

import React, { useEffect, useState } from "react";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import noImage from "../../../../../assets/images/user.png";
import { pink, green } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import UploadImage from "./UploadImage";
import { useCreateNewPost, useEditPost } from "../../../../../utils/mutation";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";

export default function PostProfile({ open, onClose, type, p }) {
  const profile = useSelector((state) => state.user.profile);
  const [viewer, setViewer] = useState("friends");
  const [imagePost, setImagePost] = useState(
    p?.image ? SERVER_URL + p.image : ""
  );
  const [imageEditPost, setImgeEditPost] = useState(
    p?.image ? SERVER_URL + p.image : ""
  );
  const [openUploadImage, setOpenUploadImage] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: p?.title ? p.title : "",
      desc: p?.desc ? p.desc : "",
    },
  });

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const { isPending, error, mutate } = useCreateNewPost();
  const editMutation = useEditPost();
  const queryClient = useQueryClient();
  function onSubmit(data) {
    console.log("submit post", data);
    if (type == "edit") {
      data.id = p._id;
      data.userId = p.userId;
      data.image = imagePost;
      editMutation.mutate(data, {
        onSuccess(d) {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError(e) {
          console.log("Postprofile", error);
        },
      });
    } else {
      data.viewer = viewer;
      data.image = imagePost;
      data.id = profile.id;
      mutate(data, {
        onSuccess(d) {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError(error) {
          console.log("PostProfile", error);
        },
      });
    }
    setValue("title", "");
    setValue("desc", "");
    setImagePost("");
  }

  function removeImageHandler() {
    setImgeEditPost("noImage");
    setImagePost("");
  }

  useEffect(() => {
    setOpenUploadImage(false);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          {type == "edit" ? "Edit post" : " Create post"}
        </Typography>
        <MyIconButton onClick={onClose}>
          <Close />
        </MyIconButton>
      </Stack>
      <Divider />
      <Stack
        sx={{ p: 2 }}
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Box
            component="img"
            src={profile.profileImg ? SERVER_URL + profile.profileImg : noImage}
            sx={{ height: "60px", width: "60px", borderRadius: "50%" }}
          />
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 17 }}>{profile.username}</Typography>

            <Select
              value={viewer}
              onChange={(e) => setViewer(e.target.value)}
              size="small"
              sx={{ fontSize: 13 }}
            >
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </Stack>
        </Stack>
        <Stack>
          <TextField
            variant="standard"
            label="Title"
            size="small"
            {...register("title")}
          />
          <TextareaAutosize
            sx={{ mt: 4, width: "100%" }}
            placeholder="What is on your mind?"
            minRows={3}
            {...register("desc")}
          />
        </Stack>
        {imageEditPost && imageEditPost != "noImage" ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box
              component="img"
              src={imagePost}
              sx={{ maxWidth: "200px", maxHeight: "200px", mb: 2 }}
            />
            <Button onClick={removeImageHandler}>Remove image</Button>
          </Stack>
        ) : (
          ""
        )}
        {openUploadImage && (
          <UploadImage
            setOpenUploadImage={setOpenUploadImage}
            setImagePost={setImagePost}
          />
        )}
        <Stack
          sx={{
            border: 1,
            borderColor: "#B0B8C4",
            p: 1,
            borderRadius: "4px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Add to your post</Typography>
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <Tooltip title="Image" arrow>
              <MyIconButton
                tooltip="post"
                onClick={() => setOpenUploadImage(true)}
              >
                <CollectionsIcon sx={{ color: pink[500] }} />
              </MyIconButton>
            </Tooltip>
            <Tooltip title="Video" arrow>
              <MyIconButton tooltip="post">
                <VideoLibraryIcon sx={{ color: blue[500] }} />
              </MyIconButton>
            </Tooltip>
            <Tooltip title="Feeling" arrow>
              <MyIconButton tooltip="post">
                <MoodIcon sx={{ color: green[500] }} />
              </MyIconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <LoadingButton
          loading={isPending}
          size="large"
          sx={{ fontSize: 17 }}
          type="submit"
        >
          Post
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
