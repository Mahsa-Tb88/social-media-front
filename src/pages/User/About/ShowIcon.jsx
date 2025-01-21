import { Stack } from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";
import Face4Icon from "@mui/icons-material/Face4";
import SmsIcon from "@mui/icons-material/Sms";
import CakeIcon from "@mui/icons-material/Cake";
import ExplicitIcon from "@mui/icons-material/Explicit";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

export default function ShowIcon({ subject }) {
  return (
    <Stack>
      {subject == "Mobile" ? (
        <PhoneIcon />
      ) : subject == "Email" ? (
        <EmailIcon />
      ) : subject == "Website" ? (
        <LanguageIcon />
      ) : subject == "LinkedIn" ? (
        <LinkedInIcon />
      ) : subject == "Github" ? (
        <GitHubIcon />
      ) : subject == "education" || subject == "School" ? (
        <SchoolIcon />
      ) : subject == "Gender" ? (
        <Face4Icon />
      ) : subject == "Pronouns" ? (
        <SmsIcon />
      ) : subject == "Birthday" ? (
        <CakeIcon />
      ) : subject == "Language(s)" ? (
        <ExplicitIcon />
      ) : subject == "Location" ? (
        <LocationOnIcon />
      ) : subject == "Hometown" ? (
        <HomeIcon />
      ) : subject == "Status" ? (
        <HelpIcon />
      ) : subject == "Phone" ? (
        <LocalPhoneIcon />
      ) : subject == "Single" ? (
        <PersonIcon />
      ) : subject == "In relationship" ? (
        <FavoriteIcon />
      ) : subject == "Married" ? (
        <LoyaltyIcon />
      ) : subject == "Hometown" ? (
        <HomeIcon />
      ) : subject == "Born in" ? (
        <HomeIcon />
      ) : subject == "Current city" || subject == "used to live" ? (
        <PlaceIcon />
      ) : (
        <HomeRepairServiceIcon />
      )}
    </Stack>
  );
}
