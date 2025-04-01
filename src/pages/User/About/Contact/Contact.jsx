import { Box, Button, ListItemAvatar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import { useGetContactBaseInfo } from "../../../../utils/queries";
import EditValueSubject from "../EditVelueSubject";
import { useSelector } from "react-redux";

export default function Contact() {
  const id = useParams().id;

  const { isPending, data, error, refetch } = useGetContactBaseInfo(id);
  const myData = data?.data.body[0] || {};
  const isFriend = data?.data.body[1] || false;
  const isOwner = data?.data.body[2] || false;

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack spacing={5}>
          <ContactInfo data={myData} isFriend={isFriend} isOwner={isOwner} />
          <Websites data={myData} isFriend={isFriend} isOwner={isOwner} />
          <BasicInfo data={myData} isFriend={isFriend} isOwner={isOwner} />
        </Stack>
      )}
    </Stack>
  );
}

function ContactInfo({ data, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Contact
      </Typography>
      <Stack spacing={1}>
        {["Mobile", "Email"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title={"contactBaseInfo"}
                index={index}
              >
                <Content item={item} dataItem={data[item]} />
              </ItemAbout>
            ) : (
              <Content item={item} dataItem={data[item]} />
            )
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} isOwner={isOwner} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}

function Websites({ data, isFriend, isOwner }) {
  return (
    <Stack>
      {
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          Website & Social Media
        </Typography>
      }

      <Stack spacing={2}>
        {["Website", "LinkedIn", "Github"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title={"contactBaseInfo"}
                key={index}
              >
                <Content item={item} dataItem={data[item]} />
              </ItemAbout>
            ) : (
              <Content item={item} dataItem={data[item]} />
            )
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} isOwner={isOwner} key={index} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}

function BasicInfo({ data, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      <Stack spacing={1}>
        {["Gender", "Pronouns", "Birthday", "Language"].map((item, index) => {
          return data[item]?.value ? (
            isOwner ? (
              <ItemAbout
                myViewer={data[item].viewer}
                value={data[item].value}
                subject={item}
                title="contactBaseInfo"
                key={index}
              >
                <Content dataItem={data[item]} item={item} />
              </ItemAbout>
            ) : (
              <Content dataItem={data[item]} item={item} />
            )
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} isOwner={isOwner} key={index} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}

function Content({ dataItem, item }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <ShowIcon subject={item} />
      </Box>
      <Stack>
        <Stack>
          <Typography>{dataItem.value}</Typography>
          <Typography sx={{ fontSize: 10 }}>{item}</Typography>
        </Stack>
      </Stack>
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
            isOwner={isOwner}
          >
            Add {subject}
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddSubject}
            onCloseEdit={() => setOpenAddSubject(false)}
            subject={subject}
            type="new"
            title="contactBaseInfo"
          />
        </Stack>
      ) : (
        "Noting is added yet!"
      )}
    </Stack>
  );
}
