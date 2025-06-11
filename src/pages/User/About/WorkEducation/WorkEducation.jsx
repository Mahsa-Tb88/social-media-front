import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import EditValueSubject from "../EditVelueSubject";
import ShowIcon from "../ShowIcon";
import { useParams } from "react-router-dom";
import LoadingError from "../../../../components/LoadingError";
import Loading from "../../../../components/Loading";
import { useGetWork, useGetEducation } from "../../../../utils/queries";
import { useSelector } from "react-redux";

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
  const work = data?.data.body[0] || [];
  const isFriend = data?.data.body[1] || false;
  const isOwner = data?.data.body[2] || false;

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError
          handleAction={refetch}
          message={error.response.data.message}
        />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Work
          </Typography>
          {work.length > 0 &&
            work.map((w) => (
              <Stack key={w._id} sx={{ mb: 2 }}>
                {isOwner ? (
                  <ItemAbout
                    myViewer={w.viewer}
                    value={w}
                    subject={"Work"}
                    id={w._id}
                    type="edit"
                    title="Work"
                  >
                    <ContentWork w={w} />
                  </ItemAbout>
                ) : (
                  <ContentWork w={w} />
                )}
              </Stack>
            ))}
          {(isOwner || isFriend) && (
            <AddSubjectWork isOwner={isOwner} length={work.length} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
function AddSubjectWork({ isOwner, length }) {
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

function EducationSection() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetEducation(id);
  const education = data?.data.body[0] || [];
  const isFriend = data?.data.body[1] || false;
  const isOwner = data?.data.body[2] || false;

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            Education
          </Typography>
          {education.length > 0 &&
            education.map((e) => (
              <Stack key={e._id} sx={{ mb: 2 }}>
                {isOwner ? (
                  <ItemAbout
                    myViewer={e.viewer}
                    value={e}
                    subject={"Education"}
                    id={e._id}
                    type="edit"
                    title="Education"
                  >
                    <ContentEducation e={e} />
                  </ItemAbout>
                ) : (
                  <ContentEducation e={e} />
                )}
              </Stack>
            ))}
          {(isFriend || isOwner) && (
            <AddSubjectEdu isOwner={isOwner} length={education.length} />
          )}
        </Stack>
      )}
    </Stack>
  );
}

function AddSubjectEdu({ isOwner, length }) {
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
function ContentEducation({ e }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
      }}
    >
      <Box sx={{ mr: 1 }}>
        <ShowIcon subject="Education" />
      </Box>
      <Stack sx={{ mb: 1 }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Typography>{e.field}</Typography>
          {e.univrsity && (
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography sx={{ mx: 1 }}>{" at "}</Typography>
              <Typography>{e.univrsity}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack>
          <Stack sx={{ flexDirection: "row" }}>
            {e.degree && (
              <>
                <Typography>{e.degree}</Typography>
                <Typography sx={{ mx: 1 }}>{e.degree && "|"}</Typography>{" "}
              </>
            )}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{e.startYear}</Typography>
              {e.startYear && e.isCurrently ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : e.startYear && e.endYear ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : (
                ""
              )}

              {e.endYear ? (
                <Typography> {e.endYear}</Typography>
              ) : e.isCurrently ? (
                <Typography>Currently</Typography>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function ContentWork({ w }) {
  return (
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
          {w.company && (
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Typography sx={{ mx: 1 }}>{" at "}</Typography>
              <Typography>{w.company}</Typography>
            </Stack>
          )}
        </Stack>
        <Stack>
          <Stack sx={{ flexDirection: "row" }}>
            {w.city && (
              <>
                <Typography>{w.city}</Typography>
                <Typography sx={{ mx: 1 }}>{w.city && "|"}</Typography>{" "}
              </>
            )}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{w.startYear}</Typography>
              {w.startYear && w.isCurrently ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : w.startYear && w.endYear ? (
                <Typography sx={{ mx: 1 }}>-</Typography>
              ) : (
                ""
              )}

              {w.endYear ? (
                <Typography> {w.endYear}</Typography>
              ) : w.isCurrently ? (
                <Typography>Currently</Typography>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
