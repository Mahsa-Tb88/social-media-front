/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../../../assets/images/user.png";

// eslint-disable-next-line react/prop-types
export default function Content({ item }) {
  const navigate = useNavigate();

  return (
    <Stack sx={{ mb: 1 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => navigate("/profile/" + item.id)}
      >
        <img
          src={item?.profileImg ? SERVER_URL + item.profileImg : noImage}
          height={50}
          width={50}
          style={{
            border: "var(--border)",
            borderRadius: "50%",

            objectFit: "cover",
            display: "block",
          }}
        />
        <Stack>
          <Typography>{item?.username}</Typography>
          <Box sx={{ fontSize: 13 }}>{item?.status}</Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
