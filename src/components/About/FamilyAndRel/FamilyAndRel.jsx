/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import React from "react";
import { useGetFamilyRelationship } from "../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import Relationship from "./Relationship";
import Family from "./Family";

export default function FamilyAndRel() {
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetFamilyRelationship(id);

  const family = data?.data?.body[0]?.family;
  const relationship = data?.data?.body[0]?.relationship;
  const isFriend = data?.data?.body[1];
  const isOwner = data?.data?.body[2];

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
          <Relationship
            relationship={relationship}
            isOwner={isOwner}
            isFriend={isFriend}
          />
          <Family family={family} isOwner={isOwner} isFriend={isFriend} />
        </Stack>
      )}
    </Stack>
  );
}
