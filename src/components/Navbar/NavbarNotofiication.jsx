import { NotificationAdd } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/slices/userSlice";
import { useUpdateSeenNotifi } from "../../utils/mutation";

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  let notifiList = [];
  if (userLogin.notificationList) {
    notifiList = userLogin.notificationList;
  }
  const navigate = useNavigate();
  const notifiMutation = useUpdateSeenNotifi();
  function notificationHandler(id, date) {
    const updatedNotifiList = notifiList.map((n) => {
      if (n.postId == id) {
        return { ...n, isSeen: true };
      } else {
        return n;
      }
    });

    const data = { id: date, userId: userLogin.id };
    notifiMutation.mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...userLogin,
            notificationList: updatedNotifiList,
          })
        );
      },
      onError(e) {
        console.log("error", e);
      },
    });

    navigate("/post/" + id);
  }

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClick={handleClose}
      MenuListProps={{ sx: { p: 0 } }}
    >
      <List disablePadding>
        {notifiList.map((n, index) => {
          return (
            <ListItem
              key={index}
              divider
              disablePadding
              onClick={() => notificationHandler(n.postId, n.date)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Box
                    component={"img"}
                    src={n.profileImg ? SERVER_URL + n.profileImg : noImage}
                    sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  {n.username}
                  {n.type == "comment"
                    ? " Left a message on your post"
                    : "liked your post"}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
