import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../../../About/ShowIcon";
import { useSelector } from "react-redux";

export default function IntroUser({ overview }) {
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];
  console.log("overvieww isssss", overview);
  const userLogin = useSelector((state) => state.user.profile);

  // function isPrivate() {
  //   const findFriend = userLogin.friends.listFriend.find(
  //     (f) => f.id == user._id
  //   );
  //   if (findFriend) {
  //     if (findFriend.status == "pending") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  const keys = Object.keys(overview);

  function findKeys() {
    let m = 0;
    for (let i = 0; i < intro.length; i++) {
      if (keys.includes(intro[i])) {
        m = m + 1;
        break;
      }
    }
    return m;
  }

  if (!findKeys() && "!isPrivate()") {
    return <Stack>Nothing to show!</Stack>;
  } else {
  }

  return (
    <Stack>
      {"isPrivate()" ? (
        <Stack
          sx={{
            mt: 25,
            mb: 10,
            textAlign: "center",
          }}
        >
          <Divider />
          <Typography component={"h3"} variant="h5" sx={{ pt: 2 }}>
            This profile is private
          </Typography>
        </Stack>
      ) : (
        intro.map((item) => {
          return (
            <Stack>
              {overview && overview[item]?.value ? (
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <ShowIcon subject={item} item={overview[item].value} />
                  <Typography sx={{ ml: 2 }}>{overview[item].value}</Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
