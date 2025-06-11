import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noImage from "../../../../../assets/images/user.png";

export default function UserLoginFriends() {
  const userLogin = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const [listFriend, setListFriend] = useState(userLogin.friends.listFriend);

  useEffect(() => {
    const filterList = userLogin.friends.listFriend.filter(
      (f) => f.status == "accepted"
    );
    setListFriend(filterList);
  }, [userLogin?.friends?.listFriend]);

  return (
    <Stack>
      {listFriend.length == 0 ? (
        <Typography component={"h5"} variant="h5">
          There is no friend yet!
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {listFriend.map((f) => {
            return (
              <Grid2 size={3} sx={{ textAlign: "center" }}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
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
                    {f.username[0].toUpperCase()+f.username.slice(1)}
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
