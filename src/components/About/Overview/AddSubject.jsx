import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../Edit/EditVelueSubject";

export default function AddSubject({ subject, isOwner }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Box>
        <ShowIcon subject={subject} />
      </Box>
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddSubject(true)}
          >
            Add {subject}
          </Button>
          <Box></Box>
          <EditValueSubject
            openEdit={openAddSubject}
            onCloseEdit={() => setOpenAddSubject(false)}
            subject={subject}
            type="new"
            title="overview"
          />
        </Stack>
      ) : (
        "It is not added yet!"
      )}
    </Stack>
  );
}
