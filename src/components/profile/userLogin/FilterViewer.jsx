/* eslint-disable react/prop-types */
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
import React from "react";
import MyIconButton from "../../../components/Customized/MyIconButton";
import { Close, Public } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import {
  useFilterEducationViewer,
  useFilterInfosViewer,
  useFilterOverviewsViewer,
  useFilterWorkViewer,
  useFilterRelViewer,
  useFilterFamilyViewer,
  useFilterPlaceViewer,
  useEditPost,
} from "../../../utils/mutation";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function FilterViewer({
  open,
  onClose,
  setViewer,
  viewer,
  subject,
  title,
  itemId,
  userId,
}) {
  let id = useParams().id;
  const location = useLocation();
  if (location.pathname.includes("post")) {
    id = userId;
  }

  const mutationOverviewViewer = useFilterOverviewsViewer();
  const mutationInfosViewer = useFilterInfosViewer();
  const mutationWorkViewer = useFilterWorkViewer();
  const mutationEducationViewer = useFilterEducationViewer();
  const mutationRelViewer = useFilterRelViewer();
  const mutationFamilyViewer = useFilterFamilyViewer();
  const mutationPlaceViewer = useFilterPlaceViewer();
  const mutationPostViewer = useEditPost();
  const queryClient = useQueryClient();

  function saveHandler(e) {
    const data = { subject, viewer: e.target.value, id };
    
    if (title == "overview") {
      mutationOverviewViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["overview"] });
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "contactBaseInfo") {
      mutationInfosViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["contactBaseInfo"] });
        },
        onError(e) {
          console.log("error filter viewer", e);
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "Work") {
      const data = { viewer: e.target.value, id, itemId };
      mutationWorkViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["work"] });
        },
        onError(e) {
          console.log("error filter viewer", e);
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "Education") {
      const data = { viewer: e.target.value, id, itemId };
      mutationEducationViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["education"] });
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "Family") {
      const data = { viewer: e.target.value, id, itemId };
      mutationFamilyViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["familyRel"] });
        },
        onError(e) {
          console.log("error filter viewer", e);
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "Relationship") {
      const data = { viewer: e.target.value, id };
      mutationRelViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["familyRel"] });
        },
        onError(e) {
          console.log("error filter viewer", e);
          toast.error(e.response.data.message);
        },
      });
    } else if (title == "post") {
      const data = { id: itemId, viewer: e.target.value, userId: id };
      mutationPostViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["singlePost", itemId] });
        },
        onError(e) {
          console.log("viewer post error is", e);
          toast.error(e.response.data.message);
        },
      });
    } else {
      const data = { itemId, id, title, viewer: e.target.value };
      mutationPlaceViewer.mutate(data, {
        onSuccess() {
          setViewer(e.target.value);
          queryClient.invalidateQueries({ queryKey: ["placeLived"] });
        },
        onError(e) {
          toast.error(e.response.data.message);
        },
      });
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
              <Typography>Anyone on or off Facebook</Typography>
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
