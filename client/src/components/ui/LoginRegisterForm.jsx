

import React, { useState } from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";

const formControls = {
  login: [
    { name: "email", label: "Email", type: "email", componentType: "input" },
    { name: "password", label: "Password", type: "password", componentType: "input" }
  ],
  register: [
    { name: "username", label: "Username", type: "text", componentType: "input" },
    { name: "email", label: "Email", type: "email", componentType: "input" },
    { name: "password", label: "Password", type: "password", componentType: "input" },
    { name: "gender", label: "Gender", componentType: "select", options: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" }
      ]
    }
  ]
};

export default function LoginRegisterForm({ type = "login", onSubmit }) {
  const [formData, setFormData] = useState({});
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>{type === "login" ? "Login" : "Register"}</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        {formControls[type].map((control) => (
          <Box key={control.name} mb={2}>
            {control.componentType === "input" ? (
              <TextField
                fullWidth
                label={control.label}
                name={control.name}
                type={control.type}
                value={formData[control.name] || ""}
                onChange={handleChange}
              />
            ) : control.componentType === "select" ? (
              <TextField
                select
                fullWidth
                label={control.label}
                name={control.name}
                value={formData[control.name] || ""}
                onChange={handleChange}
              >
                {control.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </Box>
        ))}
        <Button type="submit" variant="contained" fullWidth>
          {type === "login" ? "Login" : "Register"}
        </Button>
      </form>
    </Box>
  );
}
