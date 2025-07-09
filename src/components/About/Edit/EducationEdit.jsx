/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddEducation, useEditEducation } from "../../../utils/mutation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

export default function EducationEdit({ value, onCloseEdit, type, id }) {
  const userId = useParams().id;
  const [currentPosition, setCurrentPosition] = useState(
    value ? value.isCurrently : false
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      field: value.field,
      degree: value.degree,
      university: value.university,
      startYear: value.startYear,
      endYear: value.endYear,
      isCurrently: value.isCurrently,
    },
  });
  const mutationNewEducation = useAddEducation();
  const querryClient = useQueryClient();
  const mutationEditEducation = useEditEducation();

  function onSubmit(data) {
    onCloseEdit();
    if (type == "new") {
      data.id = userId;
      data.isCurrently = currentPosition;
      mutationNewEducation.mutate(data, {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["education"],
          });
          toast.success("Education was added successfully!");
        },
        onError(error) {
          console.log("error isss", error);
          toast.error(error.response.data.message);
        },
      });
    } else {
      data.userId = userId;
      data.id = id;
      data.isCurrently = currentPosition;

      mutationEditEducation.mutate(data, {
        onSuccess(d) {
          querryClient.invalidateQueries({ queryKey: ["education"] });
          console.log("ddd education", d);
          toast.success("Education was updated successfully!");
        },
        onError(error) {
          console.log("error is", error);
          toast.error(error.response.data.message);
        },
      });
    }
  }
  return (
    <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Field of study
        </Typography>
        <TextField
          size="small"
          defaultValue={value.position}
          label="New value"
          {...register("field")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          Degree
        </Typography>
        <TextField
          size="small"
          defaultValue={value.place}
          label="New value"
          {...register("degree")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold", mb: 1 }}>
          University
        </Typography>
        <TextField
          size="small"
          defaultValue={value.city}
          label="New value"
          {...register("university")}
        />
      </Stack>
      <Stack>
        <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>Year</Typography>
        <Stack>
          {
            <FormControlLabel
              control={<Checkbox />}
              checked={currentPosition}
              label="I am currently studing"
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
