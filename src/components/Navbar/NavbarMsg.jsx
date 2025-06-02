import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChangeToRead } from "../../utils/mutation";
import { userActions } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";

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
        const updatedMsgs = userLoging.messages.map((msg) => {
          if (msg.id == id) {
            return { ...msg, isRead: true };
          } else {
            return msg;
          }
        });
        dispatch(
          userActions.setProfile({ ...userLoging, messages: updatedMsgs })
        );
        navigate("/chat/" + chatId);
        handleClose();
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
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={!msg.isRead && <MailIcon color="error" />}
                  >
                    {msg.profileImg ? (
                      <Avatar
                        alt="Remy Sharp"
                        src={SERVER_URL + msg.profileImg}
                      />
                    ) : (
                      <Avatar>{msg.username[0].toUpperCase()}</Avatar>
                    )}
                  </Badge>
                </ListItemIcon>
                <ListItemText>
                  <Typography>
                    {msg.username[0].toUpperCase() + msg.username.slice(1)}{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      background: !msg.isRead ? "#0288d1" : "#eeeeee",
                      color: !msg.isRead ? "#fff" : "grey",
                      py: "3px",
                      px: "5px",
                      mt: 1,
                      borderRadius: "7px",
                      width: "100px",
                      fontSize: "12px",
                    }}
                  >
                    {msg.msg.slice(0, 20) + " ... "}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
