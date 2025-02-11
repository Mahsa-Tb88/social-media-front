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
  const { isPending, data, error, refetch } = usePlaceLived(id);
  console.log("dataa", data);
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
            <Hometown hometown={hometown} />
            <CurrentCity currentCity={currentCity} />
            <UsedToLiveCity usedToLiveCity={usedToLiveCity} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function Hometown({ hometown }) {
  const [openAddHometown, setOpenAddHometown] = useState(false);

  return (
    <Stack>
      {Object.keys(hometown).length != 0 ? (
        <Stack>
          <ItemAbout
            myViewer={hometown.viewer}
            value={hometown}
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
                  <Typography>{hometown.value}</Typography>
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

function CurrentCity({ currentCity }) {
  const [openAddCurrentCity, setOpenAddCurrentCity] = useState(false);

  return (
    <Stack>
      {Object.keys(currentCity).length != 0 ? (
        <Stack>
          <ItemAbout
            myViewer={currentCity.viewer}
            value={currentCity}
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
                  <Typography>{currentCity.value}</Typography>
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

function UsedToLiveCity({ usedToLiveCity }) {
  const [openAddPlace, setOpenAddPlace] = useState(false);

  return (
    <Stack>
      <Stack spacing={2}>
        {usedToLiveCity.length > 0 &&
          usedToLiveCity.map((j) => {
            return (
              <Stack key={j}>
                <ItemAbout
                  myViewer={j.viewer}
                  value={j}
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
                    <Typography>{j.value}</Typography>
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
