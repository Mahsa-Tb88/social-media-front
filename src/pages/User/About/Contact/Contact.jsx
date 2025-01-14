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
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FilterViewer from "../../Profile/FilterViewer";
import ItemAbout from "../ItemAbout";

export default function Contact() {
  const myContactInfo = [
    {
      title: "Contact Info",
      items: [
        {
          icon: <PhoneIcon />,
          value: "2424242424",
          viewer: "public",
          subject: "Mobile",
        },
        {
          icon: <EmailIcon />,
          value: "mah@gmail.com",
          viewer: "public",
          subject: "Email",
        },
      ],
    },
    {
      title: "Websites and social links",
      items: [
        {
          icon: <LanguageIcon />,
          value: "https://web.com",
          viewer: "public",
          subject: "Website",
        },
        {
          icon: <LinkedInIcon />,
          value: "https://linkedin.com.ananan",
          viewer: "public",
          subject: "LinkedIn",
        },
        {
          icon: <GitHubIcon />,
          value: "https://github.com.ananan",
          viewer: "public",
          subject: "Github",
        },
      ],
    },
    {
      title: "Basic info",
      items: [
        {
          icon: <Face4Icon />,
          value: "Female",
          viewer: "public",
          subject: "Gender",
        },
        {
          icon: <SmsIcon />,
          value: "She/Her",
          viewer: "public",
          subject: "Pronouns",
        },
        {
          icon: <CakeIcon />,
          value: "1988-25-Nov",
          viewer: "public",
          subject: "Birthday",
        },
        {
          icon: <ExplicitIcon />,
          value: "Persian English",
          viewer: "public",
          subject: "Language(s)",
        },
      ],
    },
  ];
  const [list, setList] = useState([]);
  const [contactInfo, setContactInfo] = useState(myContactInfo);

  useEffect(() => {
    // found the object with the change
    let findItem = [];
    contactInfo.forEach((p) => {
      p.items.forEach((element) => {
        if (element?.subject == list[0]?.subject) {
          findItem = { title: p.title, items: list };
        }
      });
    });
    // update contactInfo list
    const newContactInfo = contactInfo.map((item) => {
      if (item?.title == findItem?.title) {
        return findItem;
      } else {
        return item;
      }
    });
    setContactInfo(newContactInfo);
  }, [list]);

  return (
    <Stack>
      <Stack spacing={5}>
        {contactInfo.map((i) => (
          <Stack>
            <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
              {i.title}
            </Typography>
            <Stack spacing={1}>
              {i.items.map((j, index) => (
                <Stack key={index}>
                  <ItemAbout
                    myViewer={j.viewer}
                    list={i.items}
                    setList={setList}
                    value={j.value}
                    subject={j.subject}
                    icon={j.icon}
                  >
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box>{j.icon}</Box>
                      <Stack>
                        <Stack>
                          <Typography>{j.value}</Typography>
                          <Typography sx={{ fontSize: 10 }}>
                            {j.subject}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </ItemAbout>
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
