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
import Diversity1Icon from '@mui/icons-material/Diversity1';
export default function Overview() {
  return (
    <Stack sx={{ my: 10, mx: 5, gap: 4 }}>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <SchoolIcon />
        <Typography sx={{ fontSize: "18px" }}>
          Studied at {"ye chizi"}
        </Typography>
        <Box></Box>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <HomeIcon />
        <Typography sx={{ fontSize: "18px" }}>Lives in {"ye chizi"}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <PlaceIcon />
        <Typography sx={{ fontSize: "18px" }}>From {"ye chizi"}</Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <LoyaltyIcon />
        <Typography sx={{ fontSize: "18px" }}>
          Married to {"ye chizi"}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <LocalPhoneIcon />
        <Typography sx={{ fontSize: "18px" }}>
          Phone number {"ye chizi"}
        </Typography>
      </Stack>
    </Stack>
  );
}
