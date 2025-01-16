import React, { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ItemAbout from "../ItemAbout";

export default function PlaceLived() {
  const places = [
    {
      city: "Tabriz",
      status: "Hometown",
      data: "1988-1976",
      viewer: "public",
      icon: <PlaceIcon />,
    },
    {
      city: "Chilliwack",
      status: "Current city",
      data: "2023-now",

      viewer: "public",
      icon: <PlaceIcon />,
    },
    {
      city: "Isfahan",
      status: "used to live",
      data: "1976-2012",
      viewer: "public",
      icon: <PlaceIcon />,
    },
  ];

  const [list, setList] = useState(places);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Places Lived
      </Typography>
      <Stack sx={{ gap: 4 }}>
        {list.map((p, index) => {
          return (
            <Stack key={index}>
              <ItemAbout
                myViewer={p.viewer}
                list={list}
                setList={setList}
                value={p.city}
                subject={p.status}
                icon={p.icon}
              >
                <Stack sx={{}}>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <Typography>
                      {p.status == "Hometown" ? <HomeIcon /> : p.icon}
                    </Typography>
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: 18,
                        }}
                      >
                        {p.city}
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>{p.status}</Typography>
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
}
