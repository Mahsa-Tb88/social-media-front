import { Box, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import noImage from "../../../../assets/images/user.png";
import ItemAbout from "../ItemAbout";
import ShowIcon from "../ShowIcon";
import EditValueSubject from "../EditVelueSubject";

export default function Family() {
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

  const [family, setFamily] = useState(myFamily);
  const [relationship, setRealtionship] = useState(user);
  const [openAddFamily, setOpenAddFamily] = useState(false);

  return (
    <Stack>
      <Stack sx={{ mb: 4 }} spacing={1}>
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          Relationship
        </Typography>
        <Stack>
          <ItemAbout
            myViewer={relationship.viewer}
            list={relationship}
            setList={setRealtionship}
            value={relationship[0]}
            subject={"Relationship"}
            title="Relationship"
            id={relationship[0]?.id}
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
                  src={relationship[0]?.img}
                  height={50}
                  width={50}
                  style={{
                    border: "var(--border)",
                    borderRadius: "50%",
                  }}
                />
                <Stack>
                  <Typography>{relationship[0]?.username}</Typography>
                  <Box sx={{ fontSize: 13 }}>{relationship[0]?.status}</Box>
                </Stack>
              </Stack>
            </Stack>
          </ItemAbout>
        </Stack>
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
                    list={family}
                    setList={setFamily}
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
                          src={j.img}
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
            setList={setFamily}
            list={family}
            type="new"
            title="Family"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
