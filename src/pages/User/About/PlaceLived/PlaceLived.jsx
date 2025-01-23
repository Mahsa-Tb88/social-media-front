import React, { useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../Overview/EditVelueSubject";

export default function PlaceLived() {
  const myPlaces = [
    {
      city: "Tabriz",
      status: "Hometown",
      viewer: "public",
    },
    {
      city: "Chilliwack",
      status: "Current city",
      viewer: "public",
    },
    {
      city: "Isfahan",
      status: "used to live",
      viewer: "public",
    },
  ];

  const [places, setPlaces] = useState(myPlaces);
  const [openAddPlace, setOpenAddPlace] = useState(false);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Places Lived
      </Typography>
      <Stack sx={{ gap: 4 }}>
        {places.map((p, index) => {
          return (
            <Stack key={index}>
              <ItemAbout
                myViewer={p.viewer}
                list={places}
                setList={setPlaces}
                value={p.city}
                subject={p.status}
                title="city"
              >
                <Stack>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <Typography>
                      <ShowIcon subject={p.status} />
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

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box>
            <ShowIcon subject="Location" />
          </Box>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddPlace(true)}
          >
            Add Used to live
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddPlace}
            onCloseEdit={() => setOpenAddPlace(false)}
            value=""
            subject="used to live"
            setList={setPlaces}
            list={places}
            type="new"
            title={"city"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
