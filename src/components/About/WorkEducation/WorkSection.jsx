import React from "react";
import { useParams } from "react-router-dom";
import { useGetWork } from "../../../utils/queries";
import { Stack, Typography } from "@mui/material";
import Loading from "../../Loading";
import LoadingError from "../../LoadingError";
import ItemAbout from "../ItemAbout";
import ContentWork from "./ContentWork";
import AddSubjectWork from "./AddSubjectWork";

export default function WorkSection() {
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
