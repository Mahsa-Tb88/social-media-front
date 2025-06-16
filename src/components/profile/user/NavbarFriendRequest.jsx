/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useConfirmFriend,
  useRemoveRequestFriend,
} from "../../../utils/mutation";
import { userActions } from "../../../store/slices/userSlice";
import { toast } from "react-toastify";

export default function NavbarFriendRequest({
  open,
  anchorEl,
  handleClose,
  user,
}) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.profile);

  const confirmMutation = useConfirmFriend();
  function confirmHandler() {
    const data = {
      id: user._id,
      profileImg: user.profileImg,
      username: user.username,
      userId: userLogin.id,
    };
    confirmMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = [
          ...userLogin?.friends.listFriend,
          {
            id: user._id,
            profileImg: user.profileImg,
            username: user.username,
          },
        ];
        const updateRequestList = userLogin.friends.friendRequestList.filter(
          (f) => f.id != user._id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: {
              ...userLogin?.friends,
              listFriend: updatedListFriends,
              friendRequestList: updateRequestList,
            },
          })
        );
      },
      onError(e) {
        console.log("error is ", e);
        toast.error(e.response.data.message);
      },
    });
  }

  const removeRequestMutation = useRemoveRequestFriend();
  function deleteHandler() {
    const data = {
      userId: user._id,
      id: userLogin.id,
    };
    removeRequestMutation.mutate(data, {
      onSuccess(d) {
        const updatedFriendRequestList =
          userLogin?.friends?.friendRequestList.filter((f) => f.id != user._id);
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: {
              ...userLogin.friends,
              friendRequestList: updatedFriendRequestList,
            },
          })
        );
      },
      onError(e) {
        console.log("eeror is", e);
        toast.error(e.response.data.message);
      },
    });
  }

  return (
    <Menu open={open} anchorEl={anchorEl} onClick={handleClose}>
      <MenuItem
        sx={{
          width: "150px",
          textAlign: "center",
          fontSize: 18,
        }}
        onClick={confirmHandler}
      >
        Confirm
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{
          width: "150px",
          textAlign: "center",
          fontSize: 18,
        }}
        onClick={deleteHandler}
      >
        Delete
      </MenuItem>
    </Menu>
  );
}
