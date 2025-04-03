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
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function ShowIcon({ subject, item }) {
  return (
    <Stack>
      {subject == "Phone" ? (
        <PhoneIcon />
      ) : subject == "Email" ? (
        <EmailIcon />
      ) : subject == "Website" ? (
        <LanguageIcon />
      ) : subject == "LinkedIn" ? (
        <LinkedInIcon />
      ) : subject == "Github" ? (
        <GitHubIcon />
      ) : subject == "Education" || subject == "School" ? (
        <SchoolIcon />
      ) : subject == "Gender" ? (
        <Face4Icon />
      ) : subject == "Pronouns" ? (
        <SmsIcon />
      ) : subject == "Birthday" ? (
        <CakeIcon />
      ) : subject == "Language" ? (
        <ExplicitIcon />
      ) : subject == "current city" ? (
        <LocationOnIcon />
      ) : subject == "Hometown" ? (
        <HomeIcon />
      ) : subject == "Status" && item == "Married" ? (
        <LoyaltyIcon />
      ) : subject == "Status" && item == "Single" ? (
        <PersonIcon />
      ) : subject == "Status" && item == "In relationship" ? (
        <FavoriteIcon />
      ) : subject == "Status" ? (
        <HelpIcon />
      ) : subject == "Phone" || subject == "Mobile" ? (
        <LocalPhoneIcon />
      ) : subject == "Single" ? (
        <PersonIcon />
      ) : subject == "In relationship" ? (
        <FavoriteIcon />
      ) : subject == "Married" ? (
        <LoyaltyIcon />
      ) : subject == "Hometown" ? (
        <HomeIcon />
      ) : subject == "BornIn" ? (
        <HomeIcon />
      ) : subject == "Location" || subject == "Used to live" ? (
        <PlaceIcon />
      ) : subject == "Family" ? (
        <Diversity1Icon />
      ) : subject == "Relationship" ? (
        <FavoriteIcon />
      ) : subject == "Pronounce" ? (
        <TextSnippetIcon />
      ) : (
        <HomeRepairServiceIcon />
      )}
    </Stack>
  );
}
