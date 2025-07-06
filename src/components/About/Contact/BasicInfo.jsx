import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddSubject from "./AddSubject";

// eslint-disable-next-line react/prop-types
export default function BasicInfo({ data, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      <Stack spacing={1}>
        {["Gender", "Pronouns", "Birthday", "Language"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title="contactBaseInfo"
                key={index}
              >
                <Content dataItem={data[item]} item={item} />
              </ItemAbout>
            ) : (
              <Content dataItem={data[item]} item={item} />
            )
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} isOwner={isOwner} key={index} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}
