import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import { useGetContactBaseInfo } from "../../../../utils/queries";
import EditValueSubject from "../EditVelueSubject";


export default function Contact() {
  const id = useParams().id;

  const { isPending, data, error, refetch } = useGetContactBaseInfo(id);
  const myData = data?.data.body || [];
  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack spacing={5}>
          <ContactInfo data={myData} />
          <Websites data={myData} />
          <BasicInfo data={myData} />
        </Stack>
      )}
    </Stack>
  );
}

function ContactInfo({ data }) {
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
        ) : (
          <AddSubject subject={"Mobile"} />
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
        ) : (
          <AddSubject subject={"Email"} />
        )}
      </Stack>
    </Stack>
  );
}

function Websites({ data }) {
  const website = data.Website;
  const linkedIn = data.LinkedIn;
  const github = data.Github;
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Website & Social Media
      </Typography>

      <Stack spacing={1}>
        {website?.value ? (
          <ItemAbout
            myViewer={website.viewer}
            value={website.value}
            subject={"Website"}
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
                <ShowIcon subject={"Website"} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{website.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{"Website"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        ) : (
          <AddSubject subject={"Website"} />
        )}
        {linkedIn?.value ? (
          <ItemAbout
            myViewer={linkedIn.viewer}
            value={linkedIn.value}
            subject={"LinkedIn"}
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
                <ShowIcon subject={"LinkedIn"} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{linkedIn.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{"LinkedIn"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        ) : (
          <AddSubject subject={"LinkedIn"} />
        )}
        {github?.value ? (
          <ItemAbout
            myViewer={github.viewer}
            value={github.value}
            subject={"Github"}
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
                <ShowIcon subject={"Github"} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{github.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{"Github"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        ) : (
          <AddSubject subject={"Github"} />
        )}
      </Stack>
    </Stack>
  );
}

function BasicInfo({ data }) {
  const gender = data.Gender;
  const pronouns = data.Pronouns;
  const birthday = data.Birthday;
  const language = data.Language;

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      <Stack spacing={1}>
        {gender?.value ? (
          <Item item={gender} subject="Gender" />
        ) : (
          <AddSubject subject={"Gender"} />
        )}
        {pronouns?.value ? (
          <Item item={pronouns} subject="Pronouns" />
        ) : (
          <AddSubject subject={"Pronouns"} />
        )}
        {birthday?.value ? (
          <Item item={birthday} subject="Birthday" />
        ) : (
          <AddSubject subject={"Birthday"} />
        )}
        {language?.value ? (
          <Item item={language} subject="Language" />
        ) : (
          <AddSubject subject={"Language"} />
        )}
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
        title="contactBaseInfo"
      />
    </Stack>
  );
}
