/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import React from "react";
import { useGetOverview } from "../../../utils/queries";
import { useParams } from "react-router-dom";

import LoadingError from "../../../components/LoadingError";
import Loading from "../../../components/Loading";
import Item from "./Item";
import AddSubject from "./AddSubject";

export default function Overview() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetOverview(id);

  const overview = data?.data.body.overview;
  const isFriend = data?.data.body.isFriend;
  const isOwner = data?.data.body.isOwner;

  const overviewKeys = [
    "School",
    "Location",
    "Hometown",
    "Status",
    "Phone",
    "Email",
  ];

  function showText(subject) {
    if (subject == "School") {
      return "Study at";
    } else if (subject == "Location") {
      return "Livs in";
    } else if (subject == "Hometown") {
      return "From";
    } else if (subject == "Status") {
      return "I am";
    } else if (subject == "Phone") {
      return "Phone";
    } else {
      return "Email";
    }
  }

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
        <Stack sx={{ gap: 4 }}>
          {!Object.keys(overview).length && !isFriend && !isOwner ? (
            <Stack>
              <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
                There is nothing to show!
              </Typography>
            </Stack>
          ) : (
            overviewKeys.map((item, index) => {
              return overview[item]?.value ? (
                <Item
                  subject={item}
                  text={showText(item)}
                  value={overview[item].value}
                  viewer={overview[item].viewer}
                  key={index}
                  isOwner={isOwner}
                />
              ) : !overview[item]?.value && (isOwner || isFriend) ? (
                <AddSubject subject={item} isOwner={isOwner} key={index} />
              ) : (
                ""
              );
            })
          )}
        </Stack>
      )}
    </Stack>
  );
}
