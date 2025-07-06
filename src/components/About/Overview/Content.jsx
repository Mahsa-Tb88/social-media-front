import { Stack, Typography } from "@mui/material";
import React from "react";
import ShowIcon from "../ShowIcon";

export default function Content({ subject, value, text }) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      {subject == "Status" && value == "Married" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : subject == "Status" && value == "In relationship" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : subject == "Status" && value == "Single" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : (
        <ShowIcon subject={subject} sx={{ mr: 1 }} />
      )}
      <Typography>{text}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}
