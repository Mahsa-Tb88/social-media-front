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

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
  const userLogin = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const notifiList = userLogin.notificationList || [];
  const navigate = useNavigate();
  function notificationHandler(id) {
    const updatedNotifiList = notifiList.filter((n) => n.postId != id);
    dispatch(
      userActions.setProfile({
        ...userLogin,
        notificationList: updatedNotifiList,
      })
    );
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
              onClick={() => notificationHandler(n.postId)}
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
                  `{n.username}
                  {n.type == "comment"
                    ? "Left a message on your post"
                    : "liked your post"}
                  `
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Menu>
  );
}
