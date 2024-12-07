import { AccountCircle, StayPrimaryLandscape } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid2,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../../utils/mutation";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { isPending, data, error, mutate } = useRegister();

  function onSubmit(data) {
    mutate(data, {
      onSuccess() {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
    });
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
            Join Us
          </Typography>
          <Paper
            component="form"
            sx={{ p: { xs: 2, sm: 3 }, mb: 10 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={3}>
              {data ? (
                <Alert severity="success">{data.data.message}</Alert>
              ) : error ? (
                <Alert severity="error">{error.message}</Alert>
              ) : (
                <Alert severity="info">Please fill out all fileds!</Alert>
              )}
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
              />
              <TextField
                {...register("email", {
                  required: "Please enter a email",
                  minLength: {
                    value: 3,
                    message: "email should be at least 3 characters.",
                  },
                })}
                label="Email"
                error={errors.Email}
                helperText={errors.email?.message}
                variant="standard"
                required
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

              <FormControlLabel
                control={<Checkbox {...register("policy")} />}
                label="I accept the Terms of Use & Privacy Policy"
                required
                sx={{ userSelect: "none", mt: 20 }}
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
        </Grid2>
      </Grid2>
    </Container>
  );
}
