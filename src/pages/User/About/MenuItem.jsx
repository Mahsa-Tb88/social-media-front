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
import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "../../../store/slices/userInfoSlice";
import { useDeleteOverview } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
export default function MenuItem({
  open,
  anchorEl,
  handleClose,
  subject,
  value,
  title,
  id,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const userId = useSelector((state) => state.user.profile._id);

  const mutation = useDeleteOverview();
  const querryClient = useQueryClient();

  function deleteItem() {
    if (title == "overview") {
      const data = { id: userId, subject };

      mutation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["overview"],
          });
        },
        onError(e) {
          console.log(e);
        },
      });
    }

    handleClose();
    let newList;
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
        title={title}
        type="edit"
      />
    </Menu>
  );
}
