import {
  Box,
  Dialog,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import noImage from "../../../assets/images/user.png";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import PublicIcon from "@mui/icons-material/Public";

export default function PostProfile({ open, onClose }) {
  const profile = useSelector((state) => state.user.profile);
  const [viewer, setViewer] = useState("friends");

  function handleViewr(e) {
    setViewer(e.target.value);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box></Box>
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          Create Post
        </Typography>
        <MyIconButton>
          <Close />
        </MyIconButton>
      </Stack>
      <Divider />
      <Stack sx={{p:2}}>
        <Stack sx={{ flexDirection: "row" }}>
          <Box
            component="img"
            src={profile.profileImg ? SERVER_URL + profile.profileImg : noImage}
            sx={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <Typography>{profile.username}</Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={viewer}
                onChange={handleViewr}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="friends">Friends</MenuItem>
                <MenuItem value="public">Public</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
