import { Button, Container, Divider, Stack } from "@mui/material";
import React from "react";
import { NavLink, useParams } from "react-router-dom";

export default function Navbar() {
  const id = useParams().id;

  return (
    <Container sx={{ mt: 30 }}>
      <Stack
        sx={{
          flexDirection: "row",
          borderBottom: "none",
          width: "100%",
          gap: 2,

          "& .active": { borderBottom: "2px solid #1976d2", borderRadius: 0 },
        }}
      >
        <Button
          variant="text"
          sx={{
            fontSize: 17,
            border: "3px",
          }}
          to={"/profile/" + id}
          LinkComponent={NavLink}
          end
        >
          Post
        </Button>
        <Button
          variant="text"
          sx={{
            fontSize: 17,
            border: "3px",
          }}
          LinkComponent={NavLink}
          to="about"
        >
          About
        </Button>
        <Button
          variant="text"
          sx={{
            fontSize: 17,
            border: "3px",
          }}
          LinkComponent={NavLink}
          to="friends"
        >
          Friends
        </Button>
        <Button
          variant="text"
          sx={{
            fontSize: 17,
            border: "3px",
          }}
          LinkComponent={NavLink}
          to="galery"
        >
          Galery
        </Button>
      </Stack>
      <Divider />
    </Container>
  );
}
