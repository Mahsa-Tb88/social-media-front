/* eslint-disable react/prop-types */
import React from "react";
import { Stack } from "@mui/material";

import EducationSection from "./EducationSection";
import WorkSection from "./WorkSection";

export default function WorkEducation() {
  return (
    <Stack spacing={4}>
      <WorkSection />
      <EducationSection />
    </Stack>
  );
}
