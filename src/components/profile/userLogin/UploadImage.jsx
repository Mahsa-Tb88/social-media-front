/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useUploadFile } from "../../../utils/mutation";
import { useState } from "react";

export default function UploadImage({
  setOpenUploadImage,
  setImagePost,
  imagePost,
}) {
  const [msg, setMsg] = useState("");
  const uploadImgMutation = useUploadFile();

  function handleSelectImage(e) {
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      setMsg("");
      const form = new FormData();
      form.append("file", file);
      uploadImgMutation.mutate(form, {
        onSuccess(d) {
          setImagePost(d.data.body.url);
        },
        onError(error) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          console.log(error);
          return;
        },
      });
    }
    if (!file.type.includes("image")) {
      setMsg("Please select a file with type of image");
    }
  }

  function removeImageHandler() {
    setImagePost("");
  }

  return (
    <Stack spacing={2}>
      {msg && <Alert color="error">{msg}</Alert>}
      {!imagePost && (
        <Stack>
          <Stack
            sx={{
              border: 1,
              borderRadius: "4px",
              py: 1,
              borderColor: "#B0B8C4",
            }}
          >
            <Box sx={{ textAlign: "right", pr: 1 }}>
              <MyIconButton onClick={() => setOpenUploadImage(false)}>
                <Close sx={{ fontSize: 13 }} />
              </MyIconButton>
            </Box>

            <Stack>
              <Box
                htmlFor="videoFile"
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
                  Select Image
                </Typography>
              </Box>
              <TextField
                type="file"
                id="videoFile"
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleSelectImage}
              />
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 3 }}
            variant="outlined"
            onClick={() => removeImageHandler()}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
