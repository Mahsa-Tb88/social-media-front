import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ItemAbout from "../ItemAbout";

import { useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";
import { useGetOverview } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import { DataObject } from "@mui/icons-material";
import EditValueSubject from "../EditVelueSubject";

export default function Overview() {
  const overview = useSelector((state) => state.user.overview);
  console.log("overview", overview);

  const theme = useSelector((state) => state.app.theme);

  function findSubject(subject) {
    const item = overview.find((item) => item.subject == subject);
    console.log("heeey", item);

    return item;
  }
  // [{status:"School",value:"yechizi" , viewer:"public"}]

  return (
    <Stack sx={{ gap: 4 }}>
      {findSubject("School") ? (
        <Item
          subject="School"
          text="Study at"
          value={findSubject("School").value}
          viewer={findSubject("School").viewer}
        />
      ) : (
        <AddSubject subject="School" />
      )}
      {findSubject("Location") ? (
        <Item
          subject="Location"
          text="Livs in"
          value={findSubject("Location").value}
          viewer={findSubject("Location").viewer}
        />
      ) : (
        <AddSubject subject="Location" />
      )}
      {findSubject("Hometown") ? (
        <Item
          subject="Hometown"
          text="From"
          value={findSubject("Hometown").value}
          viewer={findSubject("Hometown").viewer}
        />
      ) : (
        <AddSubject subject="Hometown" />
      )}
      {findSubject("Status") ? (
        <Item
          subject="Status"
          text="I am"
          value={findSubject("Status").value}
          viewer={findSubject("Status").viewer}
        />
      ) : (
        <AddSubject subject="Status" />
      )}
      {findSubject("Phone") ? (
        <Item
          subject="Phone"
          text="Phone"
          value={findSubject("Phone").value}
          viewer={findSubject("Phone").viewer}
        />
      ) : (
        <AddSubject subject="Phone" />
      )}
      {findSubject("Email") ? (
        <Item
          subject="Email"
          text="Email"
          value={findSubject("Email").value}
          viewer={findSubject("Email").viewer}
        />
      ) : (
        <AddSubject subject="Email" />
      )}
    </Stack>
  );
}

function Item({ subject, text, value, viewer }) {
  return (
    <ItemAbout subject={subject} text={text} value={value} viewer={viewer}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <ShowIcon subject="school" sx={{ mr: 1 }} />
        <Typography>Study at</Typography>
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
      />
    </Stack>
  );
}
