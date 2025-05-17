import { Divider, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useFindUser } from "../../../../../utils/queries";
import LoginFirst from "./LoginFirst";
import RandomUserList from "./RandomUserList";

export default function SearchBar() {
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState(false);
  const [openLoginUser, setOpenLoginUser] = useState(false);

  const findUser = useFindUser(q);
  console.log("findUserr111", findUser.data);
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
      <Typography sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>
        Make new friends
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <RandomUserList />
      <LoginFirst open={openLoginUser} onClose={setOpenLoginUser} />
    </Paper>
  );
}
