import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
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
import LockIcon from "@mui/icons-material/Lock";
import { useLocation, useParams } from "react-router-dom";

export default function SinglePost({ post, profile }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const location = useLocation();

  let id = useParams().id;
  if (location.pathname.includes("post")) {
    id = post.userId._id;
  }

  const [openMenuPost, setOpenMenuPost] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const menuAnchor = useRef(null);

  function hasPermission() {
    if (id == userLogin.id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Stack>
      <Paper key={post.createdAt} sx={{ mb: 4, p: 2 }}>
        <Info
          post={post}
          profile={profile}
          theme={theme}
          hasPermission={hasPermission}
        />
        <Stack spacing={2}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{post.title}</Typography>
            {hasPermission() && (
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

        <Box
          component="textarea"
          placeholder="Write your comment"
          minRows={3}
          sx={{
            mt: 3,
            width: "100%",
            borderColor: theme === "dark" ? "grey.800" : "grey.200",
            bgcolor: theme === "dark" ? "grey.800" : "grey.200",
            fontSize: 15,
            borderRadius: "15px",
            px: 1,
            py: 2,
            resize: "none",
            "&:focus": {
              outline: "none",
              borderColor: theme === "dark" ? "grey.200" : "grey.800",
            },
          }}
        />
      </Paper>
    </Stack>
  );
}

function Info({ profile, post, theme, hasPermission }) {
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

        {hasPermission() && (
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
