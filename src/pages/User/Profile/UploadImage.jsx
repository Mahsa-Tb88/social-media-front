import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useUploadFile } from "../../../utils/mutation";

export default function UploadImage({ setOpenUploadImage, setImagePost }) {
  const { register, setValue } = useForm();
  const imageField = { ...register("image") };
  const [isImageChanged, setIsIamgeChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const uploadImgMutation = useUploadFile();

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
          setImagePost(d.data.body.url);
        },
        onError(error) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          console.log(error);
          return;
        },
      });
    }
  }

  function removeImageHandler() {
    setSelectedImage("");
    setValue("image", "");
  }

  return (
    <Stack spacing={2}>
      <Stack
        sx={{ border: 1, borderRadius: "4px", py: 1, borderColor: "#B0B8C4" }}
      >
        <Box sx={{ textAlign: "right", pr: 1 }}>
          <MyIconButton onClick={() => setOpenUploadImage(false)}>
            <Close sx={{ fontSize: 13 }} />
          </MyIconButton>
        </Box>
        {selectedImage ? (
          <Stack>
            <Box component="img" src={selectedImage} />
          </Stack>
        ) : (
          <Stack>
            <Box
              htmlFor="imageFile"
              component="label"
              sx={{
                fontSize: 17,
                textAlign: "center",
                cursor: "pointer",
                justifyContent: "center",
              }}
            >
              <MyIconButton>
                <UploadFileIcon />
              </MyIconButton>
              <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                Select Photo
              </Typography>
            </Box>
            <TextField
              type="file"
              {...imageField}
              id="imageFile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleSelectImage}
            />
          </Stack>
        )}
      </Stack>
      <Button variant="outlined" onClick={() => removeImageHandler()}>
        Remove{" "}
      </Button>
    </Stack>
  );
}
