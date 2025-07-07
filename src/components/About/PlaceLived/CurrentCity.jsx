import { Stack } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddCurrentCity from "./AddCurrentCity";

// eslint-disable-next-line react/prop-types
export default function CurrentCity({ currentCity, isOwner, isFriend }) {
  return (
    <Stack>
      {Object.keys(currentCity).length != 0 ? (
        <Stack>
          {isOwner ? (
            <ItemAbout
              myViewer={currentCity.viewer}
              value={currentCity.value}
              subject={"Current city"}
              title="currentCity"
            >
              <Content object={currentCity} subject={"current city"} />
            </ItemAbout>
          ) : (
            <Content isOwner={isOwner} />
          )}
        </Stack>
      ) : !Object.keys(currentCity).length && (isFriend || isOwner) ? (
        <AddCurrentCity isOwner={isOwner} />
      ) : (
        ""
      )}
    </Stack>
  );
}
