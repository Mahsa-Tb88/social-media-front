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
import noImage from "../../../../../assets/images/user.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfileImgChange,
  useUploadFile,
} from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";

export default function ProfileImgChange({ open, onClose, setProfileImg }) {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const [isImageChanged, setIsIamgeChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    user.profileImg ? SERVER_URL + user.profileImg : noImage
  );

  const uploadImgMutation = useUploadFile();
  const { data, mutate, error } = useProfileImgChange();

  

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
  async function submitPhoto(data) {
    if (data.image?.length && isImageChanged) {
      data.image = selectedImage.replace(SERVER_URL, "");
    }
    data.id = user.id;
    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user,
            profileImg: selectedImage ?selectedImage.replace(SERVER_URL, "") :noImage,
          })
        );
        setProfileImg(selectedImage ? selectedImage :noImage);
      },
      onError(error) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    });
  }

  function handleDeleteImg() {
    const data = {};
    setSelectedImage(noImage);
    data.id = user.id;
    data.image = "";
    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user,
            profileImg: "",
          })
        );
        setIsIamgeChanged(true);
      },
      onError(error) {},
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {data ? (
          <Alert severity="success">{data.data.message}</Alert>
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <Alert severity="info">Update Your Profile Picture</Alert>
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
                height: "120px",
                width: "120px",
                border: "var(--border)",
                borderRadius: "50%",
              }}
            />
            <Stack spacing={3}>
              <Button
                variant="outlined"
                htmlFor="imageFile"
                component="label"
                sx={{ fontSize: 17 }}
              >
                Select Photo
              </Button>
              <TextField
                type="file"
                id="imageFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleSelectImage}
              />
              <Button
                variant="contained"
                sx={{ fontSize: 17 }}
               onClick={submitPhoto}
                disabled={!isImageChanged}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
          <Button
            variant="text"
            sx={{ width: "30%", mt: 2 }}
            onClick={handleDeleteImg}
          >
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
