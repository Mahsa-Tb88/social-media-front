/* eslint-disable react/prop-types */
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import CommentLike from "../like/CommentLike";
import InputComment from "./InputComment";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TextComment({ c, setPostComments, postComments }) {
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState(false);
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  function userLike() {
    let findUser;
    findUser = c.likes.find((u) => u._id == userLogin.id);
    if (findUser) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Stack>
      {c.text.length > 200 ? (
        <Typography sx={{ textAlign: "justify" }}>
          {!showMore ? c.text.slice(0, 200) + " ..." : c.text}
          <Button
            variant="text"
            sx={{ textAlign: "left", width: "100px" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Back" : "View more"}
          </Button>
        </Typography>
      ) : (
        <Stack
          sx={{ ml: 1, mb: 1, flexDirection: "row", alignItems: "center" }}
        >
          {c.mentionUser && (
            <Typography
              sx={{ color: "#1976d2", mr: 1 }}
              onClick={() => navigate("./profile" + c._id)}
            >
              {c.mentionUser.deleted
                ? "Deleted User"
                : c.mentionUser.username[0].toUpperCase() +
                  c.mentionUser.username.slice(1)}
            </Typography>
          )}
          <Typography>{c.text[0].toUpperCase() + c.text.slice(1)}</Typography>
        </Stack>
      )}
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <CommentLike comment={c} userLike={userLike()} />
        {!c?.replyTo && !c?.userId?.deleted && (
          <Button
            variant="text"
            sx={{ maxWidth: "80px" }}
            onClick={() => setReply(true)}
          >
            Reply
          </Button>
        )}
      </Stack>
      {reply && !c?.replyTo && (
        <InputComment replyTo={c._id} postId={c.postId} setReply={setReply} />
      )}

      {!c?.replyTo &&
        c?.replies.length > 0 &&
        c.replies.map((r) => {
          return (
            <Stack key={c._id}>
              <Comment
                c={r}
                setPostComments={setPostComments}
                postComments={postComments}
                postId={r.postId}
              />
            </Stack>
          );
        })}
    </Stack>
  );
}
