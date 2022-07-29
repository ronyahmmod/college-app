import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

class FormComposer {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  addFormField(name, option) {
    this.fields.push({ name: name, option });
    return this;
  }

  addTextField(
    name,
    value,
    placeholder,
    label,
    required = false,
    fullWidth = false,
    otherProps,
    changeHandler,
    othersHandler
  ) {
    const newTextField = (
      <TextField
        name={name}
        key={name}
        type="text"
        value={value}
        label={label}
        placeholder={placeholder}
        fullWidth={fullWidth}
        required={required}
        onChange={changeHandler}
        {...otherProps}
        {...othersHandler}
      />
    );
    this.fields.push(newTextField);
    return this;
  }

  addSelectItem(
    name,
    value,
    placeholder,
    label,
    labelId,
    items,
    required = false,
    fullWidth = false,
    otherProps,
    changeHandler,
    othersHandler
  ) {
    const newSelectField = (
      <FormControl fullWidth={fullWidth} required={required} key={name}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          label={label}
          name={name}
          value={value}
          onChange={changeHandler}
          required={required}
          placeholder={placeholder}
          key={name}
          {...otherProps}
          {...othersHandler}
        >
          {items.map(({ itemKey, value }, index) => (
            <MenuItem key={itemKey} value={itemKey}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    this.fields.push(newSelectField);
    return this;
  }

  render() {
    if (this.fields) {
      return this.fields;
    } else {
      return (
        <Alert severity="error">There is no fields with this composer.</Alert>
      );
    }
  }
  renderSpecificFields(fields) {
    if (!this.fields) {
      return (
        <Alert severity="error">There is no fields with this composer.</Alert>
      );
    }
    if (fields) {
      return this.fields.filter((field) =>
        fields.some((entry) => entry === field.key)
      );
    }
  }
}

export default FormComposer;
