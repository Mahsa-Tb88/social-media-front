import React, { useState } from "react";
import backGround from "../../../../../assets/images/back.jpg";
import { Box, Container, Grid2, Stack } from "@mui/material";
import ProfileInfoUser from "./ProfileInfoUser";
export default function ProfileHeaderUser({ user }) {
  const [backgroundImg, setBackgroundImg] = useState(
    user.backgroundImg ? SERVER_URL + user.backgroundImg : backGround
  );

  return (
    <Container>
      <Grid2 container>
        <Grid2 size={12} sx={{ mt: 3 }}>
          <Stack sx={{ height: "300px", position: "relative" }}>
            <Stack sx={{ width: "100%", height: "100%" }}>
              <Box
                src={backgroundImg}
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                }}
                component="img"
              />
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <ProfileInfoUser user={user} />
    </Container>
  );
}
