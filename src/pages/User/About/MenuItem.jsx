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
  title = "",
}) {
  const [openEdit, setOpenEdit] = useState(false);
  function deleteItem(value) {
    handleClose();
    let newList;

    if (id) {
      newList = list.filter((l) => l.id != id);
      setList(newList);
    } else if (list[0].hasOwnProperty("value")) {
      newList = list.map((l) => {
        if (l.value == value) {
          return { ...l, value: "" };
        } else {
          return l;
        }
      });
      setList(newList);
    }

    if (title == "city") {
      console.log(" city is...", list);
      console.log("value is...", value);
      if (list.length <= 3) {
        if (subject == "used to live") {
          newList = list.filter((l) => l.city != value);
        } else {
          newList = list.map((l) => {
            if (l.city == value) {
              return { ...l, city: "" };
            } else {
              return l;
            }
          });
        }
      } else {
        console.log("subject", subject);
        if (subject == "used to live") {
          newList = list.filter((l) => l.city != value);
        } else {
          newList = list.map((l) => {
            if (l.city == value) {
              return { ...l, city: "" };
            } else {
              return l;
            }
          });
        }
      }

      setList(newList);
    }
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
        title={title}
      />
    </Menu>
  );
}
