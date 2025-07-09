import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../Edit/EditVelueSubject";

// eslint-disable-next-line react/prop-types
export default function AddSubRel({ isOwner }) {
  const [openAddRel, setOpenAddRel] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <ShowIcon subject="Status" />
      </Box>
      {isOwner ? (
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddRel(true)}
        >
          Add Relationship
        </Button>
      ) : (
        "It is not added yet!"
      )}
      <Box></Box>
      <EditValueSubject
        openEdit={openAddRel}
        onCloseEdit={() => setOpenAddRel(false)}
        value=""
        subject="Relationship"
        type="new"
        title="Relationship"
      />
    </Stack>
  );
}
