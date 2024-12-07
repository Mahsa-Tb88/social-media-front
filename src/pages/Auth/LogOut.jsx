import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLogOut } from "../../utils/mutation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";

export default function LogOut() {
  const { mutate } = useLogOut();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess() {
          dispatch(userActions.setLogout());
          navigate("/login");
        },
      }
    );
  }, []);
  return (
    <Stack>
      <CircularProgress size={60} color="secondary" />
      <Typography variant="h5" mt={3}>
        Signing out....
      </Typography>
    </Stack>
  );
}
