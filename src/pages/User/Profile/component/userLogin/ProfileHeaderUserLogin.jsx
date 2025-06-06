import { Box, Container, Grid2, Stack } from "@mui/material";
import { useState } from "react";
import BackgroundChange from "./BackgroundChange";
import MyIconButton from "../../../../../components/Customized/MyIconButton";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import backGround from "../../../../../assets/images/back.jpg";

import ProfileInfoUserLogin from "./ProfileInfoUserLogin";

export default function ProfileHeaderUserLogin() {
  const userLogin = useSelector((state) => state.user.profile);
  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    userLogin.backgroundImg ? SERVER_URL + userLogin.backgroundImg : backGround
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

              <MyIconButton
                sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                onClick={() => setBackgroundOpen(true)}
              >
                <Edit />
              </MyIconButton>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
      <ProfileInfoUserLogin />

      <BackgroundChange
        open={backgroundOpen}
        onClose={() => setBackgroundOpen(false)}
        setBackgroundImg={setBackgroundImg}
      />
    </Container>
  );
}
