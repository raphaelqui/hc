/** @format */

import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { palette } from "@/theme";

interface IFilterToggleField {
  label: string;
  name: string;
  onSelect: () => void;
}

const FilterToggleField: React.FunctionComponent<IFilterToggleField> = ({
  label,
  name,
  onSelect,
}) => {
  const { control, getValues } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Stack
            justifyContent={"center"}
            onClick={() => {
              onSelect();
              field.onChange(true);
            }}
            sx={{
              cursor: "pointer",
              height: 34,
              width: "auto",
              bgcolor: getValues(name) ? palette.checkedInFont : "#EDF0ED",
              px: 1.5,
            }}>
            <Typography
              sx={{
                textAlign: "center",
                color: getValues(name) ? "#EDF0ED" : palette.checkedInFont,
                whiteSpace: "pre",
              }}
              variant='body1'>
              {label}
            </Typography>
          </Stack>
        );
      }}
    />
  );
};

export default FilterToggleField;
