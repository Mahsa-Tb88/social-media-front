import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import noImage from "../../../../assets/images/user.png";
import ItemAbout from "../ItemAbout";


export default function Family() {
  const family = [
    {
      title: "Relationship",
      items: [
        {
          user: {
            username: "Hossein88",
            img: noImage,
            status: "Married",
            viewer: "public",
          },
        },
      ],
    },
    {
      title: "Family members",
      items: [
        {
          user: {
            username: "Nasim87",
            img: noImage,
            status: "Sister",
            viewer: "public",
          },
        },
      ],
    },
  ];

  const [list, setList] = useState(family);

  return (
    <Stack>
      {list.map((i) => {
        return (
          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
              {i.title}
            </Typography>
            <Stack spacing={1}>
              {i.items.map((j) => {
                return (
                  <Stack key={j}>
                    <ItemAbout
                      myViewer={j.viewer}
                      list={i.items}
                      setList={setList}
                      value={j.username + " or" + j.status}
                      subject={i.title}
                    >
                      <Stack sx={{ mb: 1 }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <img
                            src={j.user.img}
                            height={50}
                            width={50}
                            style={{
                              border: "var(--border)",
                              borderRadius: "50%",
                            }}
                          />
                          <Stack>
                            <Typography>{j.user.username}</Typography>
                            <Box sx={{fontSize:13}}>{j.user.status}</Box>
                          </Stack>
                        </Stack>
                      </Stack>
                    </ItemAbout>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
