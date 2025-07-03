/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextComment from "./TextComment";
import noImage from "../../../../../assets/images/user.png";
import DeleteCommnet from "./DeleteCommnet";
import React from "react";

export default function Comment({ c, setPostComments, postComments, post }) {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.user.profile);
  const userLoginId = userLogin.id;

  return (
    <Stack
      sx={{
        bgcolor: !c?.replyTo ? "backgroundColor.main" : "backgroundColor.dark",
        p: 1,
        m: 1,
        borderRadius: "5px",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
            },
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
          onClick={() => navigate("/profile/" + c.userId._id)}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
            component="img"
            src={
              c.userId.profileImg ? SERVER_URL + c.userId.profileImg : noImage
            }
          />
          <Typography sx={{ fontWeight: "bold" }}>
            {c.userId.deleted
              ? "Deleted User"
              : c.userId.username[0].toUpperCase() + c.userId.username.slice(1)}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ fontSize: "10px" }}>
            {new Date(c.createdAt).toLocaleDateString()}
          </Typography>
          {(post?.userId?._id == userLoginId ||
            post?.userId == userLoginId ||
            c.userId._id == userLoginId) && (
            <DeleteCommnet
              setPostComments={setPostComments}
              postComments={postComments}
              comment={c}
              postId={post?._id}
              replyTo={c.replyTo}
            />
          )}
        </Stack>
      </Stack>

      <TextComment
        c={c}
        setPostComments={setPostComments}
        postComments={postComments}
        post={post}
      />
    </Stack>
  );
}
