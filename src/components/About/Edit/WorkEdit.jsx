/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddWork, useEditWork } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function WorkEdit({
  value,
  onCloseEdit,
  type,
  id,
  setNewValue,
}) {
  const userId = useParams().id;
  const [currentPosition, setCurrentPosition] = useState(
    value ? value.isCurrently : false
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      position: value.position,
      company: value.company,
      city: value.city,
      startYear: value.startYear,
      endYear: value.endYear,
      isCurrently: value.isCurrently,
    },
  });
  const mutationNewWork = useAddWork();
  const querryClient = useQueryClient();
  const mutationEditWork = useEditWork();

  function onSubmit(data) {
    onCloseEdit();
    if (type == "new") {
      data.id = userId;
      data.isCurrently = currentPosition;

      mutationNewWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({
            queryKey: ["work"],
          });
          toast.success(d.data.message);
        },
        onError(error) {
          toast.error(error.response.data.message);
        },
      });
    } else {
      data.userId = userId;
      data.id = id;
      if (currentPosition) {
        data.endYear = 0;
        data.isCurrently = true;
      } else {
        data.isCurrently = false;
      }
      console.log("data submited", currentPosition, data);

      mutationEditWork.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["work"] });
          toast.success(d.data.message);
        },
        onError(error) {
          toast.error(error.response.data.message);
        },
      });
    }
  }
  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Position
        </Typography>
        <TextField
          size="small"
          defaultValue={value.position}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("position")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Company
        </Typography>
        <TextField
          size="small"
          defaultValue={value.place}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("company")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          City
        </Typography>
        <TextField
          size="small"
          defaultValue={value.city}
          label="New value"
          onChange={(e) => setNewValue(e.target.value)}
          {...register("city")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>Year</Typography>
        <Stack>
          {
            <FormControlLabel
              control={<Checkbox />}
              checked={currentPosition}
              label="I am currently work here"
              onChange={() => setCurrentPosition(!currentPosition)}
              sx={{ mb: 1 }}
            />
          }
          <Stack sx={{ flexDirection: "row", gap: 2 }}>
            <TextField
              label="From"
              type="number"
              defaultValue={value.startYear}
              fullWidth
              {...register("startYear")}
            />

            {!currentPosition && (
              <TextField
                label="To"
                type="number"
                value={value.endYear}
                fullWidth
                {...register("endYear")}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      <Button type="submit" size="large">
        Save
      </Button>
    </Stack>
  );
}
