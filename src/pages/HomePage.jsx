import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetAllUser } from "../utils/queries";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";
import noImage from "../../src/assets/images/user.png";

export default function HomePage() {
  const { isPending, data, error, refetch } = useGetAllUser();
  console.log(data);
  return (
    <Container fixed sx={{ mt: 5 }}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <TextField label="Search" variant="outlined" sx={{ width: "100%" }} />
          <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
            Make new friends
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Stack>
            {isPending ? (
              <Box>
                <Loading message="Is Loading" />
              </Box>
            ) : error ? (
              <LoadingError handleAction={refetch} message={error.message} />
            ) : (
              data.data.body.map((user) => {
                return (
                  <Stack
                    key={user}
                    sx={{
                      mt: 3,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                      src={
                        user.profileImg ? SERVER_URL + user.profileImg : noImage
                      }
                    />
                    <Box>
                      <Typography sx={{ fontWeight: "bold", fontSize: 17 }}>
                        {user.username}
                      </Typography>
                      <Button>Add Frineds</Button>
                    </Box>
                  </Stack>
                );
              })
            )}
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}></Grid2>
      </Grid2>
    </Container>
  );
}
