import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MyIconButton(props) {
  const ps = { ...props };
  const sx = ps.sx ?? {};
  delete ps.sx;
  const isMobile = useSelector((state) => state.app.isMobile);

  return (
    <IconButton
      sx={{
        ...sx,
        bgcolor: "backgroundColor.light",
        width: isMobile ? 30 : 40,
        height: isMobile ? 30 : 40,
      }}
      {...ps}
    >
      {props.children}
    </IconButton>
  );
}
