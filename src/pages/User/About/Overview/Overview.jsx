import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ItemAbout from "../ItemAbout";

import { useDispatch, useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import EditValueSubject from "../EditVelueSubject";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";

export default function Overview() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetOverview(id);

  const overview = data?.data.body || {};
  console.log("overviewwwwwwwwwwwwwwwww", overview);

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack sx={{ gap: 4 }}>
          {overview["School"]?.value ? (
            <Item
              subject="School"
              text="Study at"
              value={overview["School"].value}
              viewer={overview["School"].viewer}
            />
          ) : (
            <AddSubject subject="School" />
          )}

          {overview["Location"]?.value ? (
            <Item
              subject="Location"
              text="Livs in"
              value={overview["Location"].value}
              viewer={overview["Location"].viewer}
            />
          ) : (
            <AddSubject subject="Location" />
          )}
          {overview["Hometown"]?.value ? (
            <Item
              subject="Hometown"
              text="From"
              value={overview["Hometown"].value}
              viewer={overview["Hometown"].viewer}
            />
          ) : (
            <AddSubject subject="Hometown" />
          )}
          {overview["Status"]?.value ? (
            <Item
              subject="Status"
              text="I am"
              value={overview["Status"].value}
              viewer={overview["Status"].viewer}
            />
          ) : (
            <AddSubject subject="Status" />
          )}
          {overview["Phone"]?.value ? (
            <Item
              subject="Phone"
              text="Phone"
              value={overview["Phone"].value}
              viewer={overview["Phone"].viewer}
            />
          ) : (
            <AddSubject subject="Phone" />
          )}
          {overview["Email"]?.value ? (
            <Item
              subject="Email"
              text="Email"
              value={overview["Email"].value}
              viewer={overview["Email"].viewer}
            />
          ) : (
            <AddSubject subject="Email" />
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

function AddSubject({ subject }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Box>
        <ShowIcon subject={subject} />
      </Box>
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
  );
}
