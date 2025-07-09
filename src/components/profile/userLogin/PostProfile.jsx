/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
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

import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MoodIcon from "@mui/icons-material/Mood";

import React, { useEffect, useState } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";
import { pink, green } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import UploadImage from "./UploadImage";
import { useCreateNewPost, useEditPost } from "../../../utils/mutation";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import UploadVideo from "./UploadVideo";
import { toast } from "react-toastify";

export default function PostProfile({ open, onClose, type, post }) {
  const profile = useSelector((state) => state.user.profile);
  const [viewer, setViewer] = useState("friends");
  const [imagePost, setImagePost] = useState(
    post?.image ? SERVER_URL + post.image : ""
  );
  const [videoPost, setVideoPost] = useState(
    post?.video ? SERVER_URL + post.video : ""
  );

  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [openUplodViedo, setOpenUploadVideo] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title ? post.title : "",
      desc: post?.desc ? post.desc : "",
    },
  });

  const { isPending, error, mutate } = useCreateNewPost();
  const editMutation = useEditPost();
  const queryClient = useQueryClient();

  function onSubmit(data) {
    if (type == "edit") {
      data.id = post._id;
      data.userId = post.userId._id;
      const img = imagePost.replace(SERVER_URL, "");
      data.image = img;
      const video = videoPost ? videoPost.replace(SERVER_URL, "") : "";
      data.video = video;

      editMutation.mutate(data, {
        onSuccess(d) {
          setValue("title", "");
          setValue("desc", "");
          setImagePost("");
          setVideoPost("");
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          queryClient.invalidateQueries({ queryKey: ["singlePost"] });
          toast.success(d.data.message);
        },
        onError(e) {
          console.log("Postprofile error is ..", e);
          toast.error(e.response.data.message);
        },
      });
    } else {
      data.viewer = viewer;
      data.image = imagePost;
      data.video = videoPost;
      data.id = profile.id;
      mutate(data, {
        onSuccess(d) {
          setValue("title", "");
          setValue("desc", "");
          setImagePost("");
          setVideoPost("");
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          toast.success(d.data.message);
        },
        onError(error) {
          console.log("PostProfile error", error);
          toast.error(error.response.data.message);
        },
      });
    }
  }

  function removeImageHandler() {
    setImagePost("");
  }

  function removeVideoHandler() {
    setVideoPost("");
  }

  useEffect(() => {
    setOpenUploadImage(false);
    setOpenUploadVideo(false);
  }, [open]);

  const [focusedField, setFocusedField] = useState(null);
  function handleEmoji(emojiData) {
    const emoji = emojiData.emoji;
    if (focusedField == "title") {
      const title = watch("title");
      const newtitle = title + " " + emoji;
      setValue("title", newtitle);
      setShowEmoji(false);
    }
    if (focusedField == "desc") {
      const desc = watch("desc");
      const newDesc = desc + " " + emoji;
      setValue("desc", newDesc);
      setShowEmoji(false);
    }
  }

  function closeHandler() {
    onClose();
    setValue("title", "");
    setValue("desc", "");
    setImagePost("");
    setVideoPost("");
  }
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
        <MyIconButton onClick={closeHandler}>
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
        <Stack sx={{ gap: 3 }}>
          <TextField
            variant="standard"
            label="Title"
            size="small"
            {...register("title")}
            onFocus={() => setFocusedField("title")}
          />
          <TextField
            multiline
            variant="standard"
            label="What is on your mind"
            size="small"
            {...register("desc")}
            onFocus={() => setFocusedField("desc")}
          />
        </Stack>
        {imagePost ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box
              component="img"
              src={
                imagePost.includes(SERVER_URL)
                  ? imagePost
                  : SERVER_URL + imagePost
              }
              sx={{ maxWidth: "200px", maxHeight: "200px", mb: 2 }}
            />
            <Button onClick={removeImageHandler} variant="outlined">
              Remove image
            </Button>
          </Stack>
        ) : (
          ""
        )}
        {videoPost ? (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box
              component="video"
              src={
                videoPost.includes(SERVER_URL)
                  ? videoPost
                  : SERVER_URL + videoPost
              }
              sx={{ maxWidth: "200px", maxHeight: "200px", mb: 2 }}
            />

            <Button onClick={removeVideoHandler} variant="outlined">
              Remove Video
            </Button>
          </Stack>
        ) : (
          ""
        )}
        {openUploadImage && (
          <UploadImage
            setOpenUploadImage={setOpenUploadImage}
            setImagePost={setImagePost}
            imagePost={imagePost}
          />
        )}
        {openUplodViedo && (
          <UploadVideo
            setOpenUploadVideo={setOpenUploadVideo}
            setVideoPost={setVideoPost}
            videoPost={videoPost}
          />
        )}
        {showEmoji && (
          <Stack>
            <EmojiPicker onEmojiClick={handleEmoji} />
          </Stack>
        )}
        {
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
              {!imagePost && !videoPost && (
                <Tooltip title="Image" arrow>
                  <MyIconButton
                    tooltip="post"
                    onClick={() => {
                      setOpenUploadImage(true);
                      setOpenUploadVideo(false);
                    }}
                  >
                    <CollectionsIcon sx={{ color: pink[500] }} />
                  </MyIconButton>
                </Tooltip>
              )}
              {!imagePost && !videoPost && (
                <Tooltip title="Video" arrow>
                  <MyIconButton
                    tooltip="post"
                    onClick={() => {
                      setOpenUploadVideo(true);
                      setOpenUploadImage(false);
                    }}
                  >
                    <VideoLibraryIcon sx={{ color: "#007FFF" }} />
                  </MyIconButton>
                </Tooltip>
              )}
              <Tooltip title="Feeling" arrow>
                <MyIconButton
                  tooltip="post"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <MoodIcon sx={{ color: green[500] }} />
                </MyIconButton>
              </Tooltip>
            </Stack>
          </Stack>
        }
        <LoadingButton
          loading={isPending}
          size="large"
          sx={{ fontSize: 17 }}
          type="submit"
          variant="contained"
        >
          Post
        </LoadingButton>
      </Stack>
    </Dialog>
  );
}
