import {
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function About() {
  const theme = useSelector((state) => state.app.theme);
  const id = useParams().id;
  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography sx={{ mb: 3 }} variant="h5">
            About
          </Typography>
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Divider orientation="vertical" flexItem />
              <List
                sx={{
                  "& .active": {
                    color: theme == "light" ? "#0064d1" : "grey.200",
                    bgcolor: theme == "light" ? "#ebf5ff" : "grey.800",
                  },
                }}
              >
                <ListItem>
                  <ListItemButton
                    LinkComponent={NavLink}
                    to={"/profile/" + id + "/about/overview"}
                    end
                  >
                    <ListItemText>Overview</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton LinkComponent={NavLink} to="contact">
                    <ListItemText>Contact and base info</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton LinkComponent={NavLink} to="work&education">
                    <ListItemText>Work and Education</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton LinkComponent={NavLink} to="family">
                    <ListItemText>Family and Relationship</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton LinkComponent={NavLink} to="placeLived">
                    <ListItemText>Place lived</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }} sx={{ bgcolor: "redn" }}>
              <Outlet />
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </Stack>
  );
}
