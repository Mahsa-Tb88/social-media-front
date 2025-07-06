import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddSubRel from "./AddSubRel";

export default function Relationship({ relationship, isOwner, isFriend }) {
  return (
    <Stack sx={{ mb: 4 }} spacing={1}>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Relationship
      </Typography>
      {Object.keys(relationship).length != 0 ? (
        <Stack>
          {isOwner ? (
            <ItemAbout
              myViewer={relationship.viewer}
              value={relationship}
              subject={"Relationship"}
              title="Relationship"
            >
              <Content item={relationship} />
            </ItemAbout>
          ) : (
            <Content item={relationship} />
          )}
        </Stack>
      ) : !Object.keys(relationship).length && (isFriend || isOwner) ? (
        <AddSubRel isOwner={isOwner} isFriend={isFriend} />
      ) : (
        ""
      )}
    </Stack>
  );
}
