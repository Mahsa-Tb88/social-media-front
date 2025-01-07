import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import OverviewItems from "./OverviewItems";
export default function Overview() {
  const Overview = [{ text: "study at..." }];
  return (
    <Stack sx={{ my: 10, mx: 5, gap: 4 }}>
      <OverviewItems
        text="study at"
        value="ye chizi"
        icon=<SchoolIcon />
        myViewer="public"
        subject="school"
      />
      <OverviewItems
        text="Lives in"
        value="ye chizi"
        icon=<HomeIcon />
        myViewer="public"
        subject="Lives in"
      />
      <OverviewItems
        text="From"
        value="ye chizi"
        icon=<PlaceIcon />
        myViewer="public"
        subject="Hometown"
      />
      <OverviewItems
        text="Married to"
        value="ye chizi"
        icon=<LoyaltyIcon />
        myViewer="public"
        subject="Status"
      />
      <OverviewItems
        text="phone number ye chizi"
        value="ye chizi"
        icon=<LocalPhoneIcon />
        myViewer="public"
        subject="Phone number"
      />
    </Stack>
  );
}
