import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useFindUser } from "../../../../../utils/queries";
import LoginFirst from "./LoginFirst";
import noImage from "../../../../../assets/images/user.png";
import RandomUserList from "./RandomUserList";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const [openLoginUser, setOpenLoginUser] = useState(false);

  const theme = useSelector((state) => state.app.theme);

  const { isFetching, data, error, refetch } = useFindUser(q);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setQ(search);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [search]);

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack sx={{ mt: 2 }}>
        {isFetching ? (
          <Box>
            <Loading message="Is Loading" />
          </Box>
        ) : error ? (
          <Box>
            <LoadingError handleAction={refetch} message={error.message} />
          </Box>
        ) : data?.data?.body?.length ? (
          <Stack>
            {data?.data?.body?.map((user) => {
              return (
                <Stack
                  key={user._id}
                  sx={{
                    my: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    borderRadius: "5px",
                    "&:hover": {
                      bgcolor: theme == "light" ? "grey.200" : "grey.800",
                    },
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      textDecoration: "none",
                    }}
                    component={Link}
                    to={`profile/${user._id}`}
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
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 17,
                        color: theme == "light" ? "grey.800" : "grey.200",
                      }}
                    >
                      {user.username[0].toUpperCase() + user.username.slice(1)}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    {user?.status == "pending" ? (
                      <Button onClick={() => handleCancelRequest(user)}>
                        Cancel Request
                      </Button>
                    ) : (
                      <Button onClick={() => handleAddFriend(user)}>
                        Add friend
                      </Button>
                    )}
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        ) : !data?.data?.body?.length && search ? (
          <Typography>Nothing found!</Typography>
        ) : (
          ""
        )}
      </Stack>

      <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
        Make new friends
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <RandomUserList />
      <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
    </Paper>
  );
}
