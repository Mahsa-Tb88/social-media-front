/* eslint-disable react/react-in-jsx-scope */
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

import { useState } from "react";
import noImage from "../../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { useProfileImgChange, useUploadFile } from "../../../utils/mutation";
import { userActions } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";

export default function ProfileImgChange({ open, onClose, setProfileImg }) {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const [isImageChanged, setIsIamgeChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    user.profileImg
      ? user.profileImg.includes(SERVER_URL)
        ? user.profileImg
        : SERVER_URL + user.profileImg
      : noImage
  );
  const [errorMsg, setErrorMsg] = useState("");

  const uploadImgMutation = useUploadFile();
  const { data, mutate, error } = useProfileImgChange();

  function handleSelectImage(e) {
    setErrorMsg("");
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      const form = new FormData();
      form.append("file", file);
      uploadImgMutation.mutate(form, {
        onSuccess(d) {
          setSelectedImage(SERVER_URL + d.data.body.url);
          setIsIamgeChanged(true);
        },
        onError(error) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          toast.error(error.response.data.message);
          return;
        },
      });
    } else {
      setErrorMsg("Invalid image type");
    }
  }
  async function submitPhoto() {
    let myData = {};
    myData.id = user.id;
    myData.image = selectedImage.replace(SERVER_URL, "");
    mutate(myData, {
      onSuccess() {
        dispatch(
          userActions.setProfile({
            ...user,
            profileImg: selectedImage ? selectedImage : noImage,
          })
        );
        setProfileImg(selectedImage ? selectedImage : noImage);
        setIsIamgeChanged(false);
      },
      onError(error) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.error(error.response.data.message);
      },
    });
  }

  function handleDeleteImg() {
    setErrorMsg("");
    const data = {};
    data.id = user.id;
    data.image = "";
    mutate(data, {
      onSuccess() {
        dispatch(
          userActions.setProfile({
            ...user,
            profileImg: "",
          })
        );
        setSelectedImage("");
        setProfileImg(noImage);
      },
      onError(error) {
        setErrorMsg(error.message);
      },
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {errorMsg ? (
          <Alert severity="error">{errorMsg}</Alert>
        ) : data ? (
          <Alert severity="success">{data.data.message}</Alert>
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <Alert severity="info">Update Your Profile Picture</Alert>
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
              src={selectedImage ? selectedImage : noImage}
              sx={{
                height: "120px",
                width: "120px",
                border: "var(--border)",
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
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
