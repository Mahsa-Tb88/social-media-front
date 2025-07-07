import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";

// eslint-disable-next-line react/prop-types
export default function AddHometown({ isOwner }) {
  const [openAddHometown, setOpenAddHometown] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box>
        <ShowIcon subject="Hometown" />
      </Box>
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddHometown(true)}
          >
            Add Hometown
          </Button>
          <EditValueSubject
            openEdit={openAddHometown}
            onCloseEdit={() => setOpenAddHometown(false)}
            value=""
            subject="Hometown"
            type="new"
            title="hometown"
          />
        </Stack>
      ) : (
        <Typography sx={{ ml: 1 }}>Hometown is not added yet!</Typography>
      )}
    </Stack>
  );
}
