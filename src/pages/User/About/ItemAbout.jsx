import { Box, Button, Stack, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import FilterViewer from "../Profile/FilterViewer";
import MenuItem from "./MenuItem";
import ShowIcon from "./ShowIcon";
import SetViewer from "./SetViewer";
import EditValueSubject from "./EditVelueSubject";

export default function ItemAbout({
  children,
  myViewer,
  list = [],
  setList = [],
  value,
  subject,
  id,
  type,
  title = "",
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
      {!value ? (
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Box>
            <ShowIcon subject={subject} />
          </Box>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddSubject(true)}
          >
            Add {subject}
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddSubject}
            onCloseEdit={() => setOpenAddSubject(false)}
            subject={subject}
            value={value}
            list={list}
            setList={setList}
            title={title}
            type="new"
          />
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
          title={title}
        />
      </Stack>
    </Stack>
  );
}

function MenuItemAbout({ myViewer, list, setList, value, subject, id, title }) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(myViewer);
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);

  return (
    <Stack>
      {value && (
        <SetViewer
          viewer={viewer}
          setOpenFilterViewer={setOpenFilterViewer}
          menuAnchor={menuAnchor}
          setOpen={setOpen}
        />
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
        title={title}
      />
    </Stack>
  );
}
