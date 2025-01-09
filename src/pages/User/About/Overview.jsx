import { Stack } from "@mui/material";
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import OverviewItems from "./OverviewItems";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
      text: "Status",
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
  const [overview, setOverview] = useState(listOverview);
  console.log("comp...", overview);
  return (
    <Stack sx={{ my: 10, mx: 5, gap: 4 }}>
      {overview.map((p) => {
        return (
          <OverviewItems
            key={p.subject}
            text={p.text}
            value={p.value}
            myViewer={p.myViewer}
            subject={p.subject}
            icon={p.icon}
            setOverview={setOverview}
            overview={overview}
          />
        );
      })}
    </Stack>
  );
}
