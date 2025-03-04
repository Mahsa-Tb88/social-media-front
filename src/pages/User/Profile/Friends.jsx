import { Box, Container, Grid2, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";
import { useNavigate } from "react-router-dom";

export default function Friends() {
  const userLogin = useSelector((state) => state.user.profile);
  const theme = useSelector((state) => state.app.theme);
  const navigate = useNavigate();
  const [listFriend, setListFriend] = useState(userLogin.friends.listFriend);

  useEffect(() => {
    const filterList = userLogin.friends.listFriend.filter(
      (f) => f.status == "accepted"
    );
    setListFriend(filterList);
  }, [userLogin?.friends?.listFriend]);

  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {listFriend.length == 0 ? (
            <Typography component={"h5"} variant="h5">
              There is no friend yet!
            </Typography>
          ) : (
            <Grid2 container spacing={3}>
              {listFriend.map((f) => {
                return (
                  <Grid2 size={3} sx={{ textAlign: "center" }}>
                    <Stack
                      sx={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Box
                        component={"img"}
                        src={f.profileImg ? SERVER_URL + f.profileImg : noImage}
                        height={80}
                        width={80}
                        sx={{ borderRadius: "50%", cursor: "pointer" }}
                        onClick={() => navigate("/profile/" + f.id)}
                      />
                      <Typography
                        sx={{ fontSize: "18px", mt: 2, cursor: "pointer" }}
                        onClick={() => navigate("/profile/" + f.id)}
                      >
                        {f.username}
                      </Typography>
                    </Stack>
                  </Grid2>
                );
              })}
            </Grid2>
          )}
        </Paper>
      </Container>
    </Stack>
  );
}
