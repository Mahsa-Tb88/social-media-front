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
  console.log("comment is ---", c);
  console.log("post-Comments", postComments);

  const userLogin = useSelector((state) => state.user.profile);
  const userLoginId = userLogin.id;

  return (
    <Stack
      sx={{
        mb: 2,
        backgroundColor: theme === "dark" ? "grey.800" : "grey.200",
        p: 1,
        borderRadius: "5px",
      }}
    >
      <Stack>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
          onClick={() => navigate("/profile/" + c.userId)}
        >
          <Stack>
            <Box
              sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
              component="img"
              src={c.image ? SERVER_URL + c.image : noImage}
            />
            <Typography>{c.username}</Typography>
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "10px" }}>
              {new Date(c.createdAt).toLocaleDateString()}
            </Typography>
            {(id == userLoginId || c.userId == userLoginId) && (
              <DeleteCommnet
                setPostComments={setPostComments}
                postComments={postComments}
                id={c._id}
                postId={postId}
                replyId={c.replyId}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      {c.replyId == "" && <TextComment c={c} />}
    </Stack>
  );
}
