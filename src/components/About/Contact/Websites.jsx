import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddSubject from "./AddSubject";

// eslint-disable-next-line react/prop-types
export default function Websites({ data, isFriend, isOwner }) {
  return (
    <Stack>
      {
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          Website & Social Media
        </Typography>
      }

      <Stack spacing={2}>
        {["Website", "LinkedIn", "Github"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title={"contactBaseInfo"}
                key={index}
              >
                <Content item={item} dataItem={data[item]} />
              </ItemAbout>
            ) : (
              <Content item={item} dataItem={data[item]} />
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
