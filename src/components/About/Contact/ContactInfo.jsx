import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";
import Content from "./Content";
import AddSubject from "./AddSubject";

// eslint-disable-next-line react/prop-types
export default function ContactInfo({ data, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Contact
      </Typography>
      <Stack spacing={1}>
        {["Mobile", "Email"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title={"contactBaseInfo"}
                index={index}
              >
                <Content item={item} dataItem={data[item]} />
              </ItemAbout>
            ) : (
              <Content item={item} dataItem={data[item]} />
            )
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} isOwner={isOwner} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}
