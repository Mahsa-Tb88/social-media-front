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
  const userLogin = useSelector((state) => state.user.profile);
  function hasPermission() {
    if (id == userLogin.id) {
      return true;
    } else {
      return false;
    }
  }

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
          <ContactInfo
            data={myData}
            hasPermission={hasPermission}
            isFriend={isFriend}
            isOwner={isOwner}
          />
          <Websites
            data={myData}
            hasPermission={hasPermission}
            isFriend={isFriend}
            isOwner={isOwner}
          />
          <BasicInfo
            data={myData}
            hasPermission={hasPermission}
            isFriend={isFriend}
            isOwner={isOwner}
          />
        </Stack>
      )}
    </Stack>
  );
}

function ContactInfo({ data, hasPermission, isFriend, isOwner }) {
  const mobile = data.Mobile;
  const email = data.Email;
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Contact
      </Typography>

      <Stack spacing={1}>
        {mobile?.value ? (
          <ItemAbout
            myViewer={mobile.viewer}
            value={mobile.value}
            subject={"Mobile"}
            title={"contactBaseInfo"}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={"Mobile"} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{mobile.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{"Mobile"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        ) : !mobile?.value && (isFriend || isOwner) ? (
          <AddSubject subject={"Mobile"} hasPermission={hasPermission} />
        ) : (
          ""
        )}
        {email?.value ? (
          <ItemAbout
            myViewer={email.viewer}
            value={email.value}
            subject={"Email"}
            title={"contactBaseInfo"}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={"Email"} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{email.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{"Email"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        ) : !email?.value && (isFriend || isOwner) ? (
          <AddSubject subject={"Email"} hasPermission={hasPermission} />
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
}

function Websites({ data, hasPermission, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Website & Social Media
      </Typography>
      <Stack spacing={2}>
        {["Website", "LinkedIn", "Github"].map((item, index) => {
          return data[item]?.value ? (
            <ItemAbout
              myViewer={data[item].viewer}
              value={data[item].value}
              subject={item}
              title={"contactBaseInfo"}
              key={index}
            >
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
                    <Typography>{data[item].value}</Typography>
                    <Typography sx={{ fontSize: 10 }}>{item}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </ItemAbout>
          ) : !data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject
              subject={item}
              hasPermission={hasPermission}
              key={index}
            />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}

function BasicInfo({ data, hasPermission, isFriend, isOwner }) {
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      <Stack spacing={1}>
        {["Gender", "Pronouns", "Birthday", "Language"].map((item, index) => {
          return data[item]?.value ? (
            <Item item={data[item]} subject={item} key={index} />
          ) : data[item]?.value && (isFriend || isOwner) ? (
            <AddSubject subject={item} hasPermission={hasPermission} />
          ) : (
            ""
          );
        })}
      </Stack>
    </Stack>
  );
}
function Item({ item, subject }) {
  return (
    <ItemAbout
      myViewer={item.viewer}
      value={item.value}
      subject={subject}
      title="contactBaseInfo"
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box>
          <ShowIcon subject={subject} />
        </Box>
        <Stack>
          <Stack>
            <Typography>{item.value}</Typography>
            <Typography sx={{ fontSize: 10 }}>{subject}</Typography>
          </Stack>
        </Stack>
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
            hasPermission={hasPermission}
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
