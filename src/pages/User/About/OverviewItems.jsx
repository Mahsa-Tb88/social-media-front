import { Box, Stack, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import MyIconButton from "../../../components/Customized/MyIconButton";
import FilterViewer from "../Profile/FilterViewer";
import GroupIcon from "@mui/icons-material/Group";
import MenuOverview from "./MenuOverview";

export default function OverviewItems({
  icon,
  text,
  subject,
  value,
  myViewer,
  
}) {
  const theme = useSelector((state) => state.app.theme);

  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(myViewer);
  const [open, setOpen] = useState(false);
  const menuOverviewAnchor = useRef(null);

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          {icon}
          <Typography sx={{ fontSize: "18px" }}>{text} {value}</Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Box>
            {viewer == "friends" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  p: 0.7,
                  "&:hover": {
                    bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                  },
                }}
              >
                <GroupIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    borderRadius: "50%",

                    "&:hover": {
                      bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                    },
                  }}
                  onClick={() => setOpenFilterViewer(true)}
                />
              </Box>
            ) : viewer == "public" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  p: 0.7,
                  "&:hover": {
                    bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                  },
                }}
              >
                <PublicIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                  onClick={() => setOpenFilterViewer(true)}
                />
              </Box>
            ) : viewer == "except" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  p: 0.7,
                  "&:hover": {
                    bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                  },
                }}
              >
                <GroupRemoveIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    borderRadius: "50%",

                    "&:hover": {
                      bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                    },
                  }}
                  onClick={() => setOpenFilterViewer(true)}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  p: 0.7,
                  "&:hover": {
                    bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                  },
                }}
              >
                <LockIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    borderRadius: "50%",

                    "&:hover": {
                      bgcolor: theme === "dark" ? "grey.800" : "grey.200",
                    },
                  }}
                  onClick={() => setOpenFilterViewer(true)}
                />
              </Box>
            )}
          </Box>
          <Box>
            <Tooltip>
              <MyIconButton onClick={() => setOpen(true)}>
                <MoreHorizIcon sx={{ fontSize: 15 }} ref={menuOverviewAnchor} />
              </MyIconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>
      <Box>
        <FilterViewer
          open={openFilterViewer}
          onClose={() => setOpenFilterViewer(false)}
          setViewer={setViewer}
          viewer={viewer}
        />
        <MenuOverview
          open={open}
          handleClose={() => setOpen(false)}
          anchorEl={menuOverviewAnchor.current}
          subject={subject}
          text={text}
          value={value}
        />
      </Box>
    </Stack>
  );
}
