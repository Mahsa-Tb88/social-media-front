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
    if (data) {
      const { body } = data.data;
      dispatch(appActions.setCategories(body.categories));
      dispatch(appActions.setInitialized(true));
      console.log("dataaa body", body);

      if (body?.user) {
        const { user, friends } = body;
        dispatch(userActions.setIsLoggedIn(true));

        dispatch(
          userActions.setProfile({
            email: user.emailRegister,
            username: user.username[0].toUpperCase() + user.username.slice(1),
            id: user._id,
            profileImg: user.profileImg,
            backgroundImg: user.backgroundImg,
            bio: user.bio,
            viewer: user.viewerProfile,
            friends: friends,
          })
        );
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
