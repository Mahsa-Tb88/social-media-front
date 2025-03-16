import { Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../../../About/ShowIcon";

export default function IntroUser({ overview }) {
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];
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

  if (!findKeys()) {
    return <Stack>Nothing to show!</Stack>;
  } else {
  }

  return (
    <Stack>
      {intro.map((item) => {
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
      })}
    </Stack>
  );
}
