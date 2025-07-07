import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";

// eslint-disable-next-line react/prop-types
export default function AddSubjectEducation({ isOwner, length }) {
  const [openAddEducation, setOpenAddEducation] = useState(false);

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      {length && !isOwner ? (
        ""
      ) : (
        <Box>
          <ShowIcon subject="Education" />
        </Box>
      )}
      {isOwner ? (
        <Stack>
          <Button
            variant="text"
            sx={{ fontSize: 18 }}
            onClick={() => setOpenAddEducation(true)}
          >
            Add Education
          </Button>
          <Box></Box>
          <EditValueSubject
            subject={"Education"}
            openEdit={openAddEducation}
            onCloseEdit={() => setOpenAddEducation(false)}
            type="new"
          />
        </Stack>
      ) : !length ? (
        "Nothing is added yet!"
      ) : (
        ""
      )}
    </Stack>
  );
}
