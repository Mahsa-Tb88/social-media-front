import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";

export default function Contact() {
  const contact = [
    {
      value: "2424242424",
      viewer: "public",
      subject: "Mobile",
    },
    {
      value: "mah@gmail.com",
      viewer: "public",
      subject: "Email",
    },
  ];

  const websites = [
    {
      value: "https://web.com",
      viewer: "public",
      subject: "Website",
    },
    {
      value: "https://linkedin.com.ananan",
      viewer: "public",
      subject: "LinkedIn",
    },
    {
      value: "https://github.com.ananan",
      viewer: "public",
      subject: "Github",
    },
  ];

  const basicInfo = [
    {
      value: "Female",
      viewer: "public",
      subject: "Gender",
    },
    {
      value: "She/Her",
      viewer: "public",
      subject: "Pronouns",
    },
    {
      value: "1900-25-May",
      viewer: "public",
      subject: "Birthday",
    },
    {
      value: "Persian English",
      viewer: "public",
      subject: "Language(s)",
    },
  ];

  return (
    <Stack>
      <Stack spacing={5}>
        <ContactInfo myContact={contact} />
        <Websites myWebsites={websites} />
        <BasicInfo myBasicInfo={basicInfo} />
      </Stack>
    </Stack>
  );
}

function ContactInfo({ myContact }) {
  const [contact, setContact] = useState(myContact);
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Contact
      </Typography>
      {contact.map((j, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={j.viewer}
            list={contact}
            setList={setContact}
            value={j.value}
            subject={j.subject}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={j.subject} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{j.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{j.subject}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}

function Websites({ myWebsites }) {
  const [websites, setWebsites] = useState(myWebsites);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Website & Social Media
      </Typography>
      {websites.map((j, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={j.viewer}
            list={websites}
            setList={setWebsites}
            value={j.value}
            subject={j.subject}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={j.subject} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{j.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{j.subject}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}

function BasicInfo({ myBasicInfo }) {
  const [basicInfo, setBasicInfo] = useState(myBasicInfo);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      {basicInfo.map((j, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={j.viewer}
            list={basicInfo}
            setList={setBasicInfo}
            value={j.value}
            subject={j.subject}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={j.subject} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{j.value}</Typography>
                  <Typography sx={{ fontSize: 10 }}>{j.subject}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}
