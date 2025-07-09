import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../Edit/EditVelueSubject";

export default function AddSubFamily() {
  const [openAddFamily, setOpenAddFamily] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Box>
          <ShowIcon subject="Family" />
        </Box>
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddFamily(true)}
        >
          Add Family
        </Button>
        <Box></Box>
        <EditValueSubject
          openEdit={openAddFamily}
          onCloseEdit={() => setOpenAddFamily(false)}
          value=""
          subject="Family"
          type="new"
          title="Family"
        />
      </Stack>
    </Stack>
  );
}
