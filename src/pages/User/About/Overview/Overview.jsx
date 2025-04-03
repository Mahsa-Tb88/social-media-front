import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import EditValueSubject from "../EditVelueSubject";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";

export default function Overview() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetOverview(id);

  const overview = data?.data.body.overview;
  const isFriend = data?.data.body.isFriend;
  const isOwner = data?.data.body.isOwner;
  console.log("overview", overview);

  const overviewKeys = [
    "School",
    "Location",
    "Hometown",
    "Status",
    "Phone",
    "Email",
  ];

  function showText(subject) {
    if (subject == "School") {
      return "Study at";
    } else if (subject == "Location") {
      return "Livs in";
    } else if (subject == "Hometown") {
      return "From";
    } else if (subject == "Status") {
      return "I am";
    } else if (subject == "Phone") {
      return "Phone";
    } else {
      return "Email";
    }
  }
  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack sx={{ gap: 4 }}>
          {!Object.keys(overview).length && !isFriend && !isOwner ? (
            <Stack>
              <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
                Overview
              </Typography>
            </Stack>
          ) : (
            overviewKeys.map((item, index) => {
              return overview[item]?.value ? (
                <Item
                  subject={item}
                  text={showText(item)}
                  value={overview[item].value}
                  viewer={overview[item].viewer}
                  key={index}
                  isOwner={isOwner}
                />
              ) : !overview[item]?.value && (isOwner || isFriend) ? (
                <AddSubject subject={item} isOwner={isOwner} key={index} />
              ) : (
                ""
              );
            })
          )}
        </Stack>
      )}
    </Stack>
  );
}

function Item({ subject, text, value, viewer, isOwner }) {
  return isOwner ? (
    <ItemAbout
      subject={subject}
      text={text}
      value={value}
      myViewer={viewer}
      title="overview"
    >
      <Content subject={subject} value={value} text={text} />
    </ItemAbout>
  ) : (
    <Content subject={subject} value={value} text={text} />
  );
}

function Content({ subject, value, text }) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      {subject == "Status" && value == "Married" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : subject == "Status" && value == "In relationship" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : subject == "Status" && value == "Single" ? (
        <ShowIcon subject={value} sx={{ mr: 1 }} />
      ) : (
        <ShowIcon subject={subject} sx={{ mr: 1 }} />
      )}
      <Typography>{text}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

function AddSubject({ subject, isOwner }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Box>
        <ShowIcon subject={subject} />
      </Box>
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddSubject(true)}
          >
            Add {subject}
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddSubject}
            onCloseEdit={() => setOpenAddSubject(false)}
            subject={subject}
            type="new"
            title="overview"
          />
        </Stack>
      ) : (
        "It is not added yet!"
      )}
    </Stack>
  );
}
