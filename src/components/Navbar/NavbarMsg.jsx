import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChangeToRead } from "../../utils/mutation";
import { userActions } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function NavbarMsg({ open, anchorEl, handleClose }) {
  const userLoging = useSelector((state) => state.user.profile);
  const msgList = userLoging.messages || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useChangeToRead();
  function clickHandler(id, chatId) {
    const data = { id, chatId };

    mutation.mutate(data, {
      onSuccess(d) {
        const updatedMsgs = userLoging.messages.filter((m) => m.id != id);
        dispatch(
          userActions.setProfile({ ...userLoging, messages: updatedMsgs })
        );
        navigate("/chat/" + chatId);
      },
      onError(e) {
        console.log("error", e);
      },
    });
  }

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding sx={{ px: 2, py: 1 }}>
        {msgList.map((msg) => {
          return (
            <ListItem key={msg.id} divider disablePadding>
              <ListItemButton onClick={() => clickHandler(msg.id, msg.chatId)}>
                <ListItemIcon>
                  {msg.profileImg ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={SERVER_URL + msg.profileImg}
                    />
                  ) : (
                    <Avatar>{msg.username[0]}</Avatar>
                  )}
                </ListItemIcon>
                <ListItemText>{msg.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
