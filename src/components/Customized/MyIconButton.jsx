import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MyIconButton(props) {
  const theme = useSelector((state) => state.app.theme);
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;

  return (
    <IconButton
      sx={{ ...sx, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}
      {...ps}
    >
      {props.children}
    </IconButton>
  );
}
