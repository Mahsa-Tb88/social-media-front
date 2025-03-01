// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import noImage from "../../../assets/images/user.png";
// import MyIconButton from "../../../components/Customized/MyIconButton";
// import { Edit } from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";
// import ProfileImgChange from "./ProfileImgChange";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import MessageIcon from "@mui/icons-material/Message";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import { useAddFriend } from "../../../utils/mutation";
// import { userActions } from "../../../store/slices/userSlice";

// export default function ProfileInfo({ user }) {
//   const theme = useSelector((state) => state.app.theme);
//   const dispatch = useDispatch();
//   const userLogin = useSelector((state) => state.user.profile);
//   const [profileImg, setProfileImg] = useState(
//     user.profileImg ? SERVER_URL + user.profileImg : noImage
//   );
//   const [profileImgOpen, setProfileImgOpen] = useState(false);
//   const addFriendMutation = useAddFriend();
//   console.log("...userlogin", userLogin);
//   console.log("...user", user);

//   function findFriend() {
//     const findFriend = userLogin?.friends.listFriend?.find(
//       (f) => f.id == user._id
//     );
//     console.log("!!!", findFriend);
//     if (findFriend) {
//       return { status: findFriend.status };
//     } else {
//       return false;
//     }
//   }
//   console.log("findfriend", findFriend());
//   function addFriend() {
//     const data = {
//       userId: userLogin.id,
//       id: user._id,
//       username: user.username,
//       profileImg: user.profileImg,
//       status: "pending",
//     };
//     addFriendMutation.mutate(data, {
//       onSuccess(d) {
//         console.log("success,,,,", userLogin?.friends?.listFriend);

//         const updatedListFriends = [
//           ...userLogin?.friends?.listFriend,
//           {
//             id: user._id,
//             username: user.username,
//             profileImg: user.profileImg,
//             status: "pending",
//           },
//         ];
//         dispatch(
//           userActions.setProfile({
//             ...userLogin,
//             friends: { ...userLogin.friends, listFriend: updatedListFriends },
//           })
//         );
//       },
//       onError(e) {
//         console.log("eeror is", e);
//       },
//     });
//   }

//   return (
//     <Container
//       fixed
//       maxWidth="md"
//       sx={{
//         position: "relative",
//         justifyContent: "center",
//         alignItems: "center",
//         display: "flex",
//       }}
//     >
//       <Stack
//         sx={{
//           position: "absolute",
//           top: "-40px",
//           width: "100%",
//         }}
//       >
//         <Stack
//           sx={{
//             flexDirection: "row",
//             alignItems: "center",
//             gap: 7,
//           }}
//         >
//           <Stack sx={{ position: "relative" }}>
//             <Box
//               component="img"
//               src={profileImg}
//               sx={{
//                 border: "var(--border)",
//                 borderRadius: "50%",
//                 width: "200px",
//                 height: "200px",
//               }}
//             />
//             {userLogin?.username == user?.username && (
//               <MyIconButton
//                 sx={{
//                   position: "absolute",
//                   bottom: "10%",
//                   right: "0",
//                 }}
//                 onClick={() => setProfileImgOpen(true)}
//               >
//                 <Edit />
//               </MyIconButton>
//             )}
//           </Stack>

//           <Stack
//             sx={{
//               width: "100%",
//               flexDirection: "row",
//               mt: 8,
//               justifyContent: "space-between",
//             }}
//           >
//             <Stack>
//               <Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
//                 {user.username}
//               </Typography>
//               <Typography sx={{ fontSize: 17 }}>
//                 {/*  {user?.friends.length ? user.friends + "friends" : " "}
//                 {user?.mutual ? ", " + user.mutual + "mutual" : ""} */}
//               </Typography>
//             </Stack>
//             <Stack sx={{ flexDirection: "row", gap: 2 }}>
//               {!findFriend() && userLogin.id != user._id ? (
//                 <Button
//                   startIcon={<PersonAddAlt1Icon />}
//                   size="large"
//                   sx={{ fontSize: 17 }}
//                   disableElevation
//                   onClick={addFriend}
//                 >
//                   Add friend
//                 </Button>
//               ) : findFriend().status == "pending" ? (
//                 <Button
//                   startIcon={<PersonRemoveIcon />}
//                   size="large"
//                   sx={{ fontSize: 17 }}
//                   disableElevation
//                 >
//                   Cancel Request
//                 </Button>
//               ) : findFriend().status == "accept" ? (
//                 <Button
//                   startIcon={<PersonRemoveIcon />}
//                   size="large"
//                   sx={{ fontSize: 17 }}
//                   disableElevation
//                 >
//                   Remove Friend
//                 </Button>
//               ) : (
//                 "error"
//               )}

//               <Button
//                 size="large"
//                 sx={{
//                   fontSize: 17,
//                   bgcolor: theme == "light" ? "grey.200" : "grey.800",
//                   color: theme == "light" ? "grey.800" : "grey.200",
//                   "&:hover": {
//                     bgcolor: theme == "light" ? "grey.300" : "grey.900",
//                   },
//                 }}
//                 startIcon={
//                   user._id != userLogin._id ? <MessageIcon /> : <Edit />
//                 }
//                 disableElevation
//               >
//                 {user._id != userLogin._id ? "Message" : "Edit profile"}
//               </Button>
//             </Stack>
//           </Stack>
//         </Stack>
//         {userLogin.username == user.username && (
//           <ProfileImgChange
//             open={profileImgOpen}
//             onClose={() => setProfileImgOpen(false)}
//             setProfileImg={setProfileImg}
//           />
//         )}
//       </Stack>
//     </Container>
//   );
// }

// export default function ProfileHeader({ user }) {
//   const [backgroundImg, setBackgroundImg] = useState(
//     user.backgroundImg ? SERVER_URL + user.backgroundImg : backGround
//   );

//   return (
//     <Container>
//       <Grid2 container>
//         <Grid2 size={12} sx={{ mt: 3 }}>
//           <Stack sx={{ height: "300px", position: "relative" }}>
//             <Stack sx={{ width: "100%", height: "100%" }}>
//               <Box
//                 src={backgroundImg}
//                 sx={{
//                   objectFit: "cover",
//                   objectPosition: "center",
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: "5px",
//                 }}
//                 component="img"
//               />
//             </Stack>
//           </Stack>
//         </Grid2>
//       </Grid2>
//       <ProfileInfoUser user={user} />
//     </Container>
//   );
// }
