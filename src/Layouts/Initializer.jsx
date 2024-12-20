import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useInitialize } from "../utils/queries";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";
import { appActions } from "../store/slices/appSlice";
import Loading from "../components/Loading";
import LoadingError from "../components/LoadingError";

export default function Initializer() {
  const { isPending, error, data, refetch } = useInitialize();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("data...", data);
    if (data) {
      const { body } = data.data;
      dispatch(appActions.setCategories(body.categories));
      dispatch(appActions.setInitialized(true));

      if (body?.user) {
        dispatch(userActions.setIsLoggedIn(true));
        body.user.username =
          body.user.username[0].toUpperCase() + body.user.username.slice(1);
        dispatch(userActions.setProfile(body.user));
      }
    }
  }, [data]);

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center", mt: 10 }}>
      {isPending ? (
        <Loading />
      ) : error ? (
        <LoadingError message={error.message} handleAction={refetch} />
      ) : (
        ""
      )}
    </Stack>
  );
}
