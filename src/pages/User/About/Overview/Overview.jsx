import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import { useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import { DataObject } from "@mui/icons-material";

export default function Overview() {
  const overview = useSelector((state) => state.user.overview);
  // const listOverview = [
  //   {
  //     title: "Study at",
  //     value: "Isfahan University",
  //     myViewer: "public",
  //     subject: "School",
  //   },
  //   {
  //     title: "Lives in",
  //     value: "Canada",
  //     myViewer: "friends",
  //     subject: "Location",
  //   },
  //   {
  //     title: "From",
  //     value: "Tabriz",
  //     myViewer: "public",
  //     subject: "Born in",
  //   },
  //   {
  //     title: "I am",
  //     value: "Married",
  //     myViewer: "public",
  //     subject: "Status",
  //   },
  //   {
  //     title: "Phone",
  //     value: "28282828",
  //     myViewer: "private",
  //     subject: "Phone",
  //   },
  //   {
  //     title: "Email",
  //     value: "mah@gmail.com",
  //     myViewer: "private",
  //     subject: "Email",
  //   },
  // ];
  // const params = useParams();

  const theme = useSelector((state) => state.app.theme);
  // const [list, setList] = useState(listOverview);

  const heeeu = [
    { school: "isf", viewer: "privat" },
    { location: "tab", viewer: "private" },
    { hometown: "can", viewer: "privat" },
    { status: "Married", viewer: "privat" },
    { cellphone: "22", viewer: "privat" },
    { email: "tt", viewer: "privat" },
  ];
  return (
    <Stack sx={{ gap: 4 }}>
      {heeeu.map((p, index) => {
        return (
          <Stack key={index}>
            <ItemAbout
              myViewer={p.viewer}
              value={Object.values(p)[0]}
              subject={Object.keys(p)[0]}
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
                    {Object.keys(p)[0] == "status" ? (
                      <ShowIcon subject={Object.values(p)[0]} />
                    ) : (
                      <ShowIcon subject={Object.keys(p)[0]} />
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme == "light" ? "grey.700" : "grey.300",
                      fontSize: 18,
                    }}
                  >
                    {Object.keys(p)[0] == "school"
                      ? "Study at"
                      : Object.keys(p)[0] == "location"
                      ? "Lives in"
                      : Object.keys(p)[0] == "hometown"
                      ? "From"
                      : Object.keys(p)[0] == "status"
                      ? "I am"
                      : Object.keys(p)[0] == "cellphone"
                      ? "Phone"
                      : "Email"}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {Object.values(p)[0]}
                  </Typography>
                </Stack>
              </Stack>
            </ItemAbout>
          </Stack>
        );
      })}
    </Stack>
  );
}

{
  /* <Stack key={index}>
  <ItemAbout
    myViewer={p.viewer}
    list={list}
    setList={setList}
    value={p.Object.keys(p)[0]}
    subject={Object.keys(p)[0]}
  >
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
        <Typography
          sx={{
            color: "grey.600",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {p.Object.keys(p)[0] == "Status" ? (
            <ShowIcon subject={p.Object.keys(p)[0]} />
          ) : (
            <ShowIcon subject={Object.keys(p)[0]} />
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
        <Typography sx={{ fontSize: 18 }}>{p.Object.keys(p)[0]}</Typography>
      </Stack>
    </Stack>
  </ItemAbout>
</Stack>; */
}
