import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Face4Icon from "@mui/icons-material/Face4";
import FaceIcon from "@mui/icons-material/Face";
import SmsIcon from "@mui/icons-material/Sms";
import CakeIcon from "@mui/icons-material/Cake";
import ExplicitIcon from "@mui/icons-material/Explicit";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";

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
      value: "1988-25-Nov",
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
      {myContact.map((j, index) => (
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
              <Box>{j.subject == "Mobile" ? <PhoneIcon /> : <EmailIcon />}</Box>
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
      {myWebsites.map((j, index) => (
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
                {j.subject == "Website" ? (
                  <LanguageIcon />
                ) : j.subject == "LinkedIn" ? (
                  <LinkedInIcon />
                ) : (
                  <GitHubIcon />
                )}
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
      {myBasicInfo.map((j, index) => (
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
                {j.subject == "Gender" ? (
                  <Face4Icon />
                ) : j.subject == "Pronouns" ? (
                  <SmsIcon />
                ) : j.subject == "Birthday" ? (
                  <CakeIcon />
                ) : (
                  <ExplicitIcon />
                )}
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
