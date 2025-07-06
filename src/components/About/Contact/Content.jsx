import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../ShowIcon";

// eslint-disable-next-line react/prop-types
export default function Content({ dataItem, item }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <ShowIcon subject={item} />
      </Box>
      <Stack>
        <Stack>
          <Typography>{dataItem.value}</Typography>
          <Typography sx={{ fontSize: 10 }}>{item}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
