import { Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";

// eslint-disable-next-line react/prop-types
export default function Content({ object, subject }) {
  const theme = useSelector((state) => state.app.theme);

  return (
    <Stack sx={{ mb: 1 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 1 }}>
          <ShowIcon subject={subject} />
          <Stack>
            <Typography
              sx={{ color: theme == "light" ? "grey.900" : "grey.100" }}
            >
              {object.value}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme == "dark" && "grey.300",
              }}
            >
              {subject}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
