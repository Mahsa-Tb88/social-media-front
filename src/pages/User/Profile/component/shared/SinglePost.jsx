import {
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FilterViewer from "../userLogin/FilterViewer";
import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import noImage from "../../../../../assets/images/user.png";
import { useSelector } from "react-redux";
import MenuPost from "../userLogin/MenuPost";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import IosShareIcon from "@mui/icons-material/IosShare";
import PublicIcon from "@mui/icons-material/Public";
import SendIcon from "@mui/icons-material/Send";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation, useParams } from "react-router-dom";
import { useleaveComment } from "../../../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";

export default function SinglePost({ post, profile }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const location = useLocation();
  const [postCommets, setPostComments] = useState(post.comments);
  console.log("post", post);
  let id = useParams().id;
  if (location.pathname.includes("post")) {
    id = post.userId._id;
  }

  const [openMenuPost, setOpenMenuPost] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const menuAnchor = useRef(null);

  const isOwner = id == userLogin.id ? true : false;

  return (
    <Stack>
      <Paper key={post.createdAt} sx={{ mb: 4, p: 2 }}>
        <Info post={post} profile={profile} theme={theme} isOwner={isOwner} />
        <Stack spacing={2}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{post.title}</Typography>
            {isOwner && (
              <MyIconButton
                onClick={() => {
                  setOpenMenuPost(!openMenuPost);
                }}
              >
                <Edit sx={{ fontSize: 15 }} ref={menuAnchor} />
              </MyIconButton>
            )}
          </Stack>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={post.image ? SERVER_URL + post.image : ""}
              sx={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          </Stack>

          <Typography>{post.desc}</Typography>

          <MenuPost
            open={openMenuPost}
            anchorEl={menuAnchor.current}
            handleClose={() => setOpenMenuPost(false)}
            post={post}
          />
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: 1 }}>
            {isLike ? (
              <Box
                onClick={() => setIsLike(!isLike)}
                sx={{ "&:hover": { color: "blue" } }}
              >
                <FavoriteIcon
                  sx={{
                    color: "#f50057",
                    cursor: "pointer",
                  }}
                />
              </Box>
            ) : (
              <Box onClick={() => setIsLike(!isLike)}>
                <FavoriteBorderIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "#f50057" },
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                cursor: "pointer",
                "&:hover": { fontWeight: "bold" },
              }}
            >
              54
            </Box>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              p: 1,
              borderRadius: "5px",
              "&:hover ": {
                bgcolor: theme === "dark" ? "grey.800" : "grey.200",
              },
            }}
          >
            <ChatIcon />
            <Typography>Comments</Typography>
            <Typography>6</Typography>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              p: 1,
              borderRadius: "5px",
              "&:hover ": {
                bgcolor: theme === "dark" ? "grey.800" : "grey.200",
              },
            }}
          >
            <IosShareIcon />
            <Typography>Share</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />
        {postCommets.length > 0 &&
          postCommets.map((c, index) => {
            return (
              <Stack key={index}>
                <ShowComment c={c} />
              </Stack>
            );
          })}
        <Comments
          theme={theme}
          id={post._id}
          userLogin={userLogin}
          postCommets={postCommets}
          setPostComments={setPostComments}
        />
      </Paper>
    </Stack>
  );
}

function Info({ profile, post, theme, isOwner }) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(post.viewer);

  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
    >
      <Box
        component="img"
        src={profile.profileImg ? profile.profileImg : noImage}
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      />
      <Stack>
        <Typography sx={{ fontSize: 18 }}>{profile.username}</Typography>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 13 }}>
            {getDate(post.createdAt)}
          </Typography>

          {viewer == "friends" ? (
            <GroupIcon
              sx={{
                fontSize: 16,
                cursor: "pointer",
                borderRadius: "50%",

                "&:hover": {
                  bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                },
              }}
              onClick={() => setOpenFilterViewer(true)}
            />
          ) : viewer == "public" ? (
            <PublicIcon
              sx={{
                fontSize: 16,
                cursor: "pointer",
                borderRadius: "50%",

                "&:hover": {
                  bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                },
              }}
              onClick={() => setOpenFilterViewer(true)}
            />
          ) : (
            <LockIcon
              sx={{
                fontSize: 16,
                cursor: "pointer",
                borderRadius: "50%",

                "&:hover": {
                  bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                },
              }}
              onClick={() => setOpenFilterViewer(true)}
            />
          )}
        </Stack>

        {isOwner && (
          <FilterViewer
            open={openFilterViewer}
            onClose={() => setOpenFilterViewer(false)}
            setViewer={setViewer}
            viewer={viewer}
            title="post"
            itemId={post._id}
            userId={post.userId._id}
          />
        )}
      </Stack>
    </Stack>
  );
}

function Comments({ theme, id, userLogin, postCommets, setPostComments }) {
  const [text, setText] = useState("");
  const mutation = useleaveComment();
  const queryClient = useQueryClient();

  function sendText() {
    const data = {};
    data.id = id;
    data.comment = text;
    data.username = userLogin.username;
    data.userId = userLogin.id;
    data.profileImg = userLogin.profileImg;

    mutation.mutate(data, {
      onSuccess(d) {
        queryClient.invalidateQueries({ queryKey: ["singlePost"] });
        console.log("dddd", d);
        setText("");
        setPostComments([
          ...postCommets,
          {
            comment: text,
            username: userLogin.username,
            userId: userLogin.id,
            profileImg: userLogin.profileImg
              ? SERVER_URL + userLogin.profileImg
              : noImage,
          },
        ]);
      },
      onError(e) {
        console.log("error", e);
      },
    });
  }

  return (
    <Stack
      sx={{
        mt: 3,
        px: 1,
        gap: 2,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "6px",
        border: "1px solid",
        borderColor: theme === "dark" ? "grey.800" : "grey.200",
        bgcolor: theme === "dark" ? "grey.800" : "grey.200",
        "&:focus": {
          outline: "none",
          borderColor: theme === "dark" ? "grey.200" : "grey.800",
        },
      }}
    >
      <TextField
        placeholder="Write your comment"
        multiline
        sx={{
          width: "100%",
          fontSize: 15,
          px: 1,
          py: 1,
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box sx={{ cursor: "pointer" }} onClick={sendText}>
        <SendIcon
          sx={text ? { color: "#1976d2", "&:hover": { color: "#1769aa" } } : ""}
        />
      </Box>
    </Stack>
  );
}

function ShowComment({ c }) {
  console.log("ccc", c);
  return (
    <Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Box
          sx={{ width: "20px", height: "20px" }}
          component="img"
          src={c.image ? SERVER_URL + c.image : noImage}
        />
        <Typography>{c.username}</Typography>
      </Stack>
      <Typography>{c.comment}</Typography>
    </Stack>
  );
}
