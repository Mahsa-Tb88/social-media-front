import { Stack } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddHometown from "./AddHometown";

// eslint-disable-next-line react/prop-types
export default function Hometown({ hometown, isOwner, isFriend }) {
  return (
    <Stack>
      {Object.keys(hometown).length != 0 ? (
        <Stack>
          {isOwner ? (
            <ItemAbout
              myViewer={hometown.viewer}
              value={hometown.value}
              subject={"Hometown"}
              title="hometown"
            >
              <Content object={hometown} subject={"Hometown"} />
            </ItemAbout>
          ) : (
            <Content object={hometown} subject={"Hometown"} />
          )}
        </Stack>
      ) : !Object.keys(hometown).length && (isOwner || isFriend) ? (
        <AddHometown isOwner={isOwner} />
      ) : (
        ""
      )}
    </Stack>
  );
}
