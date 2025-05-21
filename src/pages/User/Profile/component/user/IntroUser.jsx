import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../../../About/ShowIcon";
import { useSelector } from "react-redux";

export default function IntroUser({ data }) {
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];
  const keys = Object.keys(data?.overview);

  // function findKeys() {
  //   let m = 0;
  //   for (let i = 0; i < intro.length; i++) {
  //     if (keys.includes(intro[i])) {
  //       m = m + 1;
  //       break;
  //     }
  //   }
  //   return m;
  // }

  return (
    <Stack>
      {!keys.length && !data.isFriend ? (
        <Stack
          sx={{
            mb: 10,
            textAlign: "center",
          }}
        >
          <Divider />
          <Typography component={"h3"} variant="h5" sx={{ pt: 2 }}>
            This section is private!
          </Typography>
        </Stack>
      ) : !keys.length ? (
        "Nothing is added yet!"
      ) : (
        intro.map((item) => {
          return (
            <Stack>
              {keys.length && data.overview[item]?.value ? (
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}
                >
                  <ShowIcon subject={item} item={data.overview[item].value} />
                  <Typography sx={{ ml: 2 }}>
                    {data.overview[item].value}
                  </Typography>
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
