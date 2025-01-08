import { Stack } from "@mui/material";
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import OverviewItems from "./OverviewItems";
export default function Overview() {
  const Overview = [
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
      icon: <PlaceIcon />,
    },
    {
      text: "From",
      value: "Tabriz",
      myViewer: "public",
      subject: "Hometown",
      icon: <LoyaltyIcon />,
    },
    {
      text: "Satus",
      value: "Married",
      myViewer: "public",
      subject: "status",
      icon: <LoyaltyIcon />,
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

  const [value, setValue] = useState();
  return (
    <Stack sx={{ my: 10, mx: 5, gap: 4 }}>
      {Overview.map((p) => {
        return (
          <OverviewItems
            text={p.text}
            value={p.value}
            myViewer={p.myViewer}
            subject={p.subject}
            icon={p.icon}
          />
        );
      })}
    </Stack>
  );
}
