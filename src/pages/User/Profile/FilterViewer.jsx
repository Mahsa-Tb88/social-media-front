import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Stack,
  Box,
  Radio,
} from "@mui/material";
import React, { useEffect } from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close, Public } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import LockIcon from "@mui/icons-material/Lock";
import {
  useFilterInfosViewer,
  useFilterOverviewsViewer,
} from "../../../utils/mutation";
import { useParams } from "react-router-dom";

export default function FilterViewer({
  open,
  onClose,
  setViewer,
  viewer,
  subject,
  title,
}) {
  console.log("subjecttt", subject);
  const id = useParams().id;
  console.log("iddd", id);

  const mutationOverviewViewer = useFilterOverviewsViewer();
  const mutationInfosViewer = useFilterInfosViewer();
  const

  function saveHandler(e) {
    console.log("hooo------------------------------------------");
    const data = { subject, viewer: e.target.value, id };
    if (title == "overview") {
      mutationOverviewViewer.mutate(data, {
        onSuccess(d) {
          setViewer(e.target.value);
        },
        onError(e) {
          console.log("error filter viewer", e);
        },
      });
    } else if (title == "contactBaseInfo") {
      mutationInfosViewer.mutate(data, {
        onSuccess(d) {
          setViewer(e.target.value);
        },
        onError(e) {
          console.log("error filter viewer", e);
        },
      });
    } else if (title == "Work") {
      mutationInfosViewer.mutate(data, {
        onSuccess(d) {
          setViewer(e.target.value);
        },
        onError(e) {
          console.log("error filter viewer", e);
        },
      });
    } else if (title == "education") {
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box></Box>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Select audience
        </Typography>
        <MyIconButton onClick={onClose}>
          <Close />
        </MyIconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ fontSize: 18 }}>Who can see?</Typography>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <Public />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Public</Typography>
              <Typography>Anyone on or of Facebook</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="public"
              onChange={(e) => saveHandler(e)}
              checked={viewer == "public"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <PeopleIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Friends</Typography>
              <Typography>Your friends on Facebook</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="friends"
              onChange={(e) => saveHandler(e)}
              checked={viewer == "friends"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <GroupRemoveIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                Friends Except...
              </Typography>
              <Typography>Do not show to some friends</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="except"
              onChange={(e) => saveHandler(e)}
              checked={viewer == "except"}
            />
          </Box>
        </Stack>
        <Stack
          sx={{
            mt: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MyIconButton>
              <LockIcon />
            </MyIconButton>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Only Me</Typography>
              <Typography>It is private</Typography>
            </Box>
          </Box>
          <Box>
            <Radio
              value="private"
              onChange={(e) => saveHandler(e)}
              checked={viewer == "private"}
            />
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
