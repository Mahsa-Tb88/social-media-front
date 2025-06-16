import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditUser } from "../../../utils/mutation";
import { userActions } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const checkedDeleteAccount = watch("deleteAccount");

  function onSubmit(data) {
    data.id = user.id;
    mutate(data, {
      onSuccess() {
        function goToLogin() {
          dispatch(userActions.setLogout());
          navigate("/login");
        }
        setTimeout(() => goToLogin(), 2000);
      },
      onError(e) {
        console.log("error", e);
        toast.error(e.response.data.message);
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
            <Alert severity="info">Edit information</Alert>
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
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Checkbox {...register("deleteAccount")} color="error" />
              }
              label={
                <Typography color="error" fontWeight="bold">
                  Delete Account
                </Typography>
              }
            />
            <Stack>
              {checkedDeleteAccount && (
                <FormControl fullWidth error={!!errors.deleteReason}>
                  <InputLabel id="delete-reason-label">Reason</InputLabel>
                  <Select
                    labelId="delete-reason-label"
                    label="Reason"
                    defaultValue=""
                    {...register("deleteReason", {
                      required:
                        "Please select a reason for deleting your account",
                    })}
                  >
                    <MenuItem value="privacy">Privacy concerns</MenuItem>
                    <MenuItem value="not_useful">Not useful</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.deleteReason && (
                    <Typography color="error" fontSize={12} sx={{ mt: 1 }}>
                      {errors.deleteReason.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            </Stack>
          </Stack>

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
