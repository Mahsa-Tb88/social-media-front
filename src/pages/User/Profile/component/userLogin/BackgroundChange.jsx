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
import { useForm } from "react-hook-form";
import {
  useChangeBackgorund,
  useUploadFile,
} from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";

export default function BackgroundChange({ open, onClose, setBackgroundImg }) {
  const user = useSelector((state) => state.user);
  const [isImageChanged, setIsIamgeChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    user.profile?.backgroundImg
      ? SERVER_URL + user.profile.backgroundImg
      : background
  );
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const uploadImgMutation = useUploadFile();
  const { mutate, error, data } = useChangeBackgorund();

  const imageField = { ...register("image") };

  function handleSelectImage(e) {
    imageField.onChange(e);
    const file = e.target.files[0];

    if (file) {
      setIsIamgeChanged(true);
      const form = new FormData();
      form.append("file", file);
      uploadImgMutation.mutate(form, {
        onSuccess(d) {
          setSelectedImage(SERVER_URL + d.data.body.url);
        },
        onError(error) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        },
      });
    }
  }

  function deleteBackImgHandler() {
    const data = {};
    setValue("image", "");
    setBackgroundImg(background);
    setSelectedImage(background);
    data.id = user.profile._id;
    data.image = "";
    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user.profile,
            backgroundImg: background,
          })
        );
      },
      onError(error) {},
    });
  }

  async function onSubmit(data) {
    if (data.image?.length && isImageChanged) {
      data.image = selectedImage.replace(SERVER_URL, "");
    }
    data.id = user.profile.id;
    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user.profile,
            backgroundImg: selectedImage.replace(SERVER_URL, ""),
          })
        );
        setBackgroundImg(selectedImage);
      },
      onError(error) {
        console.log("error", error);
      },
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center", my: 2 }}>
        {data ? (
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
        <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
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
              src={selectedImage}
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
                {...imageField}
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
              <Button sx={{ fontSize: 17 }} type="submit">
                Apply
              </Button>
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 3, fontSize: 15, alignSelf: "left", width: "100px" }}
            variant="text"
            onClick={deleteBackImgHandler}
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
