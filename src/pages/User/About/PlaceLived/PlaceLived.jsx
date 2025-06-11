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
  const hometown = data?.data?.body.places[2];
  const currentCity = data?.data?.body.places[1];
  const usedToLiveCity = data?.data?.body.places[0];
  const isFriend = data?.data?.body.isFriend;
  const isOwner = data?.data?.body.isOwner;
  console.log("isowner", isOwner);
  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Places Lived
          </Typography>
          <Stack spacing={3}>
            <Hometown
              hometown={hometown}
              isOwner={isOwner}
              isFriend={isFriend}
            />
            <CurrentCity
              currentCity={currentCity}
              isOwner={isOwner}
              isFriend={isFriend}
            />
            <UsedToLiveCity
              usedToLiveCity={usedToLiveCity}
              isOwner={isOwner}
              isFriend={isFriend}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function Hometown({ hometown, isOwner, isFriend }) {
  return (
    <Stack>
      {Object.keys(hometown).length != 0 ? (
        <Stack>
          {isOwner ? (
            <ItemAbout
              myViewer={hometown.viewer}
              value={hometown.value}
              subject={"Hometown"}
              title="hometown"
            >
              <Content object={hometown} subject={"Hometown"} />
            </ItemAbout>
          ) : (
            <Content object={hometown} subject={"Hometown"} />
          )}
        </Stack>
      ) : !Object.keys(hometown).length && (isOwner || isFriend) ? (
        <AddHometown isOwner={isOwner} />
      ) : (
        ""
      )}
    </Stack>
  );
}

function AddHometown({ isOwner }) {
  const [openAddHometown, setOpenAddHometown] = useState(false);
  console.log("hometownnn", isOwner);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box>
        <ShowIcon subject="Hometown" />
      </Box>
      {isOwner ? (
        <Stack>
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
      ) : (
        <Typography sx={{ ml: 1 }}>Hometown is not added yet!</Typography>
      )}
    </Stack>
  );
}

function CurrentCity({ currentCity, isOwner, isFriend }) {
  return (
    <Stack>
      {Object.keys(currentCity).length != 0 ? (
        <Stack>
          {isOwner ? (
            <ItemAbout
              myViewer={currentCity.viewer}
              value={currentCity.value}
              subject={"Current city"}
              title="currentCity"
            >
              <Content object={currentCity} subject={"current city"} />
            </ItemAbout>
          ) : (
            <Content isOwner={isOwner} />
          )}
        </Stack>
      ) : !Object.keys(currentCity).length && (isFriend || isOwner) ? (
        <AddCurrentCity isOwner={isOwner} />
      ) : (
        ""
      )}
    </Stack>
  );
}

function AddCurrentCity({ isOwner }) {
  const [openAddCurrentCity, setOpenAddCurrentCity] = useState(false);
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box>
        <ShowIcon subject="Location" />
      </Box>
      {isOwner ? (
        <Stack>
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
      ) : (
        <Typography sx={{ ml: 1 }}>Current city is not added yet!</Typography>
      )}
    </Stack>
  );
}

function UsedToLiveCity({ usedToLiveCity, isOwner, isFriend }) {
  return (
    <Stack spacing={usedToLiveCity.length ? 3 : ""}>
      <Stack spacing={3}>
        {usedToLiveCity.length > 0 &&
          usedToLiveCity.map((j) => {
            return (
              <Stack key={j}>
                {isOwner ? (
                  <ItemAbout
                    myViewer={j.viewer}
                    value={j.value}
                    subject={"Used to live"}
                    id={j.id}
                    title="usedToLiveCity"
                  >
                    <Content subject={"Used to live"} object={j} />
                  </ItemAbout>
                ) : (
                  <Content subject={"Used to live"} object={j} />
                )}
              </Stack>
            );
          })}
      </Stack>
      {isOwner || isFriend ? (
        <AddUsedToLived isOwner={isOwner} length={usedToLiveCity.length} />
      ) : (
        ""
      )}
    </Stack>
  );
}

function AddUsedToLived({ isOwner }) {
  const [openAddPlace, setOpenAddPlace] = useState(false);

  return (
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
      {isOwner ? (
        <Stack>
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
      ) : (
        <Typography> Used to live is not added yet!</Typography>
      )}
    </Stack>
  );
}

function Content({ object, subject }) {
  const theme = useSelector((state) => state.app.theme);

  return (
    <Stack sx={{ mb: 1 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 1 }}>
          <ShowIcon subject={subject} />
          <Stack>
            <Typography
              sx={{ color: theme == "light" ? "grey.900" : "grey.100" }}
            >
              {object.value}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                color: theme == "dark" && "grey.300",
              }}
            >
              {subject}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
