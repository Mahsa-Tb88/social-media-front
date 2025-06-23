/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Box, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noImage from "../../../assets/images/user.png";

export default function UserLoginFriends({ friends }) {
  const isMobile = useSelector((state) => state.app.isMobile);
  const navigate = useNavigate();
  return (
    <Stack>
      {friends.listFriend.length == 0 ? (
        <Typography component={"h5"} variant="h5">
          There is no friend yet!
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {friends.listFriend.map((f) => {
            return (
              <Grid2
                size={{ xs: 4, md: 3 }}
                sx={{ textAlign: "center" }}
                key={f._id}
              >
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Box
                    component={"img"}
                    src={f.profileImg ? SERVER_URL + f.profileImg : noImage}
                    height={isMobile ? 50 : 80}
                    width={isMobile ? 50 : 80}
                    sx={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onClick={() => navigate("/profile/" + f._id)}
                  />
                  <Typography
                    sx={{
                      fontSize: isMobile ? "12px" : "18px",
                      mt: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/profile/" + f._id)}
                  >
                    {f.username[0].toUpperCase() + f.username.slice(1)}
                  </Typography>
                </Stack>
              </Grid2>
            );
          })}
        </Grid2>
      )}
    </Stack>
  );
}
