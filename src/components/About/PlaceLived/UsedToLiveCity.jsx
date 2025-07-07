import { Stack } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddUsedToLived from "./AddUsedToLived";

export default function UsedToLiveCity({ usedToLiveCity, isOwner, isFriend }) {
  return (
    <Stack spacing={usedToLiveCity.length ? 3 : ""}>
      <Stack spacing={3}>
        {usedToLiveCity.length > 0 &&
          usedToLiveCity.map((j) => {
            return (
              <Stack key={j}>
                {isOwner ? (
                  <ItemAbout
                    myViewer={j.viewer}
                    value={j.value}
                    subject={"Used to live"}
                    id={j.id}
                    title="usedToLiveCity"
                  >
                    <Content subject={"Used to live"} object={j} />
                  </ItemAbout>
                ) : (
                  <Content subject={"Used to live"} object={j} />
                )}
              </Stack>
            );
          })}
      </Stack>
      {isOwner || isFriend ? (
        <AddUsedToLived isOwner={isOwner} length={usedToLiveCity.length} />
      ) : (
        ""
      )}
    </Stack>
  );
}
