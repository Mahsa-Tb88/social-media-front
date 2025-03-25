import { Box, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";
import { useGetFamilyRelationship } from "../../../../utils/queries";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading";
import LoadingError from "../../../../components/LoadingError";
import noImage from "../../../../assets/images/user.png";
import { useSelector } from "react-redux";

export default function FamilyAndRel() {
  const id = useParams().id;
  const userLogin = useSelector((state) => state.user.profile);
  const { isPending, data, error, refetch } = useGetFamilyRelationship(id);
  const family = data?.data?.body?.family || [];
  const relationship = data?.data?.body?.relationship || {};

  const [openAddFamily, setOpenAddFamily] = useState(false);
  const [openAddRel, setOpenAddRel] = useState(false);

  function hasPermission() {
    if (id == userLogin.id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Stack>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
              Relationship
            </Typography>
            {Object.keys(relationship).length != 0 ? (
              <Stack>
                <ItemAbout
                  myViewer={relationship.viewer}
                  value={relationship}
                  subject={"Relationship"}
                  title="Relationship"
                >
                  <Stack sx={{ mb: 1 }}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <img
                        src={
                          relationship.profileImg
                            ? SERVERUrrl + relationship.profileImg
                            : noImage
                        }
                        height={50}
                        width={50}
                        style={{
                          border: "var(--border)",
                          borderRadius: "50%",
                        }}
                      />
                      <Stack>
                        <Typography>{relationship.username}</Typography>
                        <Box sx={{ fontSize: 13 }}>{relationship.status}</Box>
                      </Stack>
                    </Stack>
                  </Stack>
                </ItemAbout>
              </Stack>
            ) : hasPermission() ? (
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
                <Button
                  variant="text"
                  sx={{ fontSize: 18 }}
                  onClick={() => setOpenAddRel(true)}
                >
                  Add Relationship
                </Button>
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
            ) : (
              "Not is added yet!"
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
                      <ItemAbout
                        myViewer={j.viewer}
                        value={j}
                        subject={"Family"}
                        id={j.id}
                        title="Family"
                      >
                        <Stack sx={{ mb: 1 }}>
                          <Stack
                            sx={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <img
                              src={j.profileImg ? j.profileImg : noImage}
                              height={50}
                              width={50}
                              style={{
                                border: "var(--border)",
                                borderRadius: "50%",
                              }}
                            />
                            <Stack>
                              <Typography>{j.username}</Typography>
                              <Box sx={{ fontSize: 13 }}>{j.status}</Box>
                            </Stack>
                          </Stack>
                        </Stack>
                      </ItemAbout>
                    </Stack>
                  );
                })
              ) : (
                <Stack
                  sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <Box>
                    <ShowIcon subject="Family" />
                  </Box>
                  <Typography>Not is added yet!</Typography>
                </Stack>
              )}
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              {hasPermission() && (
                <Stack>
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
              )}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
