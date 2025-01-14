import { Box, Button, Stack, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import FilterViewer from "../Profile/FilterViewer";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";
import MyIconButton from "../../../components/Customized/MyIconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import EditValueSubject from "./Overview/EditVelueSubject";

export default function ItemAbout({
  children,
  myViewer,
  list,
  setList,
  value,
  subject,
  icon,
}) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(myViewer);
  const [openAddSubject, setOpenAddSubject] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {value == 0 ? (
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Box>{icon}</Box>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddSubject(true)}
          >
            Add {subject}
          </Button>
          <Box></Box>
        </Stack>
      ) : (
        <Stack>{children}</Stack>
      )}
      <Stack>
        <Option
          viewer={viewer}
          setOpenFilterViewer={() => setOpenFilterViewer(true)}
          list={list}
          setList={setList}
          value={value}
          subject={subject}
          openAddSubject={openAddSubject}
          setOpenAddSubject={setOpenAddSubject}
        />
      </Stack>
      <FilterViewer
        open={openFilterViewer}
        onClose={() => setOpenFilterViewer(false)}
        setViewer={setViewer}
        viewer={viewer}
        value={value}
      />
    </Stack>
  );
}

function Option({
  viewer,
  setOpenFilterViewer,
  list,
  setList,
  value,
  subject,
  openAddSubject,
  setOpenAddSubject,
}) {
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);

  return (
    <Stack>
      {value && (
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
      )}
      <MenuItem
        open={open}
        handleClose={() => setOpen(false)}
        anchorEl={menuAnchor.current}
        subject={subject}
        value={value}
        list={list}
        setList={setList}
      />
      <EditValueSubject
        subject={subject}
        openEdit={openAddSubject}
        onCloseEdit={() => setOpenAddSubject(false)}
        value={value}
        setList={setList}
        list={list}
      />
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
