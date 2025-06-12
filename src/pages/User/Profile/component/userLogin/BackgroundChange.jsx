/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import background from "../../../../../assets/images/back.jpg";
import { useDispatch, useSelector } from "react-redux";

import {
  useChangeBackgorund,
  useUploadFile,
} from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";
import { toast } from "react-toastify";

export default function BackgroundChange({ open, onClose, setBackgroundImg }) {
  const user = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(
    user.profile?.backgroundImg
      ? SERVER_URL + user.profile.backgroundImg
      : background
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangedPhoto, setIsChangedPhoto] = useState(false);
  const dispatch = useDispatch();

  const uploadImgMutation = useUploadFile();
  const { mutate, error, data } = useChangeBackgorund();

  function handleSelectImage(e) {
    setErrorMsg("");
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      const form = new FormData();
      form.append("file", file);
      uploadImgMutation.mutate(form, {
        onSuccess(d) {
          setIsChangedPhoto(true);
          setSelectedImage(SERVER_URL + d.data.body.url);
        },
        onError(error) {
          setErrorMsg(error.message);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        },
      });
    } else {
      console.log("msg eroro");
      setErrorMsg("Invalid file type");
    }
  }

  function deleteBackImgHandler() {
    setErrorMsg("");
    const data = {};
    data.id = user.profile.id;
    data.image = "";
    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user.profile,
            backgroundImg: "",
          })
        );
        setBackgroundImg(background);
        setSelectedImage("");
      },
      onError(error) {
        setErrorMsg(error.message);
      },
    });
  }

  async function submitPhoto() {
    const myData = {};
    setErrorMsg("");
    myData.id = user.profile.id;
    myData.image = selectedImage;
    mutate(myData, {
      onSuccess() {
        dispatch(
          userActions.setProfile({
            ...user.profile,
            backgroundImg: selectedImage ? selectedImage : background,
          })
        );
        setBackgroundImg(selectedImage ? selectedImage : background);
        setIsChangedPhoto(false);
      },
      onError(error) {
        console.log("error", error);
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center", my: 2 }}>
        {errorMsg ? (
          <Alert severity="error">{error ? error.message : errorMsg}</Alert>
        ) : data ? (
          <Alert severity="success" textAlign="center">
            {data.data.message}
          </Alert>
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <Alert severity="info">Update your background</Alert>
        )}
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 19,
            }}
          >
            <Box
              component="img"
              src={selectedImage ? selectedImage : background}
              sx={{
                height: "100px",
                width: "180px",
                border: "var(--border)",
                borderRadius: "4px",
              }}
            />
            <Stack spacing={3}>
              <TextField
                type="file"
                id="imageFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleSelectImage}
              />

              <Button
                sx={{ fontSize: 17 }}
                variant="outlined"
                component="label"
                htmlFor="imageFile"
              >
                Change Photo
              </Button>
              <Button
                sx={{ fontSize: 17 }}
                onClick={submitPhoto}
                disabled={!isChangedPhoto}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 3, fontSize: 15, alignSelf: "left", width: "100px" }}
            variant="text"
            onClick={deleteBackImgHandler}
            disabled={!selectedImage}
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
