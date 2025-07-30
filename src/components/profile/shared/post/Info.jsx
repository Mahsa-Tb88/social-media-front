/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import FilterViewer from "../../userLogin/FilterViewer";
import noImage from "../../../../assets/images/user.png";
import GroupIcon from "@mui/icons-material/Group";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

export default function Info({
  profile,
  post,
  isOwner,
  userLogin,
  viewer,
  setViewer,
}) {

  
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const location = useLocation();

  let userId = post.userId._id;

  if (location.pathname.includes("profile")) {
    userId = post.userId;
  }

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
        src={
          userLogin.id == profile._id
            ? userLogin.profileImg
              ? userLogin.profileImg.includes(SERVER_URL)
                ? userLogin.profileImg
                : SERVER_URL + userLogin.profileImg
              : noImage
            : profile.profileImg
              ? profile.profileImg.includes(SERVER_URL)
                ? profile.profileImg
                : SERVER_URL + profile.profileImg
              : noImage
        }
        sx={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
          display: "block",
        }}
        onClick={() => navigate("/profile/" + userId)}
      />
      <Stack>
        <Typography
          sx={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => navigate("/profile/" + userId)}
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
            userId={userId}
          />
        )}
      </Stack>
    </Stack>
  );
}
