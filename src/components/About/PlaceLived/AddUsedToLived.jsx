import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";

export default function AddUsedToLived({ isOwner }) {
  const [openAddPlace, setOpenAddPlace] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <ShowIcon subject="Location" />
      </Box>
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddPlace(true)}
          >
            Add used to live
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddPlace}
            onCloseEdit={() => setOpenAddPlace(false)}
            value=""
            subject="used to live"
            type="new"
            title="usedToLiveCity"
          />
        </Stack>
      ) : (
        <Typography> Used to live is not added yet!</Typography>
      )}
    </Stack>
  );
}
