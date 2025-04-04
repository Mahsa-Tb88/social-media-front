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

export default function EditUser() {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { isPending, error, data, mutate } = useEditUser();

  function onSubmit(data) {
    data.id = user.id;
    console.log(data);

    mutate(data, {
      onSuccess(d) {
        dispatch(
          userActions.setProfile({
            ...user,
            email: data.email,
            password: data.password,
            viewer: data.viewer,
          })
        );
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
            disabled
            label="Username"
            variant="standard"
            defaultValue={user.username}
          />

          <FormControl fullWidth>
            <InputLabel id="viewer">viewer</InputLabel>
            <Select
              labelId="viewer"
              label="Viewer"
              defaultValue={user.viewer || "private"}
              {...register("viewer")}
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="public">Public</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Email"
            variant="standard"
            defaultValue={user.email}
            {...register("email", {
              required: "Please enter an email",
              minLength: {
                value: 5,
                message: "Email should be at least 5 characters.",
              },
            })}
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
            Register
          </LoadingButton>
        </Stack>
      </Paper>
    </Container>
  );
}
