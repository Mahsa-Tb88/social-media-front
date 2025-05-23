import { LoadingButton } from "@mui/lab";
import {
  Alert,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEditUser } from "../../../../../utils/mutation";
import { userActions } from "../../../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { isPending, error, data, mutate } = useEditUser();

  function onSubmit(data) {
    data.id = user.id;

    mutate(data, {
      onSuccess(d) {
        function goToLogin() {
          dispatch(userActions.setLogout());
          navigate("/login");
        }
        setTimeout(() => goToLogin(), 2000);
      },
      onError(error) {
        console.log("error", error);
      },
    });
  }
  return (
    <Container fixed maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ px: 4, py: 2 }}>
        <Stack sx={{ my: 2 }}>
          {data ? (
            <Alert severity="success">{data.data.message}</Alert>
          ) : error ? (
            <Alert severity="error">{error.message}</Alert>
          ) : (
            <Alert severity="info">Edit your information</Alert>
          )}
        </Stack>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex" }}
          spacing={4}
        >
          <TextField
            label="Username"
            variant="standard"
            defaultValue={user.username}
            {...register("username", {
              required: "Please enter a username",
              minLength: {
                value: 6,
                message: "username should be at least 6 characters.",
              },
              maxLength: {
                value: 13,
                message: "username should be at least 13 characters.",
              },
            })}
          />

          <FormControl fullWidth>
            <InputLabel id="viewerProfile">viewer</InputLabel>
            <Select
              labelId="viewerProfile"
              label="Viewer"
              defaultValue={user.viewer || "private"}
              {...register("viewerProfile")}
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </FormControl>

          <TextField
            disabled
            label="Email"
            variant="standard"
            defaultValue={user.email}
            error={errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 3,
                message: "Password should be at least 3 characters.",
              },
            })}
            label="Password"
            error={errors.password}
            helperText={errors.password?.message}
            variant="standard"
            required
            type="password"
          />
          <TextField
            {...register("confirmedPassword", {
              required: "Please enter a confirmedPassword",
              validate(value) {
                if (watch("password") !== value) {
                  return "Confirm password is not as same as password!";
                }
              },
            })}
            label="Confirm Password"
            error={errors.confirmedPassword}
            helperText={errors.confirmedPassword?.message}
            variant="standard"
            required
            type="password"
          />
          <LoadingButton
            loading={isPending}
            loadingIndicator={
              <CircularProgress size={30} sx={{ color: "info.500" }} />
            }
            type="submit"
            size="large"
            variant="contained"
            sx={{ alignSelf: "center", width: 120, fontSize: 18 }}
          >
            Update
          </LoadingButton>
        </Stack>
      </Paper>
    </Container>
  );
}
