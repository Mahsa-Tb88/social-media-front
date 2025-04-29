import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FilterViewer from "../../userLogin/FilterViewer";
import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../../../../components/Customized/MyIconButton";
import noImage from "../../../../../../assets/images/user.png";
import { useSelector } from "react-redux";
import MenuPost from "../../userLogin/MenuPost";

import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation, useParams } from "react-router-dom";
import CommentList from "./comment/CommentList";
import InputComment from "./comment/InputComment";
import PostLike from "./like/PostLike";
import { useGetComments } from "../../../../../../utils/queries";
import Loading from "../../../../../../components/Loading";
import LoadingError from "../../../../../../components/LoadingError";

export default function SinglePost({ post, profile }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const [postComments, setPostComments] = useState([]);
  const [filterComments, setFilterComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [openMenuPost, setOpenMenuPost] = useState(false);
  const menuPostAnchor = useRef(null);
  const location = useLocation();
  let id = useParams().id;
  const { isPending, error, data, refetch } = useGetComments(post._id);

  useEffect(() => {
    if (data) {
      const comments1 = data.data.body.filter((p) => p.replyId == "");
      const comments2 = data.data.body.filter((p) => p.replyId != "");
      setPostComments(comments1);
      setFilterComments(comments2);
    }
  }, [data]);


  if (location.pathname.includes("post")) {
    id = post.userId._id;
  }
  const isOwner = id == userLogin.id ? true : false;

  console.log("dataa", data);
  console.log("filter-singlepost", filterComments);
  console.log("post-singlepost", postComments);

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
                <Edit sx={{ fontSize: 15 }} ref={menuPostAnchor} />
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
            anchorEl={menuPostAnchor.current}
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
          <PostLike post={post} />
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
            onClick={() => setShowComments(true)}
          >
            <ChatIcon />
            <Typography>Comments</Typography>
            <Typography>
              {postComments.length + filterComments.length}
            </Typography>
          </Stack>
          {/* <Stack
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
          </Stack> */}
        </Stack>

        <Divider sx={{ my: 1 }} />
        {isPending ? (
          <Loading message="Is loading..." />
        ) : error ? (
          <LoadingError handleAction={refetch} message={error.message} />
        ) : (
          <CommentList
            postComments={postComments}
            filterComments={filterComments}
            setFilterComments={setFilterComments}
            setShowComments={setShowComments}
            showComments={showComments}
            setPostComments={setPostComments}
            postId={post._id}
          />
        )}
        <InputComment post={post} type="commnet" replyId={""} />
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
