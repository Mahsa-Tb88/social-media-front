/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import { useGetContactBaseInfo } from "../../../utils/queries";

import Websites from "./Websites";
import ContactInfo from "./ContactInfo";
import BasicInfo from "./BasicInfo";

export default function Contact() {
  const id = useParams().id;

  const { isPending, data, error, refetch } = useGetContactBaseInfo(id);
  const myData = data?.data.body[0] || {};
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
        <Stack spacing={5}>
          <ContactInfo data={myData} isFriend={isFriend} isOwner={isOwner} />
          <Websites data={myData} isFriend={isFriend} isOwner={isOwner} />
          <BasicInfo data={myData} isFriend={isFriend} isOwner={isOwner} />
        </Stack>
      )}
    </Stack>
  );
}
