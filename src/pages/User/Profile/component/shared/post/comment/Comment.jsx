import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextComment from "./TextComment";
import noImage from "../../../../../../../assets/images/user.png";
import DeleteCommnet from "./DeleteCommnet";

export default function Comment({ c, setPostComments, postComments, postId }) {
  const id = useParams().id;
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);

  const userLogin = useSelector((state) => state.user.profile);
  const userLoginId = userLogin.id;

  return (
    <Stack
      sx={{
        backgroundColor: !c?.replyTo
          ? theme === "dark"
            ? "grey.700"
            : "grey.200"
          : theme === "dark"
          ? "grey.800"
          : "grey.300",
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
            sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
            component="img"
            src={
              c.userId.profileImg ? SERVER_URL + c.userId.profileImg : noImage
            }
          />
          <Typography sx={{ fontWeight: "bold" }}>
            {c.userId.username}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ fontSize: "10px" }}>
            {new Date(c.createdAt).toLocaleDateString()}
          </Typography>
          {(id == userLoginId || c.userId._id == userLoginId) && (
            <DeleteCommnet
              setPostComments={setPostComments}
              postComments={postComments}
              comment={c}
              postId={postId}
              replyTo={c.replyTo}
            />
          )}
        </Stack>
      </Stack>

      <TextComment
        c={c}
        setPostComments={setPostComments}
        postComments={postComments}
      />
    </Stack>
  );
}
