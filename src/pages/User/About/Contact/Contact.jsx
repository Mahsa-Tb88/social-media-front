import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import { useSelector } from "react-redux";

export default function Contact() {
  // const contactff = [
  //   {
  //     value: "2424242424",
  //     viewer: "public",
  //     subject: "Mobile",
  //   },
  //   {
  //     value: "mah@gmail.com",
  //     viewer: "public",
  //     subject: "Email",
  //   },
  // ];

  // const websites = [
  //   {
  //     value: "https://web.com",
  //     viewer: "public",
  //     subject: "Website",
  //   },
  //   {
  //     value: "https://linkedin.com.ananan",
  //     viewer: "public",
  //     subject: "LinkedIn",
  //   },
  //   {
  //     value: "https://github.com.ananan",
  //     viewer: "public",
  //     subject: "Github",
  //   },
  // ];

  // const basicInfo = [
  //   {
  //     value: "Female",
  //     viewer: "public",
  //     subject: "Gender",
  //   },
  //   {
  //     value: "She/Her",
  //     viewer: "public",
  //     subject: "Pronouns",
  //   },
  //   {
  //     value: "1900-25-May",
  //     viewer: "public",
  //     subject: "Birthday",
  //   },
  //   {
  //     value: "Persian English",
  //     viewer: "public",
  //     subject: "Language(s)",
  //   },
  // ];

  return (
    <Stack>
      <Stack spacing={5}>
        <ContactInfo />
        <Websites />
        <BasicInfo />
      </Stack>
    </Stack>
  );
}

function ContactInfo({}) {
  const contactt = useSelector((state) => state.user.contact);

  const contact = [
    { mobile: "", viewer: "private" },
    { email: "", viewer: "private" },
  ];
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Contact
      </Typography>
      {contact.map((c, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={c.viewer}
            value={Object.values(c)[0]}
            subject={Object.keys(c)[0]}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={Object.keys(c)[0]} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{Object.values(c)[0]}</Typography>
                  <Typography sx={{ fontSize: 10 }}>
                    {Object.keys(c)[0]}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}

function Websites() {
  const websites = useSelector((state) => state.user.websites);

  const website = [
    { website: "", viewer: "private" },
    { linkedIn: "", viewer: "private" },
    { github: "", viewer: "private" },
  ];

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Website & Social Media
      </Typography>
      {website.map((w, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={w.viewer}
            value={Object.values(w)[0]}
            subject={Object.keys(w)[0]}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={Object.keys(w)[0]} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{Object.values(w)[0]}</Typography>
                  <Typography sx={{ fontSize: 10 }}>
                    {Object.keys(w)[0]}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}

function BasicInfo() {
  const basicInfoo = useSelector((state) => state.user.baseInfo);
  const baseInfo = [
    { gender: "", viewer: "private" },
    { pronouns: "", viewer: "private" },
    { birthday: "", viewer: "private" },
    { language: "", viewer: "private" },
  ];
  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Basic Info
      </Typography>
      {baseInfo.map((b, index) => (
        <Stack key={index}>
          <ItemAbout
            myViewer={b.viewer}
            value={Object.values(b)[0]}
            subject={Object.keys(b)[0]}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <ShowIcon subject={Object.keys(b)[0]} />
              </Box>
              <Stack>
                <Stack>
                  <Typography>{Object.values(b)[0]}</Typography>
                  <Typography sx={{ fontSize: 10 }}>
                    {Object.keys(b)[0]}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
    </Stack>
  );
}
