import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import FilterViewer from "../../Profile/FilterViewer";

export default function Contact() {
  const contactInfo = [
    { title: "Contact Info", icon: <PhoneIcon />, value: "2424242424" },
    {
      title: "Websites and social links",
      icon: <PhoneIcon />,
      value: "2424242424",
    },
    { title: "Basic info", icon: <PhoneIcon />, value: "2424242424" },
  ];
  return (
    <Stack spacing={5}>
      {contactInfo.map((item) => (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            {item.title}
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "grey.600" }} />
              <Typography>{item.text}</Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
      <FilterViewer />
    </Stack>
  );
}
