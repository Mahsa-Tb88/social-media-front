import React from "react";
import { useParams } from "react-router-dom";
import { useGetEducation } from "../../../utils/queries";
import { Stack, Typography } from "@mui/material";
import Loading from "../../Loading";
import LoadingError from "../../LoadingError";
import ItemAbout from "../ItemAbout";
import ContentEducation from "./ContentEducation";
import AddSubjectEducation from "./AddSubjectEducation";

export default function EducationSection() {
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
            <AddSubjectEducation isOwner={isOwner} length={education.length} />
          )}
        </Stack>
      )}
    </Stack>
  );
}
