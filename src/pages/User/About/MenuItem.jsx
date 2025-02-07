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
import { useSelector } from "react-redux";
import {
  useDeleteContactBaseInfo,
  useDeleteEducation,
  useDeleteOverview,
  useDeleteRelationship,
  useDeleteWork,
} from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

  const mutationOverview = useDeleteOverview();
  const mutationWork = useDeleteWork();
  const mutationEducation = useDeleteEducation();
  const mutationRel = useDeleteRelationship();
  const querryClient = useQueryClient();
  const userId = useParams().id;
  console.log("rirleee", title);
  function deleteItem() {
    if (title == "overview") {
      const data = { id: userId, subject };

      mutationOverview.mutate(data, {
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

    if (title == "contactBaseInfo") {
      const mutation = useDeleteContactBaseInfo();

      const data = { id: userId, subject };
      mutation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["contactBaseInfo"],
          });
        },
        onError(e) {
          console.log(e);
        },
      });
    }

    if (title == "Work") {
      const data = { id, userId };
      mutationWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["work"] });
        },
        onError(error) {
          console.log("error is", error);
        },
      });
    }
    if (title == "Education") {
      const data = { id, userId };

      mutationEducation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["education"] });
        },
        onError(error) {
          console.log("error is", error);
        },
      });
    }
    if (title == "Relationship") {
      const data = { id: userId };
      mutationRel.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
        },
        onError(error) {
          console.log("error", error);
        },
      });
    }
    handleClose();
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
        id={id}
        type="edit"
      />
    </Menu>
  );
}
