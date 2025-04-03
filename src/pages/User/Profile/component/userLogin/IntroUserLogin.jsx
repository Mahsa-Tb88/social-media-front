import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowIcon from "../../../About/ShowIcon";
import EditIntro from "./EditIntro";
import EditValueSubject from "../../../About/EditVelueSubject";
import { Button, Stack, Typography } from "@mui/material";

export default function IntroUserLogin({ overview }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const [openEditIntro, setOpenEditIntro] = useState(false);
  const theme = useSelector((state) => state.app.theme);
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];

  return (
    <Stack>
      <Stack>
        {overview && overview?.Intro?.value ? (
          <Stack>
            <Typography sx={{ fontWeight: "bold" }}>
              {overview.Intro.value}
            </Typography>
            <Button
              disableElevation
              sx={{
                bgcolor: theme == "light" ? "grey.200" : "grey.800",
                color: theme == "light" ? "grey.800" : "grey.200",
                mb: 3,
                mt: 2,
                fontSize: 15,
                fontWeight: "bold",
              }}
              onClick={() => setOpenAddSubject(true)}
            >
              Edit bio
            </Button>
          </Stack>
        ) : (
          <Button
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => setOpenAddSubject(true)}
          >
            Add Intro
          </Button>
        )}
        <EditValueSubject
          openEdit={openAddSubject}
          onCloseEdit={() => setOpenAddSubject(false)}
          subject={"Intro"}
          value={overview && overview.Intro ? overview.Intro : ""}
          type={overview && overview.Intro ? "edit" : "new"}
          title="overview"
        />
      </Stack>
      {intro.map((item) => {
        return (
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}
            key={item}
          >
            <Item item={item} overview={overview} theme={theme} />
          </Stack>
        );
      })}
      {overview &&
      (overview.Pronounce?.value ||
        overview.School?.value ||
        overview.Location?.value ||
        overview.Hometown?.value ||
        overview.Status?.value) ? (
        <Button
          disableElevation
          sx={{
            bgcolor: theme == "light" ? "grey.200" : "grey.800",
            color: theme == "light" ? "grey.800" : "grey.200",
            mt: 2,
            fontSize: 15,
            fontWeight: "bold",
          }}
          onClick={() => setOpenEditIntro(true)}
        >
          Edit details
        </Button>
      ) : (
        ""
      )}
      <EditIntro
        open={openEditIntro}
        handleClose={() => setOpenEditIntro(false)}
        overview={overview}
      />
    </Stack>
  );
}

function Item({ item, overview }) {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
      <ShowIcon
        subject={item}
        item={overview && overview[item]?.value ? overview[item].value : ""}
      />
      {overview && overview[item]?.value ? (
        <Typography sx={{ ml: 2 }}>{overview[item].value}</Typography>
      ) : (
        <Button
          variant="text"
          sx={{ ml: 1 }}
          onClick={() => setOpenAddSubject(true)}
        >
          Add {item}
        </Button>
      )}
      <EditValueSubject
        openEdit={openAddSubject}
        onCloseEdit={() => setOpenAddSubject(false)}
        subject={item}
        type="new"
        title="overview"
      />
    </Stack>
  );
}
