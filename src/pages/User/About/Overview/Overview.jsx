import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ItemAbout from "../ItemAbout";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { useSelector } from "react-redux";

export default function Overview() {
  const listOverview = [
    {
      text: "Study at",
      value: "Isfahan University",
      myViewer: "public",
      subject: "School",
      icon: <SchoolIcon />,
    },
    {
      text: "Lives in",
      value: "Canada",
      myViewer: "friends",
      subject: "Location",
      icon: <LocationOnIcon />,
    },
    {
      text: "From",
      value: "Tabriz",
      myViewer: "public",
      subject: "Hometown",
      icon: <HomeIcon />,
    },
    {
      text: "I am",
      value: "Married",
      myViewer: "public",
      subject: "Status",
      icon: <HelpIcon />,
    },
    {
      text: "Phone",
      value: "28282828",
      myViewer: "private",
      subject: "Phone",
      icon: <LocalPhoneIcon />,
    },
    {
      text: "Email",
      value: "mah@gmail.com",
      myViewer: "private",
      subject: "Email",
      icon: <EmailIcon />,
    },
  ];
  const theme = useSelector((state) => state.app.theme);
  const [list, setList] = useState(listOverview);

  return (
    <Stack sx={{ gap: 4 }}>
      {list.map((p, index) => {
        return (
          <Stack key={index}>
            <ItemAbout
              myViewer={p.myViewer}
              list={list}
              setList={setList}
              value={p.value}
              subject={p.subject}
              icon={p.icon}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      color: "grey.600",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {p.value == "Single" ? (
                      <PersonIcon />
                    ) : p.value == "In relationship" ? (
                      <FavoriteIcon />
                    ) : p.value == "Married" ? (
                      <LoyaltyIcon />
                    ) : (
                      p.icon
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme == "light" ? "grey.700" : "grey.300",
                      fontSize: 18,
                    }}
                  >
                    {p.text}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>{p.value}</Typography>
                </Stack>
              </Stack>
            </ItemAbout>
          </Stack>
        );
      })}
    </Stack>
  );
}
