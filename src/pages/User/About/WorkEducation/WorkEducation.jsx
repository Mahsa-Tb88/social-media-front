import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SchoolIcon from "@mui/icons-material/School";
import EditValueSubject from "../EditVelueSubject";
import ShowIcon from "../ShowIcon";

export default function WorkEducation() {
  const myEducation = [
    {
      position: "Bachlor",
      company: "Physics",
      city: "university of Isfahan",
      from: 2300,
      to: 2500,
      viewer: "public",
      id: 1,
    },
    {
      position: "Master",
      company: "Physics",
      city: "Babol Noshirvani",
      from: 2300,
      to: 2500,
      viewer: "public",
      id: 2,
    },
  ];

  const myWork = [
    {
      position: "Web Developer",
      company: "Orain",
      city: "Chilliwack",
      from: 2020,
      to: "",
      viewer: "public",
      id: 3,
    },
    {
      position: "Frontend Developer",
      company: "Andishe",
      city: "Tabriz",
      from: 2014,
      to: 2020,
      viewer: "public",
      id: 4,
    },
  ];

  return (
    <Stack spacing={4}>
      <WorkSection myWork={myWork} />
      <EducationSection myEducation={myEducation} />
    </Stack>
  );
}

function WorkSection({ myWork }) {
  const [work, setWork] = useState(myWork);
  const [openAddWork, setOpenAddWork] = useState(false);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Work
      </Typography>
      {work.map((w) => (
        <Stack key={w.id}>
          <ItemAbout
            myViewer={w.viewer}
            list={work}
            setList={setWork}
            value={w}
            subject={"Work"}
            id={w.id}
            type="edit"
          >
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <Box sx={{ mr: 1 }}>
                <HomeRepairServiceIcon />
              </Box>
              <Stack sx={{ mb: 1 }}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Typography>{w.position}</Typography>
                  <Typography sx={{ mx: 1 }}>{" at "}</Typography>
                  <Typography>{w.company}</Typography>
                </Stack>
                <Stack>
                  <Stack sx={{ flexDirection: "row" }}>
                    <Box>{w.city}</Box>
                    <Typography sx={{ mx: 1 }}>{"|"}</Typography>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box>{w.from}</Box>
                      <Typography sx={{ mx: 1 }}>-</Typography>
                      {w.to ? (
                        <Box>{w.to}</Box>
                      ) : (
                        <Typography>Currently</Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Box>
          <HomeRepairServiceIcon />
        </Box>
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddWork(true)}
        >
          Add Work
        </Button>
        <Box></Box>
      </Stack>
      <EditValueSubject
        subject={"Work"}
        openEdit={openAddWork}
        onCloseEdit={() => setOpenAddWork(false)}
        type="new"
        setList={setWork}
        list={work}
      />
    </Stack>
  );
}

function EducationSection({ myEducation }) {
  const [education, setEducation] = useState(myEducation);
  const [openAddEducation, setOpenAddEducation] = useState(false);

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Education
      </Typography>
      {education.map((e) => (
        <Stack key={e.id}>
          <ItemAbout
            myViewer={e.viewer}
            list={education}
            setList={setEducation}
            value={e}
            subject={"Education"}
            id={e.id}
          >
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <Box sx={{ mr: 1 }}>
                <ShowIcon subject={"education"} />
              </Box>
              <Stack sx={{ mb: 1 }}>
                <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                  <Typography>{e.position}</Typography>
                  <Typography sx={{ mx: 1 }}>{" at "}</Typography>
                  <Typography>{e.company}</Typography>
                </Stack>
                <Stack>
                  <Stack sx={{ flexDirection: "row" }}>
                    <Box>{e.city}</Box>
                    <Typography sx={{ mx: 1 }}>{"|"}</Typography>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box>{e.from}</Box>
                      <Typography sx={{ mx: 1 }}>-</Typography>
                      {e.to ? (
                        <Box>{e.to}</Box>
                      ) : (
                        <Typography>Currently</Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
      ))}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Box>
          <SchoolIcon />
        </Box>
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddEducation(true)}
        >
          Add Education
        </Button>
        <Box></Box>
      </Stack>
      <EditValueSubject
        subject={"Education"}
        openEdit={openAddEducation}
        onCloseEdit={() => setOpenAddEducation(false)}
        value=""
        setList={setEducation}
        list={education}
      />
    </Stack>
  );
}
