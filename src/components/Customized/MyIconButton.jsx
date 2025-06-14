import { IconButton } from "@mui/material";
import React from "react";


export default function MyIconButton(props) {
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;

  return (
    <IconButton sx={{ ...sx, bgcolor: "backgroundColor.light" }} {...ps}>
      {props.children}
    </IconButton>
  );
}
