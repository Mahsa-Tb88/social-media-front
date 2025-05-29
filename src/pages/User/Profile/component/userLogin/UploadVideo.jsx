import { Box, Stack, TextField } from "@mui/material";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useState } from "react";

export default function UploadVideo({ setOpenUploadVideo }) {
  const [selectedVideo, setSelectedVideo] = useState(false);

  function handleSelectVideo() {}
  function removeVideoHandler() {}

  return (
    <Stack spacing={2}>
      <Stack
        sx={{ border: 1, borderRadius: "4px", py: 1, borderColor: "#B0B8C4" }}
      >
        <Box sx={{ textAlign: "right", pr: 1 }}>
          <MyIconButton onClick={() => setOpenUploadVideo(false)}>
            <Close sx={{ fontSize: 13 }} />
          </MyIconButton>
        </Box>
        {selectedVideo ? (
          <Stack>
            <Box component="img" src={selectedVideo} />
          </Stack>
        ) : (
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
                Select Video
              </Typography>
            </Box>
            <TextField
              type="file"
              {...videoField}
              id="videoFile"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleSelectVideo}
            />
          </Stack>
        )}
      </Stack>
      <Button variant="outlined" onClick={() => removeVideoHandler()}>
        Remove
      </Button>
    </Stack>
  );
}
