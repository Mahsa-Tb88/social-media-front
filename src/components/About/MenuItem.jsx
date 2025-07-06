/* eslint-disable react/prop-types */
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
import {
  useDeleteContactBaseInfo,
  useDeleteEducation,
  useDeleteFamilyMember,
  useDeleteOverview,
  useDeletePlace,
  useDeleteRelationship,
  useDeleteWork,
} from "../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  const mutationFamily = useDeleteFamilyMember();
  const mutationPlace = useDeletePlace();
  const mutationContactInfo = useDeleteContactBaseInfo();
  const querryClient = useQueryClient();
  const userId = useParams().id;
  function deleteItem() {
    console.log(";;;;", title);

    if (title == "overview") {
      const data = { id: userId, subject };

      mutationOverview.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["overview"],
          });
          console.log("d", d);
          toast.success(d.data.message);
        },
        onError(e) {
          console.log(e);
          toast.error(e.response.data.message);
        },
      });
    }

    if (title == "contactBaseInfo") {
      const data = { id: userId, subject };
      console.log("data", data);

      mutationContactInfo.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["contactBaseInfo"],
          });
          toast.success(d.data.message);
        },
        onError(e) {
          console.log(e);
          toast.error(e.response.data.message);
        },
      });
    }

    if (title == "Work") {
      const data = { id, userId };
      mutationWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["work"] });
          toast.success(d.data.message);
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    }
    if (title == "Education") {
      const data = { id, userId };
      mutationEducation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["education"] });
          toast.success(d.data.message);
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    }
    if (title == "Relationship") {
      const data = { id: userId };
      mutationRel.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
          toast.success(d.data.message);
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    }
    if (title == "Family") {
      const data = { id: userId, userDeleteId: id };
      mutationFamily.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["familyRel"] });
          toast.success(d.data.message);
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    }
    if (
      title == "hometown" ||
      title == "currentCity" ||
      title == "usedToLiveCity"
    ) {
      const data = { id: userId, titleId: id, title };
      mutationPlace.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["placeLived"] });
          toast.success(d.data.message);
        },
        onError(e) {
          toast.error(e.response.data.message);
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
