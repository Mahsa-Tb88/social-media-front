import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import { useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import { DataObject } from "@mui/icons-material";

export default function Overview() {
  const listOverview = [
    {
      title: "Study at",
      value: "Isfahan University",
      myViewer: "public",
      subject: "School",
    },
    {
      title: "Lives in",
      value: "Canada",
      myViewer: "friends",
      subject: "Location",
    },
    {
      title: "From",
      value: "Tabriz",
      myViewer: "public",
      subject: "Born in",
    },
    {
      title: "I am",
      value: "Married",
      myViewer: "public",
      subject: "Status",
    },
    {
      title: "Phone",
      value: "28282828",
      myViewer: "private",
      subject: "Phone",
    },
    {
      title: "Email",
      value: "mah@gmail.com",
      myViewer: "private",
      subject: "Email",
    },
  ];
  const params = useParams();
  const { isPending, data } = useGetOverview(params.is);
  console.log("dataaaa", data);
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
                    {p.title}
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
