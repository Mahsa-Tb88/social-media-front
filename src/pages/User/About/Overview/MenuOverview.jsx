import { Delete, Edit } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import EditValueSubject from "./EditVelueSubject";

export default function MenuOverview({
  open,
  anchorEl,
  handleClose,
  subject,
  text,
  value,
  setOverview,
  overview,
}) {
  const [openEdit, setOpenEdit] = useState(false);

  function deleteItem(value) {
    console.log(overview);
    handleClose();
    const newOverview = overview.map((item) => {
      if (item.value == value) {
        return { ...item, value: "" };
      } else {
        return item;
      }
    });

    setOverview(newOverview);
  }

  function onCloseEdit() {
    setOpenEdit(false);
    handleClose();
  }
  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        <ListItem>
          <ListItemButton onClick={() => setOpenEdit(true)}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Edit {subject}</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton onClick={() => deleteItem(value)}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete {subject}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <EditValueSubject
        openEdit={openEdit}
        onCloseEdit={onCloseEdit}
        handleClose={handleClose}
        subject={subject}
        text={text}
        value={value}
        overview={overview}
        setOverview={setOverview}
      />
    </Menu>
  );
}
