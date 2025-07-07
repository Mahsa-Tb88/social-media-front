import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../ShowIcon";

// eslint-disable-next-line react/prop-types
export default function ContentEducation({ e }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
      }}
    >
      <Box sx={{ mr: 1 }}>
        <ShowIcon subject="Education" />
      </Box>
      <Stack sx={{ mb: 1 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Typography>{e.field}</Typography>
          {e.univrsity && (
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography sx={{ mx: 1 }}>{" at "}</Typography>
              <Typography>{e.univrsity}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack>
          <Stack sx={{ flexDirection: "row" }}>
            {e.degree && (
              <>
                <Typography>{e.degree}</Typography>
                <Typography sx={{ mx: 1 }}>{e.degree && "|"}</Typography>{" "}
              </>
            )}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{e.startYear}</Typography>
              {e.startYear && e.isCurrently ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : e.startYear && e.endYear ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : (
                ""
              )}

              {e.endYear ? (
                <Typography> {e.endYear}</Typography>
              ) : e.isCurrently ? (
                <Typography>Currently</Typography>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
