import React, { useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";
import { useSelector } from "react-redux";
import { usePlaceLived } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";

export default function PlaceLived() {
  const id = useParams().id;
  const theme = useSelector((state) => state.app.theme);
  const { isPending, data, error, refetch } = usePlaceLived(id);
  const hometown = data?.data?.body?.hometown || {};
  const currentCity = data?.data?.body?.currentCity || {};
  const usedToLiveCity = data?.data?.body?.usedToLiveCity || [];

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Places Lived
          </Typography>
          <Stack spacing={3}>
            <Hometown hometown={hometown} theme={theme} />
            <CurrentCity currentCity={currentCity} theme={theme} />
            <UsedToLiveCity usedToLiveCity={usedToLiveCity} theme={theme} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function Hometown({ hometown, theme }) {
  const [openAddHometown, setOpenAddHometown] = useState(false);

  return (
    <Stack>
      {Object.keys(hometown).length != 0 ? (
        <Stack>
          <ItemAbout
            myViewer={hometown.viewer}
            value={hometown.value}
            subject={"Hometown"}
            title="hometown"
           
          >
            <Stack sx={{ mb: 1 }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <ShowIcon subject={"Hometown"} />
                  <Stack>
                    <Typography
                      sx={{ color: theme == "light" ? "grey.900" : "grey.100" }}
                    >
                      {hometown.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: theme == "dark" && "grey.300",
                      }}
                    >
                      Hometown
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>
            <ShowIcon subject="Hometown" />
          </Box>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddHometown(true)}
          >
            Add Hometown
          </Button>

          <EditValueSubject
            openEdit={openAddHometown}
            onCloseEdit={() => setOpenAddHometown(false)}
            value=""
            subject="Hometown"
            type="new"
            title="hometown"
          />
        </Stack>
      )}
    </Stack>
  );
}

function CurrentCity({ currentCity, theme }) {
  const [openAddCurrentCity, setOpenAddCurrentCity] = useState(false);

  return (
    <Stack>
      {Object.keys(currentCity).length != 0 ? (
        <Stack>
          <ItemAbout
            myViewer={currentCity.viewer}
            value={currentCity.value}
            subject={"Current city"}
            title="currentCity"
          >
            <Stack sx={{ mb: 1 }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
                >
                  <ShowIcon subject={"Location"} />
                  <Stack>
                    <Typography
                      sx={{ color: theme == "light" ? "grey.900" : "grey.100" }}
                    >
                      {currentCity.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: theme == "dark" && "grey.300",
                      }}
                    >
                      Current city
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>
            <ShowIcon subject="Location" />
          </Box>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddCurrentCity(true)}
          >
            Add current city
          </Button>

          <EditValueSubject
            openEdit={openAddCurrentCity}
            onCloseEdit={() => setOpenAddCurrentCity(false)}
            value=""
            subject="Current city"
            type="new"
            title="currentCity"
          />
        </Stack>
      )}
    </Stack>
  );
}

function UsedToLiveCity({ usedToLiveCity, theme }) {
  const [openAddPlace, setOpenAddPlace] = useState(false);

  return (
    <Stack spacing={usedToLiveCity.length ? 3 : ""}>
      <Stack spacing={3}>
        {usedToLiveCity.length > 0 &&
          usedToLiveCity.map((j) => {
            return (
              <Stack key={j}>
                <ItemAbout
                  myViewer={j.viewer}
                  value={j.value}
                  subject={"Used to live"}
                  id={j.id}
                  title="usedToLiveCity"
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ShowIcon subject={"Location"} />
                    <Stack>
                      <Typography>{j.value}</Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: theme == "dark" && "grey.300",
                        }}
                      >
                        Used to live
                      </Typography>
                    </Stack>
                  </Stack>
                </ItemAbout>
              </Stack>
            );
          })}
      </Stack>

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
          Add used to live
        </Button>
        <Box></Box>
        <EditValueSubject
          openEdit={openAddPlace}
          onCloseEdit={() => setOpenAddPlace(false)}
          value=""
          subject="used to live"
          type="new"
          title="usedToLiveCity"
        />
      </Stack>
    </Stack>
  );
}
