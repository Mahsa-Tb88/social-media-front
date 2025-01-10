import { Stack } from "@mui/material";
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OverviewItems from "./OverviewItems";

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
  const [overview, setOverview] = useState(listOverview);
  console.log("comp...", overview);
  return (
    <Stack sx={{ gap: 4 }}>
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
