import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import EditValueSubject from "../EditVelueSubject";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";
import { useSelector } from "react-redux";

export default function Overview() {
  const id = useParams().id;
  const userLogin = useSelector((state) => state.user.profile);

  const { isPending, data, error, refetch } = useGetOverview(id);
  const overview = data?.data.body[0] || {};
  const isFriend = data?.data.body[1] || false;
  const isOwner = data?.data.body[2] || false;

  function hasPermission() {
    if (id == userLogin.id) {
      return true;
    } else {
      return false;
    }
  }

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
          {!Object.keys(overview).length ? (
            <Stack>Nothing to show!</Stack>
          ) : (
            overviewKeys.map((item, index) => {
              return overview[item]?.value ? (
                <Item
                  subject={item}
                  text={showText(item)}
                  value={overview[item].value}
                  viewer={overview[item].viewer}
                  key={index}
                />
              ) : !overview[item]?.value && (isFriend || isOwner) ? (
                <AddSubject
                  subject={item}
                  hasPermission={hasPermission}
                  key={index}
                />
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

function Item({ subject, text, value, viewer }) {
  return (
    <ItemAbout
      subject={subject}
      text={text}
      value={value}
      myViewer={viewer}
      title="overview"
    >
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
    </ItemAbout>
  );
}

function AddSubject({ subject, hasPermission }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Box>
        <ShowIcon subject={subject} />
      </Box>
      {hasPermission() ? (
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
        "Noting is added yet!"
      )}
    </Stack>
  );
}
