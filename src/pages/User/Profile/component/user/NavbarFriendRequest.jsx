import { Divider, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmFriend } from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";

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
        console.log("success");
        const updatedListFriends = [
          ...userLogin?.friends?.listFriend,
          {
            id: user._id,
            profileImg: user.profileImg,
            username: user.username,
          },
        ];
        dispatch( 
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin?.friends, listFriend: updatedListFriends },
          })
        );
      },
      onError(e) {
        console.log("error is ", e);
      },
    });
  }

  function deleteHandler() {}

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
