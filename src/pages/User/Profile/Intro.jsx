import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { useGetOverview } from "../../../utils/queries";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";

export default function Intro() {
  const theme = useSelector((state) => state.app.theme);
  const id = useParams().id;
  const { isPending, data, error, refetch } = useGetOverview(id);
  const user = data?.data?.body;

  console.log("dataaa", "keysintro");
  const intro = ["Pronounce", "School", "Location", "Hometown", "Status"];

  function icon(item = "") {
    if (item == "Pronounce") {
      return (
        <AssignmentIndIcon
          sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
        />
      );
    } else if (item == "School") {
      return (
        <SchoolIcon
          sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
        />
      );
    } else if (item == "Location") {
      return (
        <LocationOnIcon
          sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
        />
      );
    } else if (item == "Hometown") {
      return (
        <HomeIcon sx={{ color: theme == "light" ? "grey.500" : "grey.500" }} />
      );
    } else if (item == "Status") {
      return (
        <HelpIcon sx={{ color: theme == "light" ? "grey.500" : "grey.500" }} />
      );
    } else {
      return false;
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography component="h6" variant="h6" sx={{ mb: 3 }}>
        Intro
      </Typography>
      {isPending ? (
        <Loading message="is loading..." />
      ) : error ? (
        <LoadingError handleAction={refetch} message={error.message} />
      ) : (
        <Stack>
          <Stack>
            {user.Intro ? (
              <Stack>
                <Typography sx={{ fontWeight: "bold" }}>
                  bio anan ananan
                </Typography>
                <Button
                  disableElevation
                  sx={{
                    bgcolor: theme == "light" ? "grey.200" : "grey.800",
                    color: theme == "light" ? "grey.800" : "grey.200",
                    mt: 2,
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Edit bio
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" sx={{ mb: 2 }}>
                Add Intro
              </Button>
            )}
          </Stack>
          {intro.map((item) => {
            return (
              <Stack sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}>
                {icon(item)}
                {user[item]?.value ? (
                  <Typography sx={{ ml: 2 }}>{user[item].value}</Typography>
                ) : (
                  <Button variant="text" sx={{ ml: 1 }}>
                    Add {item}
                  </Button>
                )}
              </Stack>
            );
          })}
          {user.Pronounce ||
          user.School ||
          user.Location ||
          user.Hometown ||
          user.Status ? (
            <Button
              disableElevation
              sx={{
                bgcolor: theme == "light" ? "grey.200" : "grey.800",
                color: theme == "light" ? "grey.800" : "grey.200",
                mt: 2,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Edit details
            </Button>
          ) : (
            ""
          )}
        </Stack>
      )}
    </Paper>
  );
}

//  <Stack sx={{ mt: 4 }} spacing={2}>
//             <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
//               <AssignmentIndIcon
//                 sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
//               />
//               {user?.Pronounce ? (
//                 <Typography>{user.Pronounce}</Typography>
//               ) : (
//                 <Button variant="text">Add Pronounce</Button>
//               )}
//             </Stack>
//             <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
//               <SchoolIcon
//                 sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
//               />
//               <Typography>Studied at </Typography>
//             </Stack>
//             <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
//               <HomeIcon
//                 sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
//               />
//               <Typography>Lives in</Typography>
//             </Stack>
//             <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
//               <LocationOnIcon
//                 sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
//               />
//               <Typography>From</Typography>
//             </Stack>
//             <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
//               <FavoriteIcon
//                 sx={{ color: theme == "light" ? "grey.500" : "grey.500" }}
//               />
//               <Typography>Married to</Typography>
//             </Stack>
//             <Button
//               disableElevation
//               sx={{
//                 bgcolor: theme == "light" ? "grey.200" : "grey.800",
//                 color: theme == "light" ? "grey.800" : "grey.200",
//                 mt: 2,
//                 fontSize: 15,
//                 fontWeight: "bold",
//               }}
//             >
//               Edit details
//             </Button>
//           </Stack>
