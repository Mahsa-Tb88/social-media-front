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

import React, { useEffect, useRef, useState } from "react";
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
import EmojiPicker from "emoji-picker-react";

export default function PostProfile({ open, onClose, type, post }) {
  const profile = useSelector((state) => state.user.profile);
  const [viewer, setViewer] = useState("friends");
  const [imagePost, setImagePost] = useState(
    post?.image ? SERVER_URL + post.image : ""
  );
  const [imageEditPost, setImgeEditPost] = useState(
    post?.image ? SERVER_URL + post.image : ""
  );
  const [openUploadImage, setOpenUploadImage] = useState(false);
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
    console.log("data", data);
    if (type == "edit") {
      console.log("edit", data);

      data.id = post._id;
      data.userId = post.userId;
      const img = imagePost.replace(SERVER_URL, "");
      data.image = img;

      editMutation.mutate(data, {
        onSuccess(d) {
          setValue("title", "");
          setValue("desc", "");
          setImagePost("");
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
          queryClient.invalidateQueries({ queryKey: ["singlePost"] });
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
          setValue("title", "");
          setValue("desc", "");
          setImagePost("");
          onClose();
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError(error) {
          console.log("PostProfile", error);
        },
      });
    }
  }

  function removeImageHandler() {
    setImgeEditPost("noImage");
    setImagePost("");
  }

  useEffect(() => {
    setOpenUploadImage(false);
  }, [open]);

  const descRef = useRef(null);
  const titleRef = useRef(null);
  // const desc = watch("desc") || "";
  // const title = watch("title") || "";

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
          {/*  <Box
            sx={{ mt: 4, width: "100%" }}
            placeholder="What is on your mind?"
            component={"textarea"}
            minRows={3}
            {...register("desc", {
              onChange: (e) => setValue("desc", e.target.value),
            })}
            ref={descRef}
            value={desc}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderColor: "#ccc",

              borderRadius: "4px",
              resize: "none",
              fontFamily: "inherit",
            }}
            onFocus={() => setFocusedField("desc")}
          /> */}
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
        {showEmoji && (
          <Stack>
            <EmojiPicker onEmojiClick={handleEmoji} />
          </Stack>
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
                <VideoLibraryIcon sx={{ color: "#007FFF" }} />
              </MyIconButton>
            </Tooltip>
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
