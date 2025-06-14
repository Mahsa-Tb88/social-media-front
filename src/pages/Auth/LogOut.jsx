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
    mutate({
      onSuccess() {
        dispatch(userActions.setLogout());
        navigate("/login");
      },
    });
  }, []);

  
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
        flexDirection: "row",
      }}
    >
      <CircularProgress size={25} color="info" />
      <Typography variant="h5" sx={{ pl: 2 }}>
        Signing out...
      </Typography>
    </Stack>
  );
}
