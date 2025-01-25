import { Box, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import noImage from "../../../../assets/images/user.png";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";
import { useSelector } from "react-redux";

export default function FamilyAndRel() {
  const relationship = useSelector((state) => state.user.relationship);
  const family = useSelector((state) => state.user.family);

  // { username: "", profileImg: "", status: "", viewer: "private" }

  const user = [
    {
      username: "Hossein88",
      img: noImage,
      status: "Married",
      viewer: "public",
      id: 45,
    },
  ];
  const myFamily = [
    {
      username: "Nasim87",
      id: 255,
      img: noImage,
      status: "Sister",
      viewer: "public",
    },
  ];

  const [openAddFamily, setOpenAddFamily] = useState(false);

  return (
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
                    src={relationship.profileImg}
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
        ) : (
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>
              <ShowIcon subject="status" />
            </Box>
            <Button
              variant="text"
              sx={{ fontSize: 18 }}
              onClick={() => setOpenAddFamily(true)}
            >
              Add Relationship
            </Button>
            <Box></Box>
            <EditValueSubject
              openEdit={openAddFamily}
              onCloseEdit={() => setOpenAddFamily(false)}
              value=""
              subject="Relationship"
              type="new"
              title="Family"
            />
          </Stack>
        )}
      </Stack>
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          Family
        </Typography>
        {
          <Stack spacing={1}>
            {family.map((j) => {
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
                          src={j.profileImg}
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
            })}
          </Stack>
        }
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
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
    </Stack>
  );
}
