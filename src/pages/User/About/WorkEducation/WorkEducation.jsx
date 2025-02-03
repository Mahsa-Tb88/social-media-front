import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SchoolIcon from "@mui/icons-material/School";
import EditValueSubject from "../EditVelueSubject";
import ShowIcon from "../ShowIcon";
import { useParams } from "react-router-dom";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";
import { useGetWork, useGetEducation } from "../../../../utils/queries";

export default function WorkEducation() {
  return (
    <Stack spacing={4}>
      <WorkSection />
      <EducationSection />
    </Stack>
  );
}

function WorkSection() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetWork(id);
  // console.log("data work", data?.data.body);
  const work = data?.data.body || [];

  const [openAddWork, setOpenAddWork] = useState(false);

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Work
          </Typography>
          {work.map((w) => (
            <Stack key={w.id} sx={{mb:2}}>
              <ItemAbout
                myViewer={w.viewer}
                value={w}
                subject={"work"}
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
                          <Box>{w.startYear}</Box>
                          <Typography sx={{ mx: 1 }}>-</Typography>
                          {w.endYear ? (
                            <Box>{w.endYear}</Box>
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
          />
        </Stack>
      )}
    </Stack>
  );
}

function EducationSection() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetEducation(id);
  console.log("data education", data?.data.body);
  const myData2 = data?.data.body || [];
  const [openAddEducation, setOpenAddEducation] = useState(false);

  const education = [
    // {
    //   degree: "",
    //   field: "",
    //   university: "",
    //   startYear: "",
    //   endYear: "",
    //   isCurrently: false,
    //   viewer: "private",
    // },
  ];

  return (
    <Stack>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Education
      </Typography>
      {education.map((e) => (
        <Stack key={e.id}>
          <ItemAbout
            myViewer={e.viewer}
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
                      <Box>{e.startYear}</Box>
                      <Typography sx={{ mx: 1 }}>-</Typography>
                      {e.endYear ? (
                        <Box>{e.endYear}</Box>
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
      />
    </Stack>
  );
}
