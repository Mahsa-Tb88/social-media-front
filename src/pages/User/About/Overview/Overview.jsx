import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import { useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";

export default function Overview() {
  const listOverview = [
    {
      text: "Study at",
      value: "Isfahan University",
      myViewer: "public",
      subject: "School",
    },
    {
      text: "Lives in",
      value: "Canada",
      myViewer: "friends",
      subject: "Location",
    },
    {
      text: "From",
      value: "Tabriz",
      myViewer: "public",
      subject: "Hometown",
    },
    {
      text: "I am",
      value: "Married",
      myViewer: "public",
      subject: "Status",
    },
    {
      text: "Phone",
      value: "28282828",
      myViewer: "private",
      subject: "Phone",
    },
    {
      text: "Email",
      value: "mah@gmail.com",
      myViewer: "private",
      subject: "Email",
    },
  ];
  const theme = useSelector((state) => state.app.theme);
  const [list, setList] = useState(listOverview);

  return (
    <Stack sx={{ gap: 4 }}>
      {list.map((p, index) => {
        return (
          <Stack key={index}>
            <ItemAbout
              myViewer={p.myViewer}
              list={list}
              setList={setList}
              value={p.value}
              subject={p.subject}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      color: "grey.600",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {p.subject == "Status" ? (
                      <ShowIcon subject={p.value} />
                    ) : (
                      <ShowIcon subject={p.subject} />
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme == "light" ? "grey.700" : "grey.300",
                      fontSize: 18,
                    }}
                  >
                    {p.text}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>{p.value}</Typography>
                </Stack>
              </Stack>
            </ItemAbout>
          </Stack>
        );
      })}
    </Stack>
  );
}
