import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ name, value, handleChange,labelText,disabled }) {
  return (
    <Box
      component="form"
      className="form-row filter popup"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        name={labelText}
        label={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        variant="standard"
      />
    </Box>
  );
}