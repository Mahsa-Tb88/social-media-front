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
  text,
  value,
  setList,
  list,
  id,
  type 
}) {
  const [openEdit, setOpenEdit] = useState(false);

  function deleteItem(value) {
    console.log("value", id);
    console.log("list", list);
    console.log("sub", subject);
    handleClose();
    let newList;

    newList = list.filter((l) => l._id != id);
    console.log("new List", newList);
    setList(newList);
    //   if (item.value == value) {
    //     return { ...item, value: "" };
    //   } else {
    //     return item;
    //   }
    // });
    // console.log("new List", newList);
    // setList(newList);
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
        list={list}
        setList={setList}
        type={type}
      />
    </Menu>
  );
}
