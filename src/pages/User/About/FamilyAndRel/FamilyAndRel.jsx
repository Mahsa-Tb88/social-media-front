/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Box, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";
import { useGetFamilyRelationship } from "../../../../utils/queries";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import noImage from "../../../../assets/images/user.png";

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
          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
              Relationship
            </Typography>
            {Object.keys(relationship).length != 0 ? (
              <Stack>
                {isOwner ? (
                  <ItemAbout
                    myViewer={relationship.viewer}
                    value={relationship}
                    subject={"Relationship"}
                    title="Relationship"
                  >
                    <Content item={relationship} />
                  </ItemAbout>
                ) : (
                  <Content item={relationship} />
                )}
              </Stack>
            ) : !Object.keys(relationship).length && (isFriend || isOwner) ? (
              <AddSubRel isOwner={isOwner} isFriend={isFriend} />
            ) : (
              ""
            )}
          </Stack>

          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
              Family
            </Typography>

            <Stack spacing={1}>
              {family.length ? (
                family.map((j) => {
                  return (
                    <Stack key={j.id}>
                      {isOwner ? (
                        <ItemAbout
                          myViewer={j.viewer}
                          value={j}
                          subject={"Family"}
                          id={j.id}
                          title="Family"
                        >
                          <Content item={j} />
                        </ItemAbout>
                      ) : (
                        <Content item={j} />
                      )}
                    </Stack>
                  );
                })
              ) : !family.length && isFriend ? (
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <Box>
                    <ShowIcon subject="Family" />
                  </Box>
                  <Typography>Noting is added yet!</Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
            {isOwner && <AddSubFamily />}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function AddSubRel({ isOwner }) {
  const [openAddRel, setOpenAddRel] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box>
        <ShowIcon subject="Status" />
      </Box>
      {isOwner ? (
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddRel(true)}
        >
          Add Relationship
        </Button>
      ) : (
        "It is not added yet!"
      )}
      <Box></Box>
      <EditValueSubject
        openEdit={openAddRel}
        onCloseEdit={() => setOpenAddRel(false)}
        value=""
        subject="Relationship"
        type="new"
        title="Relationship"
      />
    </Stack>
  );
}

function AddSubFamily() {
  const [openAddFamily, setOpenAddFamily] = useState(false);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Box>
          <ShowIcon subject="Family" />
        </Box>
        <Button
          variant="text"
          sx={{ fontSize: 18 }}
          onClick={() => setOpenAddFamily(true)}
        >
          Add Family
        </Button>
        <Box></Box>
        <EditValueSubject
          openEdit={openAddFamily}
          onCloseEdit={() => setOpenAddFamily(false)}
          value=""
          subject="Family"
          type="new"
          title="Family"
        />
      </Stack>
    </Stack>
  );
}

function Content({ item }) {
  const navigate = useNavigate();

  return (
    <Stack sx={{ mb: 1 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => navigate("/profile/" + item.id)}
      >
        <img
          src={item?.profileImg ? SERVER_URL + item.profileImg : noImage}
          height={50}
          width={50}
          style={{
            border: "var(--border)",
            borderRadius: "50%",
          }}
        />
        <Stack>
          <Typography>{item?.username}</Typography>
          <Box sx={{ fontSize: 13 }}>{item?.status}</Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
