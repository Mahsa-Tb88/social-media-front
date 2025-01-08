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
import EditAbout from "./EditAbout";

export default function MenuOverview({
  open,
  anchorEl,
  handleClose,
  subject,
  text,
  value,
}) {
  const [openEdit, setOpenEdit] = useState(false);
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
          <ListItemButton>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete {subject}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <EditAbout
        openEdit={openEdit}
        onCloseEdit={() => setOpenEdit(false)}
        handleClose={handleClose}
        subject={subject}
        text={text}
        value={value}
      />
    </Menu>
  );
}
