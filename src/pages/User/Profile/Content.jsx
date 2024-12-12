import { Box, Divider, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import { purple, red } from "@mui/material/colors";
import Diversity3Icon from "@mui/icons-material/Diversity3";
export default function Content() {
  return (
    <Stack sx={{ mt: 30 }}>
      <Grid2 container spacing={3}>
        <Grid2
          size={{ xs: 12, lg: 3 }}
          //   sx={{ height: "100vh", bgcolor: purple[300] }}
        >
          <Typography sx={{ fontWeight: "Bold", fontSize: 20 }}>
            Friends
          </Typography>
          <Divider />
          <Stack mt={5}>
            <Box component="img" sx={{ height: "50px", width: "50px",borderRadius:"50%" }} />
          </Stack>
        </Grid2>
        <Grid2
          size={{ xs: 12, lg: 9 }}
          sx={{ height: "100vh", bgcolor: red[300] }}
        >
          b
        </Grid2>
      </Grid2>
    </Stack>
  );
}
