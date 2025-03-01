import { Divider, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveFriend } from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";

export default function NavbarHandleFriend({
  open,
  anchorEl,
  handleClose,
  user,
}) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.profile);
  const removeFriendMutation = useRemoveFriend();

  function blockFriend() {}
  function removeFriend() {
    const data = {
      userId: userLogin.id,
      id: user._id,
    };
    removeFriendMutation.mutate(data, {
      onSuccess(d) {
        const updatedListFriends = userLogin?.friends?.listFriend.filter(
          (f) => f.id != user._id
        );
        dispatch(
          userActions.setProfile({
            ...userLogin,
            friends: { ...userLogin.friends, listFriend: updatedListFriends },
          })
        );
      },
      onError(e) {
        console.log("eeror is", e);
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
        onClick={removeFriend}
      >
        Remove Friend
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{
          width: "150px",
          textAlign: "center",
          fontSize: 18,
        }}
        onClick={blockFriend}
      >
        Block Friend
      </MenuItem>
    </Menu>
  );
}
