/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Stack,
  TextField,
  Typography,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close } from "@mui/icons-material";
import { useEditIntro } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function EditIntro({ overview, open, handleClose }) {
  const [pronounce, setPronounce] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [hometown, setHometown] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setPronounce(
      overview?.Pronounce?.value ? overview.Pronounce.value : "new value"
    );
    setSchool(overview?.School?.value ? overview.School.value : "new value");
    setLocation(
      overview?.Location?.value ? overview.Location.value : "new value"
    );
    setHometown(
      overview?.Hometown?.value ? overview.Hometown.value : "new value"
    );
    setStatus(overview?.Status?.value ? overview.Status.value : "new value");
  }, [overview]);

  const introMutation = useEditIntro();
  const querryClient = useQueryClient();
  function saveHandler() {
    const data = {
      id: overview.userId,
      Pronounce:
        pronounce != "new value"
          ? {
              value: pronounce,
              viewer: overview?.Pronounce?.viewer || "friends",
            }
          : {},

      School:
        school != "new value"
          ? { value: school, viewer: overview?.School?.viewer || "friends" }
          : {},
      Location:
        location != "new value"
          ? { value: location, viewer: overview?.Location?.viewer || "friends" }
          : {},
      Hometown:
        hometown != "new value"
          ? { value: hometown, viewer: overview?.Hometown?.viewer || "friends" }
          : {},
      Status:
        status != "new value"
          ? { value: status, viewer: overview?.Status?.viewer || "friends" }
          : {},
    };
    introMutation.mutate(data, {
      onSuccess() {
        querryClient.invalidateQueries({ queryKey: ["overview"] });
        handleClose();
      },
      onError(e) {
        toast.error(e.response.data.message);
      },
    });
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Edit Into Section
        </Typography>
        <MyIconButton onClick={handleClose}>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
                Pronounce
              </Typography>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => setPronounce("new value")}
              >
                Remove Pronounce
              </Button>
            </Stack>
            <TextField
              size="small"
              label="value"
              value={pronounce}
              onChange={(e) => setPronounce(e.target.value)}
            />
          </Stack>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
                School
              </Typography>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => setSchool("new value")}
              >
                Remove School
              </Button>
            </Stack>
            <TextField
              size="small"
              label="value"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Stack>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
                Location
              </Typography>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => setLocation("new value")}
              >
                Remove Location
              </Button>
            </Stack>

            <TextField
              size="small"
              label="value"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Stack>
          <Stack>
            <Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
                  Hometown
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => setHometown("new value")}
                >
                  Remove Status
                </Button>
              </Stack>
            </Stack>
            <TextField
              size="small"
              label="value"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
            />
          </Stack>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
                Status
              </Typography>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={() => setStatus("new value")}
              >
                Remove Status
              </Button>
            </Stack>
            <TextField
              size="small"
              label="value"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Stack>

          <Button type="submit" size="large" onClick={saveHandler}>
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
