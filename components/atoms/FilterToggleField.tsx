/** @format */

import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

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
              bgcolor: getValues(name) ? "checkedInFont" : "#EDF0ED",
              px: 1.5,
            }}>
            <Typography
              sx={{
                textAlign: "center",
                color: getValues(name) ? "#EDF0ED" : "checkedInFont",
                whiteSpace: "pre",
              }}
              variant='body2'>
              {label}
            </Typography>
          </Stack>
        );
      }}
    />
  );
};

export default FilterToggleField;
