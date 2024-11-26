import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useInitialize } from "../utils/queries";

export default function Initializer() {
  const { isPending, error, data } = useInitialize();
  console.log("/////");

  useEffect(() => {
    console.log("data...", data);
  }, [data]);

  return <Stack></Stack>;
}
