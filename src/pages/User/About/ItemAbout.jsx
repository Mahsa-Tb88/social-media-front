import { Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import FilterViewer from "../Profile/component/userLogin/FilterViewer";
import MenuItem from "./MenuItem";
import SetViewer from "./SetViewer";

export default function ItemAbout({
  children,
  myViewer,
  value,
  subject,
  id,
  title,
}) {
  const [openFilterViewer, setOpenFilterViewer] = useState(false);
  const [viewer, setViewer] = useState(myViewer);
  const [open, setOpen] = useState(false);
  const menuAnchor = useRef(null);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {<Stack>{children}</Stack>}
      <Stack>
        <SetViewer
          viewer={viewer}
          setOpenFilterViewer={setOpenFilterViewer}
          menuAnchor={menuAnchor}
          setOpen={setOpen}
        />

        <FilterViewer
          open={openFilterViewer}
          onClose={() => setOpenFilterViewer(false)}
          setViewer={setViewer}
          viewer={viewer}
          subject={subject}
          title={title}
          itemId={id}
        />
        <MenuItem
          open={open}
          handleClose={() => setOpen(false)}
          anchorEl={menuAnchor.current}
          subject={subject}
          value={value}
          title={title}
          id={id}
        />
      </Stack>
    </Stack>
  );
}
