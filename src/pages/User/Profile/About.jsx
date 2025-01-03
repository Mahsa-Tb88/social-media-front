import {
  Container,
  Divider,
  Grid2,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import { NavLink, Outlet } from "react-router-dom";

export default function About() {
  const theme = useSelector((state) => state.app.theme);
  return (
    <Stack sx={{ py: 4, bgcolor: theme === "dark" ? "grey.800" : "grey.200" }}>
      <Container maxWidth="md">
        {/* isPending ? <Loading message="Is loading..."/> :error ? <LoadingError handleAction={refetch} message={error.message}/> */}
        <Paper sx={{ p: 4 }}>
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Typography sx={{ fontWeight: "bold", mb: 3, fontSize: "20px" }}>
                About
              </Typography>
              <Divider orientation="vertical" flexItem />
              <MenuList>
                <MenuItem LinkComponent={NavLink} to="overview" end>
                  <ListItemText
                    sx={{
                      color: theme == "light" ? "grey.600" : "grey.200",
                      fontSize: "20px",
                      my: 1,
                    }}
                  >
                    Overview
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    sx={{
                      color: theme == "light" ? "grey.600" : "grey.200",
                      fontSize: "20px",
                      my: 1,
                    }}
                    LinkComponent={NavLink}
                    to="contact"
                  >
                    Contact and Basic Info
                  </ListItemText>
                </MenuItem>
                <MenuItem LinkComponent={NavLink} to="work&education">
                  <ListItemText
                    sx={{
                      color: theme == "light" ? "grey.600" : "grey.200",
                      fontSize: "20px",
                      my: 1,
                    }}
                  >
                    Work and Education
                  </ListItemText>
                </MenuItem>
                <MenuItem LinkComponent={NavLink} to="placeLived">
                  <ListItemText
                    sx={{
                      color: theme == "light" ? "grey.600" : "grey.200",
                      fontSize: "20px",
                      my: 1,
                    }}
                  >
                    Place Lived
                  </ListItemText>
                </MenuItem>
                <MenuItem LinkComponent={NavLink} to="family">
                  <ListItemText
                    sx={{
                      color: theme == "light" ? "grey.600" : "grey.200",
                      fontSize: "20px",
                      my: 1,
                    }}
                  >
                    Family and Relationship
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Outlet />
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </Stack>
  );
}
