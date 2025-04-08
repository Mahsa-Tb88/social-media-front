import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export default function TextComment({ c }) {
  const [isLong, setIsLong] = useState(c.comment.length > 200 ? true : false);
  return (
    <Stack>
      {isLong ? (
        <Stack>
          <Typography>{c.comment.slice(0, 200) + " ..."}</Typography>
          <Button
            variant="text"
            sx={{ textAlign: "left" }}
            onClick={() => setIsLong(false)}
          >
            View more
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Typography sx={{ ml: 1 }}>{c.comment}</Typography>
          {c.comment.length > 200 && (
            <Button
              variant="text"
              sx={{ cursor: "pointer" }}
              onClick={() => setIsLong(true)}
            >
              Back
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
}
