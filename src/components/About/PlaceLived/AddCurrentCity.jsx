import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";

export default function AddCurrentCity({ isOwner }) {
  const [openAddCurrentCity, setOpenAddCurrentCity] = useState(false);
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
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
            onClick={() => setOpenAddCurrentCity(true)}
          >
            Add current city
          </Button>

          <EditValueSubject
            openEdit={openAddCurrentCity}
            onCloseEdit={() => setOpenAddCurrentCity(false)}
            value=""
            subject="Current city"
            type="new"
            title="currentCity"
          />
        </Stack>
      ) : (
        <Typography sx={{ ml: 1 }}>Current city is not added yet!</Typography>
      )}
    </Stack>
  );
}
