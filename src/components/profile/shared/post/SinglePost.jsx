/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../../components/Customized/MyIconButton";
import { useSelector } from "react-redux";
import MenuPost from "../../userLogin/MenuPost";
import React from "react";

import ChatIcon from "@mui/icons-material/Chat";

import { useLocation, useParams } from "react-router-dom";
import CommentList from "./comment/CommentList";
import InputComment from "./comment/InputComment";
import Info from "./Info";
import PostLike from "./like/PostLike";
import { useGetCommentPost } from "../../../../utils/queries";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import LoginFirst from "../../../../pages/Home/LoginFirst";

export default function SinglePost({ post, profile }) {
  const userLogin = useSelector((state) => state.user.profile);
  const [postComments, setPostComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openLoginUser, setOpenLoginUser] = useState(false);
  const [openMenuPost, setOpenMenuPost] = useState(false);
  const [viewer, setViewer] = useState(post.viewer);

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

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  console.log("post", post.desc.length);
  return (
    <Stack>
      <Paper key={post.createdAt} sx={{ mb: 4, p: 2 }}>
        <Info
          post={post}
          profile={profile}
          isOwner={isOwner}
          userLogin={userLogin}
          viewer={viewer}
          setViewer={setViewer}
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
                sx={{ maxWidth: "100%", maxHeight: 500, borderRadius: "5px" }}
              />
            ) : post.video ? (
              <Box sx={{ maxWidth: "100%", margin: "auto" }}>
                <video
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  controls
                  key={post.video}
                >
                  <source src={SERVER_URL + post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ) : (
              ""
            )}
          </Stack>

          {
            <Typography sx={{ whiteSpace: "pre-line", textAlign: "justify" }}>
              {post.desc.length > 300 && !expanded
                ? `${post.desc.slice(0, 250)}... `
                : post.desc.length
                  ? post.desc
                  : ""}
              {post.desc.length > 300 && (
                <Typography
                  component="span"
                  onClick={handleToggle}
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  {expanded ? "Show less" : "Show more"}
                </Typography>
              )}
            </Typography>
          }

          <MenuPost
            open={openMenuPost}
            anchorEl={menuPostAnchor.current}
            handleClose={() => setOpenMenuPost(false)}
            post={post}
            viewer={viewer}
            setViewer={setViewer}
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
            <LoadingError handleAction={refetch} message={error.response.data.message} />
          ) : (
            <CommentList
              postComments={postComments}
              setShowComments={setShowComments}
              showComments={showComments}
              setPostComments={setPostComments}
              post={post}
            />
          )}
        </Stack>
        {userLogin.id && <InputComment postId={post._id} />}
      </Paper>
    </Stack>
  );
}
