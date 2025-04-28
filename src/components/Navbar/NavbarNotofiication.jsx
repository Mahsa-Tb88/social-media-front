import { NotificationAdd } from "@mui/icons-material";
import {
  Box,
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
import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/slices/userSlice";
import { useUpdateSeenNotifi } from "../../utils/mutation";

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
  const theme = useSelector((state) => state.app.theme);
  const userLogin = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  let notifiList = [];
  if (userLogin.notificationList) {
    notifiList = userLogin.notificationList;
  }
  const navigate = useNavigate();
  const notifiMutation = useUpdateSeenNotifi();
  function notificationHandler(id, postId) {
    const updatedNotifiList = notifiList.map((n) => {
      if (n._id == id) {
        return { ...n, isSeen: true };
      } else {
        return n;
      }
    });

    const data = { id, userId: userLogin.id };
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

    navigate("/post/" + postId);
  }

  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  function timeAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now - createdDate;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffDays < 1) {
      return "Today";
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffDays < 30) {
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    } else {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    }
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
              onClick={() => notificationHandler(n._id, n.postId)}
            >
              <ListItemButton
                sx={{ background: n.isSeen ? "transparent" : "#bbdefb" }}
              >
                <ListItemIcon>
                  <Box
                    component={"img"}
                    src={n.profileImg ? SERVER_URL + n.profileImg : noImage}
                    sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography>
                    {n.username}
                    {n.type == "comment"
                      ? " left a message on your post"
                      : " liked your post"}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", mt: "5px" }}>
                    {timeAgo(n.createdAt)}
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
