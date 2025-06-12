// import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
// import React from "react";
// import { useSelector } from "react-redux";
// import noImage from "../../../assets/images/user.png";

// export default function FriendSection() {
//   const user = useSelector((state) => state.user);

//   return (
//     <Paper sx={{ p: 1, height: "100vh" }}>
//       <Typography sx={{ fontWeight: "Bold", fontSize: 20, mb: 1 }}>
//         Friends
//       </Typography>
//       <Divider />
//       {user?.friends?.length ? (
//         <Stack spacing={3} sx={{ mt: 2 }}>
//           <Typography sx={{ fontSize: 17 }}>
//             You have not make friends yet!
//           </Typography>
//           <Button size="large" sx={{ width: "200px", fontSize: 18 }}>
//             Find Friends
//           </Button>
//         </Stack>
//       ) : (
//         <Stack mt={2}>
//           <Stack
//             sx={{
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 2,
//             }}
//           >
//             <Box
//               component="img"
//               src={noImage}
//               sx={{ height: "50px", width: "50px", borderRadius: "50%" }}
//             />
//             <Typography>username</Typography>
//           </Stack>
//         </Stack>
//       )}
//     </Paper>
//   );
// }
