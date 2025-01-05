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
        text="styudy ate ye chizi"
        icon=<SchoolIcon />
        myViewer="public"
      />
      <OverviewItems
        text="Lives in ye chizi"
        icon=<HomeIcon />
        myViewer="public"
      />
      <OverviewItems
        text="from ye chizi"
        icon=<PlaceIcon />
        myViewer="public"
      />
      <OverviewItems
        text="Married to ye chizi"
        icon=<LoyaltyIcon />
        myViewer="public"
      />
      <OverviewItems
        text="phone number ye chizi"
        icon=<LocalPhoneIcon />
        myViewer="public"
      />
    </Stack>
  );
}
