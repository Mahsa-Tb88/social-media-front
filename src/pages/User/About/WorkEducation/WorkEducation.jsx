import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemAbout from "../ItemAbout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SchoolIcon from "@mui/icons-material/School";

export default function WorkEducation() {
  const myWorkEducation = [
    {
      title: "Work",
      items: [
        {
          value: {
            position: "Web Developer",
            place: "Orain",
            city: "Chilliwack",
            from: 2020,
            to: "",
          },
          icon: <HomeRepairServiceIcon />,
          viewer: "public",
        },
        {
          value: {
            position: "Frontend Developer",
            place: "Andishe",
            city: "Tabriz",
            from: 2014,
            to: 2020,
          },
          icon: <HomeRepairServiceIcon />,
          viewer: "public",
        },
      ],
    },
    {
      title: "College",
      items: [
        {
          value: {
            position: "Bachlor",
            place: "Physics",
            city: "university of Isfahan",
            from: 2300,
            to: 2500,
          },
          icon: <SchoolIcon />,
          viewer: "public",
        },
        {
          value: {
            position: "Master",
            place: "Physics",
            city: "Babol Noshirvani",
            from: 2300,
            to: 2500,
          },
          icon: <SchoolIcon />,
          viewer: "public",
        },
      ],
    },
  ];

  const [list, setList] = useState([]);
  const [workEducation, setWorkEducation] = useState(myWorkEducation);

  useEffect(() => {
    // found the object with the change
    let findItem = [];
    workEducation.forEach((p) => {
      p.items.forEach((element) => {
        if (element?.subject == list[0]?.subject) {
          findItem = { title: p.title, items: list };
        }
      });
    });
    // update contactInfo list
    const newWorkEducation = workEducation.map((item) => {
      if (item?.title == findItem?.title) {
        return findItem;
      } else {
        return item;
      }
    });
    setWorkEducation(newWorkEducation);
  }, [list]);

  return (
    <Stack>
      {workEducation.map((i) => {
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
                      value={j.value}
                      subject={i.title}
                      icon={j.icon}
                      id={Data.now()}
                    >
                      <Stack
                        sx={{
                          flexDirection: "row",
                        }}
                      >
                        <Box sx={{ mr: 1 }}>{j.icon}</Box>
                        <Stack sx={{ mb: 1 }}>
                          <Stack
                            sx={{ flexDirection: "row", alignItems: "center" }}
                          >
                            <Typography>{j.value.position}</Typography>
                            <Typography sx={{ mx: 1 }}>{" at "}</Typography>
                            <Typography>{j.value.place}</Typography>
                          </Stack>
                          <Stack>
                            <Stack sx={{ flexDirection: "row" }}>
                              <Box>{j.value.city}</Box>
                              <Typography sx={{ mx: 1 }}>{"|"}</Typography>
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Box>{j.value.from}</Box>
                                <Typography sx={{ mx: 1 }}>-</Typography>
                                {j.value.to ? (
                                  <Box>{j.value.to}</Box>
                                ) : (
                                  <Typography>Currently</Typography>
                                )}
                              </Stack>
                            </Stack>
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
