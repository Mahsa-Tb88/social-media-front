import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

// eslint-disable-next-line react/prop-types
export default function ContentWork({ w }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
      }}
    >
      <Box sx={{ mr: 1 }}>
        <HomeRepairServiceIcon />
      </Box>
      <Stack sx={{ mb: 1 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Typography>{w.position}</Typography>
          {w.company && (
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography sx={{ mx: 1 }}>{" at "}</Typography>
              <Typography>{w.company}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack>
          <Stack sx={{ flexDirection: "row" }}>
            {w.city && (
              <>
                <Typography>{w.city}</Typography>
                <Typography sx={{ mx: 1 }}>{w.city && "|"}</Typography>{" "}
              </>
            )}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{w.startYear}</Typography>
              {w.startYear && w.isCurrently ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : w.startYear && w.endYear ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : (
                ""
              )}

              {w.endYear ? (
                <Typography> {w.endYear}</Typography>
              ) : w.isCurrently ? (
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
