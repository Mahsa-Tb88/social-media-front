/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FilterViewer from "../../userLogin/FilterViewer";
import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../../components/Customized/MyIconButton";
import noImage from "../../../../assets/images/user.png";
import { useSelector } from "react-redux";
import MenuPost from "../../userLogin/MenuPost";
import React from "react";

import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommentList from "./comment/CommentList";
import InputComment from "./comment/InputComment";
import PostLike from "./like/PostLike";
import { useGetCommentPost } from "../../../../utils/queries";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import LoginFirst from "../../../../pages/Home/LoginFirst";

export default function SinglePost({ post, profile }) {
  const userLogin = useSelector((state) => state.user.profile);
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [openLoginUser, setOpenLoginUser] = useState(false);
  const [openMenuPost, setOpenMenuPost] = useState(false);
  const menuPostAnchor = useRef(null);
  const location = useLocation();
  let id = useParams().id;
  const { isPending, error, data, refetch } = useGetCommentPost(post._id);

  useEffect(() => {
    if (data) {
      setPostComments(data.data.body);
    }
  }, [data]);

  function numOfComment() {
    let number = postComments.length;
    postComments.forEach((c) => {
      number = number + c?.replies.length;
    });
    if (number) {
      return number;
    }
  }

  if (location.pathname.includes("post")) {
    id = post.userId._id;
  }
  const isOwner = id == userLogin.id && userLogin.id ? true : false;

  function buttonHandler() {
    if (userLogin.id) {
      setShowComments(true);
    } else {
      setOpenLoginUser(true);
    }
  }

  return (
    <Stack>
      <Paper key={post.createdAt} sx={{ mb: 4, p: 2 }}>
        <Info post={post} profile={profile} isOwner={isOwner} />
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
            {post.image ? (
              <Box
                component="img"
                src={SERVER_URL + post.image}
                sx={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            ) : post.video ? (
              <Box sx={{ maxWidth: "100%", margin: "auto" }}>
                <video width="100%" controls key={post.video}>
                  <source src={SERVER_URL + post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ) : (
              ""
            )}
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
                bgcolor: "backgroundColor.light",
              },
            }}
            onClick={() => buttonHandler()}
          >
            <ChatIcon />
            <Typography>Comments</Typography>
            <Typography>{numOfComment()}</Typography>
          </Stack>
          <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
        </Stack>

        <Divider sx={{ my: 1 }} />
        <Stack>
          {isPending ? (
            <Loading message="Is loading..." />
          ) : error ? (
            <LoadingError
              handleAction={refetch}
              message={error.response.data.message}
            />
          ) : (
            <CommentList
              postComments={postComments}
              setShowComments={setShowComments}
              showComments={showComments}
              setPostComments={setPostComments}
              postId={post._id}
            />
          )}
        </Stack>
        {userLogin.id && (
          <InputComment postId={post._id} userGetComm={post.userId} />
        )}
      </Paper>
    </Stack>
  );
}

function Info({ profile, post, isOwner }) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(post.viewer);
  const navigate = useNavigate();

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
        src={profile.profileImg ? SERVER_URL + profile.profileImg : noImage}
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => navigate("profile/" + post.userId._id)}
      />
      <Stack>
        <Typography
          sx={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => navigate("profile/" + post.userId._id)}
        >
          {profile.username[0].toUpperCase() + profile.username.slice(1)}
        </Typography>
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
                  bgcolor: "backgroundColor.light",
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
                  bgcolor: "backgroundColor.light",
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
                  bgcolor: "backgroundColor.light",
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
