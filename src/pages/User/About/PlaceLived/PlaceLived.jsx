import React, { useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";
import { useSelector } from "react-redux";

export default function PlaceLived() {
  const placeLived = useSelector((state) => state.user.placeLived);
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

  const place = [
    // { city: "tabriz", status: "hometown", viewer: "private" },
    // { city: "chilliwack", status: "current city", viewer: "private" },
    // { city: "isfahan", status: "used to live", viewer: "private" },
    // { city: "babol", status: "used to live", viewer: "private" },
  ];

  const [openAddPlace, setOpenAddPlace] = useState(false);

  function findItem(status) {
    const itemselected = place.filter((p) => p.status == status);
    if (itemselected.length == 0) {
      return 0;
    } else if (itemselected.length == 1) {
      return itemselected[0];
    } else {
      return itemselected;
    }
  }

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Places Lived
      </Typography>
      <Stack spacing={3}>
        <Stack>
          {findItem("hometown") ? (
            <ItemAbout
              myViewer={findItem("hometown").viewer}
              value={findItem("hometown").city}
              subject={findItem("hometown").status}
              title="city"
            >
              <Stack sx={{ flexDirection: "row", gap: 1 }}>
                <Typography>
                  <ShowIcon subject={"hometown"} />
                </Typography>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: 18,
                    }}
                  >
                    {findItem("hometown").city}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {findItem("hometown").status}
                  </Typography>
                </Stack>
              </Stack>
            </ItemAbout>
          ) : (
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject="hometown" />
              </Box>
              <Button
                variant="text"
                sx={{ fontSize: 18 }}
                onClick={() => setOpenAddPlace(true)}
              >
                Add Hometown
              </Button>
              <Box></Box>
              <EditValueSubject
                openEdit={openAddPlace}
                onCloseEdit={() => setOpenAddPlace(false)}
                value=""
                subject="used to live"
                type="new"
                title={"city"}
              />
            </Stack>
          )}
        </Stack>
        <Stack>
          {findItem("current city") ? (
            <ItemAbout
              myViewer={findItem("current city").viewer}
              value={findItem("current city").city}
              subject={findItem("current city").status}
              title="city"
            >
              <Stack>
                <Stack sx={{ flexDirection: "row", gap: 1 }}>
                  <Typography>
                    <ShowIcon subject={findItem("current city").status} />
                  </Typography>
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: 18,
                      }}
                    >
                      {findItem("current city").city}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                      {findItem("current city").status}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </ItemAbout>
          ) : (
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject="current city" />
              </Box>
              <Button
                variant="text"
                sx={{ fontSize: 18 }}
                onClick={() => setOpenAddPlace(true)}
              >
                Add Current City
              </Button>
              <Box></Box>
              <EditValueSubject
                openEdit={openAddPlace}
                onCloseEdit={() => setOpenAddPlace(false)}
                value=""
                subject="used to live"
                type="new"
                title={"city"}
              />
            </Stack>
          )}
        </Stack>
        {findItem("used to live").length && (
          <Stack spacing={3}>
            {findItem("used to live").length == 1 ? (
              <ItemAbout
                myViewer={findItem("used to live").viewer}
                value={findItem("used to live").city}
                subject={findItem("used to live").status}
                title="city"
              >
                <Stack>
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <Typography>
                      <ShowIcon subject={findItem("used to live").status} />
                    </Typography>
                    <Stack>
                      <Typography
                        sx={{
                          fontSize: 18,
                        }}
                      >
                        {findItem("used to live").city}
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>
                        {findItem("used to live").status}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </ItemAbout>
            ) : (
              findItem("used to live").map((i) => {
                return (
                  <Stack key={i}>
                    <ItemAbout
                      myViewer={i.viewer}
                      value={i.city}
                      subject={i.status}
                      title="city"
                    >
                      <Stack>
                        <Stack sx={{ flexDirection: "row", gap: 1 }}>
                          <Typography>
                            <ShowIcon subject={i.status} />
                          </Typography>
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: 18,
                              }}
                            >
                              {i.city}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                              {i.status}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </ItemAbout>
                  </Stack>
                );
              })
            )}
          </Stack>
        )}
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
            type="new"
            title={"city"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
