import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useUploadFile } from "../../../../../utils/mutation";

export default function UploadVideo({
  setOpenUploadVideo,
  setVideoPost,
  videoPost,
}) {
  const uploadImgMutation = useUploadFile();

  function handleSelectVideo(e) {
    const file = e.target.files[0];
    if (file) {
      const form = new FormData();
      form.append("file", file);
      uploadImgMutation.mutate(form, {
        onSuccess(d) {
          setVideoPost(d.data.body.url);
        },
        onError(error) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          console.log("errror", error);
          return;
        },
      });
    }
  }
  function removeVideoHandler() {
    setSelectedVideo("");
    setVideoPost("");
    onclose();
  }

  return (
    <Stack spacing={2}>
      {!videoPost && (
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
              <MyIconButton onClick={() => setOpenUploadVideo(false)}>
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
                  Select Video
                </Typography>
              </Box>
              <TextField
                type="file"
                id="videoFile"
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleSelectVideo}
              />
            </Stack>
          </Stack>
          <Button
            sx={{ mt: 3 }}
            variant="outlined"
            onClick={() => removeVideoHandler()}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

// {selectedVideo ? (
//           <Stack>
//             <Box sx={{ maxWidth: "60%", margin: "auto" }}>
//               <video width="100%" controls>
//                 <source src={selectedVideo} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </Box>
//           </Stack>
//         ) : (
//           <Stack>
//             <Box
//               htmlFor="videoFile"
//               component="label"
//               sx={{
//                 fontSize: 17,
//                 textAlign: "center",
//                 cursor: "pointer",
//                 justifyContent: "center",
//               }}
//             >
//               <MyIconButton>
//                 <UploadFileIcon />
//               </MyIconButton>
//               <Typography sx={{ fontWeight: "bold", mt: 1 }}>
//                 Select Video
//               </Typography>
//             </Box>
//             <TextField
//               type="file"
//               id="videoFile"
//               accept="video/*"
//               style={{ display: "none" }}
//               onChange={handleSelectVideo}
//             />
//           </Stack>
//         )}
//       </Stack>
//       <Button variant="outlined" onClick={() => removeVideoHandler()}>
//         Remove
//       </Button>
