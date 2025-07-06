import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import ShowIcon from "../ShowIcon";
import AddSubFamily from "./AddSubFamily";

export default function Family({ family, isOwner, isFriend }) {
  <Stack sx={{ mb: 4 }} spacing={1}>
    <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
      Family
    </Typography>

    <Stack spacing={1}>
      {family.length ? (
        family.map((j) => {
          return (
            <Stack key={j.id}>
              {isOwner ? (
                <ItemAbout
                  myViewer={j.viewer}
                  value={j}
                  subject={"Family"}
                  id={j.id}
                  title="Family"
                >
                  <Content item={j} />
                </ItemAbout>
              ) : (
                <Content item={j} />
              )}
            </Stack>
          );
        })
      ) : !family.length && isFriend ? (
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Box>
            <ShowIcon subject="Family" />
          </Box>
          <Typography>Noting is added yet!</Typography>
        </Stack>
      ) : (
        ""
      )}
    </Stack>
    {isOwner && <AddSubFamily />}
  </Stack>;
}
