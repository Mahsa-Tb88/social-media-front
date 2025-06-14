import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MyIconButton(props) {
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;

  return (
    <IconButton sx={{ ...sx, bgcolor: "backgroundColor.dark" }} {...ps}>
      {props.children}
    </IconButton>
  );
}
