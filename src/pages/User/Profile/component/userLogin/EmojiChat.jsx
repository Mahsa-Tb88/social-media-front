// import { Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import CollectionsIcon from "@mui/icons-material/Collections";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import MoodIcon from "@mui/icons-material/Mood";
// import React, { useRef, useState } from "react";
// import MyIconButton from "../../../../../components/Customized/MyIconButton";
// import { useForm } from "react-hook-form";
// import { LoadingButton } from "@mui/lab";
// import EmojiPicker from "emoji-picker-react";

// export default function EmojiChat() {
//   const [showEmoji, setShowEmoji] = useState(false);
//   const { register, handleSubmit, setValue, watch } = useForm({});

//   function onSubmit(data) {
//     console.log("data", data);
//   }

//   const textareaRef = useRef(null);
//   const desc = watch("desc") || "";

//   function handleEmoji(emojiData) {
//     const emoji = emojiData.emoji;
//     console.log("desc is ", desc);
//     // Get current cursor position
//     const textarea = textareaRef.current;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     // Insert emoji at the cursor position
//     const newText = desc.substring(0, start) + emoji + desc.substring(end);

//     setValue("desc", newText);
//   }

//   return (
//     <Paper
//       sx={{ p: 2, maxWidth: "600px", mx: "auto", mt: 10 }}
//       spacing={3}
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <Stack>
//         <TextField
//           variant="standard"
//           label="Title"
//           size="small"
//           {...register("title")}
//         />
//         <Box
//           sx={{ my: 4, width: "100%" }}
//           placeholder="What is on your mind?"
//           component={"textarea"}
//           minRows={3}
//           {...register("desc", {
//             onChange: (e) => setValue("desc", e.target.value),
//           })}
//           ref={textareaRef}
//           value={desc}
//         />
//       </Stack>

//       {showEmoji && (
//         <Stack>
//           <EmojiPicker onEmojiClick={handleEmoji} />
//         </Stack>
//       )}
//       <Stack
//         sx={{
//           border: 1,
//           borderColor: "#B0B8C4",
//           p: 1,
//           borderRadius: "4px",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mt: 4,
//         }}
//       >
//         <Typography>Add to your post</Typography>
//         <Stack sx={{ flexDirection: "row", gap: 2 }}>
//           <Tooltip title="Image" arrow>
//             <MyIconButton tooltip="post">
//               <CollectionsIcon />
//             </MyIconButton>
//           </Tooltip>
//           <Tooltip title="Video" arrow>
//             <MyIconButton tooltip="post">
//               <VideoLibraryIcon />
//             </MyIconButton>
//           </Tooltip>
//           <Tooltip title="Feeling" arrow>
//             <MyIconButton
//               tooltip="post"
//               onClick={() => setShowEmoji(!showEmoji)}
//             >
//               <MoodIcon />
//             </MyIconButton>
//           </Tooltip>
//         </Stack>
//       </Stack>
//       <LoadingButton size="large" sx={{ fontSize: 17 }} type="submit">
//         Post
//       </LoadingButton>
//     </Paper>
//   );
// }
