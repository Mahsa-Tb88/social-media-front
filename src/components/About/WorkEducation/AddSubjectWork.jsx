import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import EditValueSubject from "../EditVelueSubject";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

// eslint-disable-next-line react/prop-types
export default function AddSubjectWork({ isOwner, length }) {
  const [openAddWork, setOpenAddWork] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      {length && !isOwner ? (
        ""
      ) : (
        <Box>
          <HomeRepairServiceIcon />
        </Box>
      )}
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddWork(true)}
          >
            Add Work
          </Button>
          <Box></Box>
        </Stack>
      ) : !length ? (
        "Nothing is added yet!"
      ) : (
        ""
      )}
      <EditValueSubject
        subject={"Work"}
        openEdit={openAddWork}
        onCloseEdit={() => setOpenAddWork(false)}
        type="new"
      />
    </Stack>
  );
}
