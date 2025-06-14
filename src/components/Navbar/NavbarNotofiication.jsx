/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/slices/userSlice";
import { useUpdateSeenNotifi } from "../../utils/mutation";
import { toast } from "react-toastify";

export default function NavbarNotofiication({ open, anchorEl, handleClose }) {
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
        navigate("/post/" + postId);
      },
      onError(e) {
        console.log("error", e);
        toast.error(e.response.data.message);
      },
    });
  }

  // function getDate(dateString) {
  //   const myDate = new Date(dateString);
  //   const options = { day: "2-digit", month: "short", year: "numeric" };
  //   const formattedDate = myDate.toLocaleDateString("en-GB", options);
  //   return formattedDate;
  // }
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
      <List disablePadding sx={{ maxHeight: "500px", overflow: "auto" }}>
        {notifiList.map((n, index) => {
          return (
            <ListItem
              key={index}
              divider
              disablePadding
              onClick={() => {
                notificationHandler(n._id, n.postId);
                handleClose();
              }}
            >
              <ListItemButton>
                <ListItemText>
                  <Stack
                    sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                  >
                    <Box
                      component={"img"}
                      src={
                        n.userId.profileImg
                          ? SERVER_URL + n.userId.profileImg
                          : noImage
                      }
                      sx={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography>
                      {n.userId.username[0].toUpperCase() +
                        n.userId.username.slice(1)}
                      {n.type == "comment"
                        ? " left a message on the post"
                        : n.type == "post"
                          ? " like the post"
                          : " liked the comment"}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      ml: 1,
                      background: !n.isSeen ? "#0288d1" : "#eeeeee",
                      py: "3px",
                      px: "5px",
                      mt: 1,
                      borderRadius: "7px",
                      width: "100px",
                      fontSize: "12px",
                      color: !n.isSeen ? "#fff" : "grey",
                    }}
                  >
                    {n?.text
                      ? n.text.slice(0, 10) + " ..."
                      : n?.desc
                        ? n.desc.slice(0, 10) + " ..."
                        : "See post ..."}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", mt: "5px", ml: 1 }}>
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
