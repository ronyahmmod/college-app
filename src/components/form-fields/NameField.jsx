import { TextField } from "@mui/material";

const NameField = ({ handleChange, name, value, ...otherProps }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={handleChange}
      placeholder="Enter name"
      required
      fullWidth
      {...otherProps}
    />
  );
};

export default NameField;
