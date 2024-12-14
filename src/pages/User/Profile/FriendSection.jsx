import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";
import { purple, red } from "@mui/material/colors";

export default function FriendSection() {
  const user = useSelector((state) => state.user);

  return (
    <Stack>
      <Typography sx={{ fontWeight: "Bold", fontSize: 20, mb: 1 }}>
        Friends
      </Typography>
      <Divider />
      {user?.friends?.length ? (
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: 17 }}>
            You have not make friends yet!
          </Typography>
          <Button size="large" sx={{ width: "200px", fontSize: 18 }}>
            Find Friends
          </Button>
        </Stack>
      ) : (
        <Stack mt={2}>
          {/*  {user.friends.map((f) => {
          return <Stack></Stack>;
        })} */}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={noImage}
              sx={{ height: "50px", width: "50px", borderRadius: "50%" }}
            />
            <Typography>username</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
