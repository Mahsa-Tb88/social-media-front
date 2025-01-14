import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemAbout from "../ItemAbout";

export default function WorkEducation() {
  const work = [
    {
      title: "Work",
      items: [
        {
          position: "Web Developer",
          company: "Orain",
          city: "Chilliwack",
          year: "2015-2018",
        },
        {
          position: "Frontend Developer",
          company: "Andishe",
          city: "Tabriz",
          year: "2022-2023",
        },
      ],
    },
    {
      title: "College",
      items: [
        {
          position: "Bachlor",
          university: "university of Isfahan",
          year: "2012-2016",
        },
        {
          position: "Master",
          university: "Babol Noshirvani",
          year: "2016-2019",
        },
      ],
    },
  ];
  return (
    <Stack>
      {work.map((i) => {
        <Stack>
          <Typography>{i.title}</Typography>
          <Stack spacing={1}>
            {i.items.map((j) => {
              <Stack key={j}>
                <ItemAbout
                  myViewer={j.viewer}
                  list={i.items}
                  setList={setList}
                  value={j.value}
                  subject={j.subject}
                  icon={j.icon}
                ></ItemAbout>
              </Stack>;
            })}
          </Stack>
        </Stack>;
      })}
    </Stack>
  );
}
