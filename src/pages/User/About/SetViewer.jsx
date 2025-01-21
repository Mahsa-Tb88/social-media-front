import { Box, Stack, Tooltip } from "@mui/material";
import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";
import MyIconButton from "../../../components/Customized/MyIconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

export default function SetViewer({
  setOpenFilterViewer,
  viewer,
  menuAnchor,
  setOpen,
}) {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Box>
        {viewer == "friends" ? (
          <BoxIcon setOpenFilterViewer={setOpenFilterViewer}>
            <GroupIcon />
          </BoxIcon>
        ) : viewer == "public" ? (
          <BoxIcon setOpenFilterViewer={setOpenFilterViewer}>
            <PublicIcon />
          </BoxIcon>
        ) : viewer == "except" ? (
          <BoxIcon setOpenFilterViewer={setOpenFilterViewer}>
            <GroupRemoveIcon />
          </BoxIcon>
        ) : (
          <BoxIcon setOpenFilterViewer={setOpenFilterViewer}>
            <LockIcon />
          </BoxIcon>
        )}
      </Box>
      <Box>
        <Tooltip>
          <MyIconButton onClick={() => setOpen(true)}>
            <MoreHorizIcon sx={{ fontSize: 15 }} ref={menuAnchor} />
          </MyIconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
}

function BoxIcon({ children, setOpenFilterViewer }) {
  const theme = useSelector((state) => state.app.theme);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        cursor: "pointer",
        p: 0.7,
        "&:hover": {
          bgcolor: theme === "dark" ? "grey.800" : "grey.200",
        },
      }}
      onClick={() => setOpenFilterViewer(true)}
    >
      {children}
    </Box>
  );
}
