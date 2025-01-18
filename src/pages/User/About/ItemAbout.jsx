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

export default function ItemAbout({
  children,
  myViewer,
  list,
  setList,
  value,
  subject,
  icon,
  id,
  type,
}) {
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
        <MenuItemAbout
          myViewer={myViewer}
          list={list}
          setList={setList}
          value={value}
          subject={subject}
          openAddSubject={openAddSubject}
          setOpenAddSubject={setOpenAddSubject}
          id={id}
          type={type}
        />
      </Stack>
    </Stack>
  );
}

function MenuItemAbout({ myViewer, list, setList, value, subject, id, type }) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(myViewer);
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);

  function checkValue(obj) {
    for (let key in obj) {
      if (obj[key] === "") {
        return "";
      }
    }
    return "no";
  }

  return (
    <Stack>
      {(value || checkValue(value)) && (
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
      <FilterViewer
        open={openFilterViewer}
        onClose={() => setOpenFilterViewer(false)}
        setViewer={setViewer}
        viewer={viewer}
        value={value}
      />
      <MenuItem
        open={open}
        handleClose={() => setOpen(false)}
        anchorEl={menuAnchor.current}
        subject={subject}
        value={value}
        list={list}
        setList={setList}
        id={id}
        type={type}
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

{
  /* <EditValueSubject
        subject={subject}
        openEdit={openAddSubject}
        onCloseEdit={() => setOpenAddSubject(false)}
        value={value}
        setList={setList}
        list={list}
        id={id}
        type={type}
      /> */
}
