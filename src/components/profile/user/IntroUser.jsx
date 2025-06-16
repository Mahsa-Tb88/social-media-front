/* eslint-disable react/prop-types */
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../../../components/About/ShowIcon";

export default function IntroUser({ data }) {
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];
  const keys = Object.keys(data?.overview);

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
        intro.map((item, index) => {
          return (
            <Stack key={index}>
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
