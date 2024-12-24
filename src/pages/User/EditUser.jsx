import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEditUser } from "../../utils/mutation";

export default function EditUser() {
  const user = useSelector((state) => state.user.profile);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { isPending, error, data, mutate } = useEditUser();

  function onSubmit(data) {
    data.id = user._id;
    data.email = user.email;
    console.log(data);

    mutate(data, {
      onSuccess(d) {
        console.log("success...", d);
      },
      onError(error) {
        console.log("error", error);
      },
    });
  }
  return (
    <Container fixed maxWidth="sm" sx={{ mt: 10 }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex" }}
        maxWidth={400}
        spacing={4}
      >
        <TextField
          {...register("username", {
            required: "Please enter a username",
            minLength: {
              value: 3,
              message: "Username should be at least 3 characters.",
            },
          })}
          label="Username"
          error={errors.username}
          helperText={errors.username?.message}
          variant="standard"
          required
          defaultValue={user.username}
        />
        <TextField
          {...register("livesIn")}
          label="Lives in"
          variant="standard"
          defaultValue={user.livesIn}
        />
        <TextField
          {...register("work")}
          label="Work"
          variant="standard"
          defaultValue={user.work}
        />
        <TextField
          label="Email"
          variant="standard"
          disabled
          defaultValue={user.email}
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
    </Container>
  );
}
