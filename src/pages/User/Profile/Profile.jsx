import { Box, Container, Grid2, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import backGround from "../../../assets/images/back.jpg";
import noImage from "../../../assets/images/user.png";
import { Edit } from "@mui/icons-material";
import MyIconButton from "../../../components/Customized/MyIconButton";
import BackgroundChange from "../BackgroundChange";

export default function Profile() {
  const user = useSelector((state) => state.user);
  console.log("profile user", user);

  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    user.profile?.backImg ? SERVER_URL + user.profile.backImg : backGround
  );

  return (
    <Container>
      <Grid2 container>
        <Grid2 size={12} sx={{ mt: 3 }}>
          <Stack sx={{ height: "400px", position: "relative" }}>
            <Stack sx={{ width: "100%", height: "100%", position: "relative" }}>
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
              <MyIconButton
                sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                onClick={() => setBackgroundOpen(true)}
              >
                <Edit />
              </MyIconButton>
            </Stack>

            <Box
              component="img"
              src={user?.profileImg ? user.profileImg : noImage}
              sx={{
                heigh: "20%",
                width: "20%",
                position: "absolute",
                bottom: "-25%",
                left: "10%",
                border: "var(--border)",
                borderRadius: "50%",
              }}
            />
          </Stack>
        </Grid2>
      </Grid2>
      <BackgroundChange
        open={backgroundOpen}
        onClose={() => setBackgroundOpen(false)}
        setBackgroundImg={setBackgroundImg}
      />
    </Container>
  );
}
