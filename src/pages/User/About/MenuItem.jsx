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
import EditValueSubject from "./Overview/EditVelueSubject";

export default function MenuItem({
  open,
  anchorEl,
  handleClose,
  subject,
  value,
  setList,
  list,
  id,
}) {
  const [openEdit, setOpenEdit] = useState(false);

  function deleteItem(value) {
    handleClose();
    let newList;
    if (id) {
      newList = list.filter((l) => l.id != id);
    } else {
      newList = list.map((l) => {
        if (l.value && l.value == value) {
          return { ...l, value: "" };
        } else if (l.city && l.city == value) {
          return { ...l, city: "" };
        } else {
          return l;
        }
      });
    }
    console.log(newList);
    setList(newList);
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
        value={value}
        list={list}
        setList={setList}
        type="edit"
      />
    </Menu>
  );
}
