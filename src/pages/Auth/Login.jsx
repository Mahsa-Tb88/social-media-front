import { ErrorSharp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../../utils/mutation";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import { useRedurectIfIsLoggedIn } from "../../utils/customHooks";

export default function Login() {
  const { isPending, error, mutate } = useLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  function onSubmit(data) {
    mutate(data, {
      onSuccess(d) {
        const user = d.data.body.user;
        const friends = d.data.body.friends;
        const messages = d.data.body.messages;
        const notificationList = d.data.body.notificationList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        dispatch(userActions.setIsLoggedIn(true));
        dispatch(userActions.setIsAdmin(user.isAdmin));
        dispatch(
          userActions.setProfile({
            email: user.emailRegister,
            username: user.username[0].toUpperCase() + user.username.slice(1),
            id: user._id,
            profileImg: user.profileImg,
            backgroundImg: user.backgroundImg,
            bio: user.bio,
            viewer: user.viewerProfile,
            friends,
            messages,
            notificationList,
          })
        );
      },
      onError(error) {
        console.log(error);
      },
    });
  }
  const isLoggedIn = useRedurectIfIsLoggedIn();

  if (isLoggedIn) {
    return;
  }
  return (
    <Container fixed maxWidth="sm">
      <Grid2 container>
        <Grid2 size={12}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ mt: 6, mb: 3, color: "text.primary" }}
          >
            Login
          </Typography>
          <Paper
            component="form"
            sx={{ p: { xs: 2, sm: 3 }, mb: 10 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2}>
              {error ? (
                <Alert severity="error">{error.response.data.message}</Alert>
              ) : (
                <Alert severity="info">
                  Please Enter Username and Password!
                </Alert>
              )}

              <TextField
                {...register("username", {
                  required: "Please enter your username!",
                  minLength: {
                    value: 3,
                    message: "Username can be 3 characters at least!",
                  },
                  maxLength: {
                    value: 10,
                    message: "Username can be 10 charcters at most!",
                  },
                })}
                label="Username"
                error={ErrorSharp.username}
                helperText={errors.username?.message}
                variant="standard"
                required
              />
              <TextField
                {...register("password", {
                  required: "Please enter your password!",
                })}
                label="Password"
                error={ErrorSharp.password}
                helperText={errors.password?.message}
                variant="standard"
                required
                type="password"
              />
              <FormControlLabel
                control={<Checkbox {...register("remember")} defaultChecked />}
                label="Remember me"
                sx={{ userSelect: "none" }}
              />
              <Stack>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ mr: 0.5 }}>
                    Do not have an Account?
                  </Typography>
                  <Button variant="text" component={Link} to="/Register">
                    Sign Up
                  </Button>
                </Box>
              </Stack>

              <LoadingButton
                loading={isPending}
                loadingIndicator={
                  <CircularProgress size={30} sx={{ color: "info.500" }} />
                }
                type="submit"
                size="large"
                variant="contained"
                sx={{ width: 140, alignSelf: "center", fontSize: 18 }}
              >
                Login
              </LoadingButton>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
