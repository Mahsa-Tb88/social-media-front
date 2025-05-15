import { Box, Container, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllUser } from "../../../../../utils/queries";
import Loading from "../../../../../components/Loading";
import LoadingError from "../../../../../components/LoadingError";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const { isPending, data, error, refetch } = useGetAllUser();
  const userLogin = useSelector((state) => state.user.profile);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      // filter users to show only users that not friends or in friend request
      filterUsers();
    }
  }, [data]);

  function filterUsers() {
    let updatedUserList = data.data.body;
    const friends = userLogin.friends?.listFriend || [];
    const userRequestList = userLogin.friends?.friendRequestList || [];
    friends.forEach((element) => {
      updatedUserList = updatedUserList.filter((f) => f._id != element.id);
    });
    userRequestList.forEach((element) => {
      updatedUserList = updatedUserList.filter((f) => f._id != element.id);
    });
    setUsers(updatedUserList);
  }

  return (
    <Container fixed sx={{ mt: 5 }}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 3 }}>
          {isPending ? (
            <Box>
              <Loading message="Is Loading" />
            </Box>
          ) : error ? (
            <LoadingError handleAction={refetch} message={error.message} />
          ) : (
            <SearchBar users={users} />
          )}
        </Grid2>
        <Grid2 size={{ xs: 12, md: 9 }}></Grid2>
      </Grid2>
    </Container>
  );
}
