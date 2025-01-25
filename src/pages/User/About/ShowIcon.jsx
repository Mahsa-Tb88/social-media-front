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
import Diversity1Icon from "@mui/icons-material/Diversity1";

export default function ShowIcon({ subject }) {
  return (
    <Stack>
      {subject == "cellphone" || subject == "mobile" ? (
        <PhoneIcon />
      ) : subject == "email" ? (
        <EmailIcon />
      ) : subject == "website" ? (
        <LanguageIcon />
      ) : subject == "linkedIn" ? (
        <LinkedInIcon />
      ) : subject == "github" ? (
        <GitHubIcon />
      ) : subject == "education" || subject == "school" ? (
        <SchoolIcon />
      ) : subject == "gender" ? (
        <Face4Icon />
      ) : subject == "pronouns" ? (
        <SmsIcon />
      ) : subject == "birthday" ? (
        <CakeIcon />
      ) : subject == "language" ? (
        <ExplicitIcon />
      ) : subject == "Location" || subject == "current city" ? (
        <LocationOnIcon />
      ) : subject == "hometown" ? (
        <HomeIcon />
      ) : subject == "status" ? (
        <HelpIcon />
      ) : subject == "Phone" ? (
        <LocalPhoneIcon />
      ) : subject == "Single" ? (
        <PersonIcon />
      ) : subject == "In relationship" ? (
        <FavoriteIcon />
      ) : subject == "Married" ? (
        <LoyaltyIcon />
      ) : subject == "hometown" ? (
        <HomeIcon />
      ) : subject == "bornIn" ? (
        <HomeIcon />
      ) : subject == "location" || subject == "used to live" ? (
        <PlaceIcon />
      ) : subject == "Family" ? (
        <Diversity1Icon />
      ) : subject == "Relationship" ? (
        <FavoriteIcon />
      ) : (
        <HomeRepairServiceIcon />
      )}
    </Stack>
  );
}
