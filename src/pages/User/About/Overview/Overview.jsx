import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ItemAbout from "../ItemAbout";

import { useDispatch, useSelector } from "react-redux";
import ShowIcon from "../ShowIcon";
import { useGetUserInfo } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import EditValueSubject from "../EditVelueSubject";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";
import { userInfoActions } from "../../../../store/slices/userInfoSlice";

export default function Overview() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetUserInfo(id);
  // const dispatch = useDispatch();
  // const overview = useSelector((state) => state.userInfo.overview);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(userInfoActions.setOverview(data.data.body.overview));
  //   }
  // }, [data]);

  function findSubject(subject) {
    const item = data?.data.body.overview.find(
      (item) => item.subject == subject
    );
    return item;
  }

  // console.log("over view is", overview);

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
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
        <ShowIcon subject={subject} sx={{ mr: 1 }} />
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
