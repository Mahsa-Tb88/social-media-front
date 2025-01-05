import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Stack,
  Box,
  Radio,
} from "@mui/material";
import React from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close, Public } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";

export default function FilterViewer({ open, onClose, setViewer, viewer }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Select audience
        </Typography>
        <MyIconButton onClick={onClose}>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ fontSize: 18 }}>Who can see?</Typography>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <Public />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Public</Typography>
              <Typography>Anyone on or of Facebook</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="public"
              onChange={(e) => setViewer(e.target.value)}
              checked={viewer == "public"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <PeopleIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Friends</Typography>
              <Typography>Your friends on Facebook</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="friends"
              onChange={(e) => setViewer(e.target.value)}
              checked={viewer == "friends"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <GroupRemoveIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                Friends Except...
              </Typography>
              <Typography>Do not show to some friends</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="except"
              onChange={(e) => setViewer(e.target.value)}
              checked={viewer == "except"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <LockIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Only Me</Typography>
              <Typography>It is private</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="private"
              onChange={(e) => setViewer(e.target.value)}
              checked={viewer == "private"}
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
